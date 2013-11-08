ig.module(
	'game.entities.boss.serpentking'
)
.requires(
	'impact.entity',
	'game.entities.boss.boss',
	'game.entities.boss.serpentbody',
	'game.entities.boss.serpentacid'
)
.defines(function(){
	
EntitySerpentking = EntityBoss.extend({
	size: {x: 52, y: 38},
	offset: {x: 12, y: 0},
	maxVel: {x: 200, y: 600},
	friction: {x: 150, y: 0},

	edgeReverse: false, 
	knockback: false,    // If they bounce back from damage
	speed: 40,
	damageFlash: true,
	gravityFactor: 0,
	movementDir: true,	// This gets flipped to reverse movement directions
	flashParts: true,	// All parts flash when hit
	ignoreCollisions: true,

	attackTimer: null, 	 	// countdown to when it attacks
	reverseTimer: null,		// countdown to when it reverses direction
	idleTimer: null,		// countdown used for in between, idle time
	
	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 64, 32 ),
	myImage: new ig.Image( 'media/sprites/SerpentKing.png' ),
	
	chainOrigin: {x: 32, y:0 }, // Offset the body chain a little back

	health: 5,
	// debugDraw: true,

	// Different attack states:
	// 0: No state yet
	// 1: Idle / shoot acid
	// 2: Move to a new position
	state: 0,
	nextState: 0,	// When in state 2 (move to a new position), this is the state it's moving to
	targetPos: {x:0, y:0}, // In state 2, this is where it's trying to get to
	acidRemaining: 0,	// How many acid shots are left, if in that phase

	idlePos: {x:0, y:0},	// Starting position (also the position of the idle attack)
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'shoot', 0.1, [4, 5, 4], true); // shooting acid
		this.addAnim( 'death', 2, [0, 0], true );

		this.idlePos.x = this.pos.x;
		this.idlePos.y = this.pos.y;

		if (ig.system.running && !this.alreadyDead) {
			// Spawn the body parts, using initial offsets provided
			ig.game.spawnEntity( EntitySerpentbody, this.pos.x, this.pos.y, {master: this, parentNode: this, numNodes: 20, nodeEntity: EntitySerpentbody, initOffset: {x: 5, y: 2}} );
		}

	},

	startBattle: function() {
		this.parent();

		this.idleAttack();
	},

	// Move to a new attack
	newAttack: function( nextAttack ) {

		this.speed = 80;

		// Configure for the movement between attacks
		if (this.childNode) {
			this.childNode.configure({ lowRange: {x: -4, y: -12}, highRange: {x: 12, y: 12}, speed: {x: this.speed, y:this.speed} });
		}

		this.state = 2;
		this.nextState = nextAttack;

		// Locations where each attack takes place
		if (this.nextState == 1) {
			this.targetPos.x = this.idlePos.x;
			this.targetPos.y = this.idlePos.y;
		} else if (this.nextState == 3) {
			this.targetPos.x = 40;
			this.targetPos.y = 40;
		}
	},

	// Hang out on the right and shoot acid
	idleAttack: function() {

		this.speed = 40;

		// Configure for the idle attack
		if (this.childNode) {
			this.childNode.configure({ lowRange: {x: 8, y: -4}, highRange: {x: 8, y: 12}, speed: {x: this.speed, y:this.speed} });
		}

		this.reverseTimer = new ig.Timer(1);
		this.attackTimer = new ig.Timer(2);
		this.state = 1;
		this.movementDir = true;
		this.acidRemaining = 8;
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleAnimations: function() {

		if (this.currentAnim == this.anims.shoot && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.idle;
		}

		this.parent();
	},

	handleTimers: function() {

		this.parent();

		if (this.dead) {
			return;
		}

		// Check if it's time to reverse movement
		if (this.reverseTimer != null && this.reverseTimer.delta() > 0) {
			if (this.state == 1) {
				this.reverseTimer.set(3);
			}
			this.movementDir = !this.movementDir;
		}

		// Check if it's time to attack again
		if (this.attackTimer != null && this.attackTimer.delta() > 0) {

			// Shoot acid
			if (this.state == 1) {
				this.currentAnim = this.anims.shoot.rewind();
				ig.game.spawnEntity( EntitySerpentacid, this.pos.x+10, this.pos.y+12, {vel: {x: -50 + Math.random()*-200, y: -50 + Math.random()*-150}} );
				this.acidRemaining -= 1;
				if (this.acidRemaining <= 0) {
					this.attackTimer = null;
					this.idleTimer = new ig.Timer(5);
				} else {
					this.attackTimer.set(1);
				}
			}
		
		}

		// Check if it's time to stop being idle and do something new
		if (this.idleTimer != null && this.idleTimer.delta() > 0) {
			if (this.state == 1) {
				this.idleTimer = null;
				this.newAttack(3);
			}
		}

	},


	// Make it stop and fall to the ground when dead
	deathCallback: function() {
		this.vel.x = 0;
		this.vel.y = 0;
		this.gravityFactor = ig.game.gravity;
		this.ignoreCollisions = false;

		this.parent();
	},
	
	draw: function() {

		// Draw the overflow for various frames
		if (this.visible) {
			var tile = null;
			if (this.currentAnim.tile == 5) {
				tile = 9;
			}

			if (tile != null) {
				this.myImage.drawTile( this.pos.x - this.offset.x, this.pos.y + 32 - this.offset.y, tile, 64, 32 );
			}
		}

		this.parent();
	},
	
	
	myUpdate: function() {

		this.parent();

		if (this.dead || this.state == 0) {
			return;
		}

		if (this.state == 1) {
			// Move up and down slowly
			this.vel.y = (this.movementDir ? -this.speed : this.speed); 
		} else if (this.state == 2) {

			var madeIt = true;

			// Move to the target position
			if (this.pos.x < this.targetPos.x - 4) {
				this.vel.x = this.speed;
				madeIt = false;
			} else if (this.pos.x > this.targetPos.x + 4) {
				this.vel.x = -this.speed;
				madeIt = false;
			} else {
				this.pos.x = this.targetPos.x;
				this.vel.x = 0;
			}
			if (this.pos.y < this.targetPos.y - 4) {
				this.vel.y = this.speed;
				madeIt = false;
			} else if (this.pos.y > this.targetPos.y + 4) {
				this.vel.y = -this.speed;
				madeIt = false;
			} else {
				this.pos.y = this.targetPos.y;
				this.vel.y = 0;
			}

			// If you've reached your destination, go to the next state
			if (madeIt) {
				if (this.nextState == 1) {
					this.idleAttack();
				} else if (this.nextState == 3) {
					this.newAttack(1);
				}
			}
		}

		
	}
});

});
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

	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'shoot', 0.1, [4, 5, 4], true); // shooting acid
		this.addAnim( 'death', 2, [0, 0], true );

		if (ig.system.running && !this.alreadyDead) {
			// Spawn the body parts, using initial offsets provided
			ig.game.spawnEntity( EntitySerpentbody, this.pos.x, this.pos.y, {master: this, parentNode: this, numNodes: 20, nodeEntity: EntitySerpentbody, initOffset: {x: 5, y: 2}} );
		}

	},

	startBattle: function() {
		this.parent();

		this.newAttack();
	},

	// Get a new attack, based on the current battle phase
	newAttack: function() {
		this.idleAttack();
	},

	// Hang out on the right and shoot acid
	idleAttack: function() {

		// Configure for the idle attack
		if (this.childNode) {
			this.childNode.configure({ lowRange: {x: 8, y: -4}, highRange: {x: 8, y: 12}, speed: {x: this.speed, y:this.speed} });
		}

		this.reverseTimer = new ig.Timer(1);
		this.attackTimer = new ig.Timer(2);
		this.state = 1;
		this.movementDir = true;
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
			}
			this.attackTimer.set(1);
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

		this.vel.y = (this.movementDir ? -this.speed : this.speed); 

		
	}
});

});
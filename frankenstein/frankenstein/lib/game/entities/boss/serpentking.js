ig.module(
	'game.entities.boss.serpentking'
)
.requires(
	'impact.entity',
	'game.entities.boss.boss',
	'game.entities.boss.serpentbody'
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

	attackTimer: null, 	 	// countdown to when it attacks
	reverseTimer: null,		// countdown to when it reverses direction
	
	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 64, 32 ),
	myImage: new ig.Image( 'media/sprites/SerpentKing.png' ),
	
	chainOrigin: {x: 32, y:0 }, // Offset the body chain a little back

	health: 5,
	// debugDraw: true,

	// Different attack states:
	// 0: Move to new position
	// 1: Idle / shoot acid
	state: 0,

	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// There's not really any major animations, just overflow drawing
		this.addAnim( 'idle', 1, [0] );
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
		this.reverseTimer = new ig.Timer(1);
		this.state = 1;
		this.movementDir = true;

		// Configure for the idle attack
		if (this.childNode) {
			this.childNode.configure({ lowRange: {x: 8, y: -4}, highRange: {x: 8, y: 12}, speed: {x: this.speed, y:this.speed} });
		}
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleTimers: function() {

		// Check if it's time to reverse movement
		if (this.reverseTimer != null && this.reverseTimer.delta() > 0) {
			if (this.state == 1) {
				this.reverseTimer.set(3);
			}
			this.movementDir = !this.movementDir;
		}

		// Check if it's time to attack again
		if (this.attackTimer != null && this.attackTimer.delta() > 0) {

			this.attackTimer.set(3);
		}

		this.parent();
	},

	handleAnimations: function() {

		// Check if done preparing to attack
		// if (this.currentAnim == this.anims.prepare && this.currentAnim.loopCount > 0) {
		// 	this.currentAnim = this.anims.attack;
		// }

		this.parent();
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

		// Draw the other half of the mouth
		if (this.visible) {
			this.myImage.drawTile( this.pos.x - this.offset.x, this.pos.y + 20, 2, 64, 32 );
		}

		this.parent();
	},
	
	
	myUpdate: function() {

		if (!this.dead) {
			this.vel.y = (this.movementDir ? -this.speed : this.speed); 
			// this.vel.x = (this.movementDir ? -this.speed : this.speed); 
		}

		// // If idle, always look at the player
		// if (this.currentAnim == this.anims.idle || this.currentAnim == this.anims.prepare) {
		// 	this.flip = (ig.game.player.pos.x > this.pos.x);
		// }

		// // If attacking, move 
		// if (this.currentAnim == this.anims.attack) {
		// 	this.vel.x = (this.flip ? this.speed : -this.speed)

		// 	// During certain phases of battle, jump while moving
		// 	if (this.standing && (this.phase == 1 || this.phase == 3)) {
		// 		this.vel.y = -350;
		// 	}
		// }

		// this.currentAnim.flip.x = !this.flip;

		this.parent();
		
	}
});

});
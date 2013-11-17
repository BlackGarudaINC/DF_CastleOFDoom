ig.module(
	'game.entities.enemy.skullserpent'
)
.requires(
	'game.entities.enemy.enemy',
	'game.entities.enemy.skullserpentbody'
)
.defines(function(){
	
// Normal chests have standard items, defined in weltmeister.
EntitySkullserpent = EntityEnemy.extend({

	collides: ig.Entity.COLLIDES.NEVER,

	size: {x: 16, y: 24},
	offset: {x: 8, y: 4},

	speed: 30,
	maxVel: {x: 30, y: 10},

	health: 10,
	damage: 1,
	showsPain: true,

	knockback: false,
	damageFlash: true,
	gravityFactor: 0,
	ignoreCollisions: true,
	killWhenDead: false,

	wallReverse: true,
	edgeReverse: false,
	levelReverse: true,

	accelFactor: 3,
	
	goldDropValue: 30,

	idleCheck: true,
	idleTimer: null,

	reverseTimer: null,		// Reverse y direction timer

	animSheet: new ig.AnimationSheet( 'media/sprites/SkullSerpent.png', 32, 32 ),

	init: function( x, y, settings ) {

		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [0], true );
		this.addAnim( 'pain', 1, [1] );
		this.addAnim( 'death', 2, [1], true );
		
		this.vel.x = this.speed;
		this.vel.y = this.maxVel.y;
		this.accel.y = -this.maxVel.y * this.accelFactor;

		this.reverseTimer = new ig.Timer(1);


	},

	startUpdate: function() {
		// Spawn the body parts, using initial offsets provided
		ig.game.spawnEntity( EntitySkullserpentbody, this.pos.x, this.pos.y, {master: this, parentNode: this, numNodes: 8, nodeEntity: EntitySkullserpentbody, initOffset: {x: -4, y: 0}} );

		// Configure the movement patterns for the body
		if (this.childNode) {
			this.childNode.configure({ lowRange: {x: -4, y: -2}, highRange: {x: 4, y: 2}, maxVel: this.maxVel });
		}
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleTimers: function() {

		if (this.reverseTimer != null && this.reverseTimer.delta() > 0) {
			this.reverseTimer.set(2);
			this.accel.y = -this.vel.y*this.accelFactor;
		}

		this.parent();
	},

	flipOver: function() {
		this.parent();
		this.vel.x = -this.vel.x;
	},


	myUpdate: function() {

		this.currentAnim.flip.x = this.flip;
		
		this.parent();
	},

	// Make it stop and fall to the ground when dead
	deathCallback: function() {
		this.vel.x = 0;
		this.vel.y = 0;
		this.accel.x = 0;
		this.accel.y = 0;
		this.gravityFactor = 1;
		this.ignoreCollisions = false;
		this.maxVel.x = 0;
		this.maxVel.y = 300;

		this.parent();
	}

});

});
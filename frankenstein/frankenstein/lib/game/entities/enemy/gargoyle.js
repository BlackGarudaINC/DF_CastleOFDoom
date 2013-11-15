ig.module(
	'game.entities.enemy.gargoyle'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntityGargoyle = EntityEnemy.extend({
	
	health: 3,
	speed: 30,

	size: {x: 27, y: 34},
	offset: {x: 18, y: 30},
	maxVel: {x: 200, y: 200},

	knockback: false,
	damageFlash: true,
	killWhenDead: false,
	showsPain: false,

	attackSpeed: 100,	// Attack speed
	attackRange: 350,
	gravityFactor: 0,

	goldDropValue: 15,

	awake: false,
	attackTimer: null,

	position1: {x: 0, y: 0},
	position2: {x: 0, y: 0},

	animSheet: new ig.AnimationSheet( 'media/sprites/Gargoyle.png', 64, 64 ),

	//debugDraw: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.3, [0,1] );
		this.addAnim( 'fly', 0.1, [2,3] );
		this.addAnim( 'attack', 1, [2] );
		this.addAnim( 'death', 0.1, [4,5,6,7] );

		this.position1 = {x: this.pos.x, y: this.pos.y};
	},

	handleTimers: function() {
		
		// Check if it's time to attack again
		if (this.awake && this.currentAnim == this.anims.idle) {
			
			this.currentAnim = this.anims.fly;
			this.vel.y = -10;
		}

		this.parent();
	},

	handleAnimations: function() {

		this.parent();
	},

	myUpdate: function() {

		// If not awake yet, check if close enough to start waking up
		if (!this.awake && this.distanceTo(ig.game.player) < 100) {
			this.awake = true;
			this.attackTimer = new ig.Timer(3);
		}

		this.parent();
	},

});

});
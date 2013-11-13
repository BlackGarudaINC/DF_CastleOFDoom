ig.module(
	'game.entities.enemy.slime'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
// Normal chests have standard items, defined in weltmeister.
EntitySlime = EntityEnemy.extend({

	size: {x: 18, y: 9},
	offset: {x: 0, y: 7},

	speed: 5,

	health: 2,
	damage: 1,
	showsPain: false,

	knockback: false,
	damageFlash: true,

	heartDropPercent: 0, 
	goldDropPercent: 0.3, 	
	goldDropValue: 1,

	idleCheck: true,
	idleTimer: null,

	animSheet: new ig.AnimationSheet( 'media/sprites/LabSlime01.png', 24, 16 ),

	init: function( x, y, settings ) {

		this.parent( x, y, settings );

		this.addAnim( 'walk', 0.1, [0,2,3,4,5,6,7] );
		this.addAnim( 'idle', 0.3, [0,1] );

		// It stops and idles every 5-10 seconds
		if(this.idleCheck){
			this.idleTimer = new ig.Timer(Math.floor((Math.random()*5)+5));
		}

	},

	handleTimers: function() {

		// Check if it's time to idle again
		if (this.idleTimer != null && this.idleTimer.delta() > 0 && this.currentAnim != this.anims.idle && this.currentAnim != this.anims.death) {
			this.currentAnim = this.anims.idle.rewind();
			this.speed = 0;
			this.idleTimer.reset();
		}

		this.parent();
	},

	handleAnimations: function() {

		// Check if done idling
		if (this.currentAnim == this.anims.idle && this.currentAnim.loopCount > 6) {
			this.currentAnim = this.anims.walk.rewind();
			this.speed = 5;
		}

		this.parent();
	},

	myUpdate: function() {
		
		if (!this.tempInvincible && !this.dead) {
			var xdir = this.flip ? 1 : -1;
			this.vel.x = this.speed * xdir;
		}

		this.currentAnim.flip.x = !this.flip;
		
		this.parent();
	},

});

});
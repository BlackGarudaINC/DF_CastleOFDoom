ig.module(
	'game.entities.enemy.wolf'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){

EntityWolf = EntityEnemy.extend({

	size: {x: 27, y: 12},
	offset: {x: 2, y: 20},

	health: 4,
	speed: 13,
	damage: 1,
	
	knockback: false,
	killWhenDead: false,
	showsPain: false,

	goldDropValue: 5,

	animSheet: new ig.AnimationSheet( 'media/sprites/Wolf.png', 32, 32 ),

	idleCheck: true,
	idleTimer: null,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [3,4,3,5] );
		this.addAnim( 'walk', 0.4, [0,1,0,2] );
		this.addAnim( 'attack', 0.1, [0,3,6,7,7,7,7] );
		this.addAnim( 'death', 0.1, [0,9,10,11,12], true );
		this.addAnim( 'howl', 0.1, [3,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,3]);

		// Stops walking and idles or howls every 10 - 20 secs
		if (this.idleCheck) {
			this.idleTimer = new ig.Timer(Math.floor((Math.random()*10) + 10));
		}
		
	},

	handleTimers: function() {

		// Check if it's time to moan again
		if (this.idleTimer != null && this.idleTimer.delta() > 0 && this.currentAnim == this.anims.walk && this.currentAnim != this.anims.death) {
			if ( Math.floor(Math.random() * 10) > 3 ) {
				this.currentAnim = this.anims.idle.rewind();	
			} else {
				this.currentAnim = this.anims.howl.rewind();
			}
			
			this.vel.x = 0;
			this.idleTimer.reset();
		}

		this.parent();
	},

	handleAnimations: function() {

		// Check if done moaning
		if (this.currentAnim == this.anims.idle && this.currentAnim.loopCount > 5) {
			this.currentAnim = this.anims.walk.rewind();
		} else if (this.currentAnim == this.anims.howl && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.walk.rewind();
		} else if (this.currentAnim == this.anims.attack && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.walk.rewind();
		}

		this.parent();
	},

	myUpdate: function() {
		
		if (!this.dead && this.currentAnim != this.anims.idle && this.currentAnim != this.anims.howl && this.currentAnim != this.anims.attack) {
			var xdir = this.flip ? 1 : -1;
			this.vel.x = this.speed * xdir;
			this.currentAnim = this.anims.walk;
		}

		this.currentAnim.flip.x = !this.flip;
		
		if (this.distanceTo(ig.game.player) < 60) {
			this.currentAnim = this.anims.attack.rewind();
			this.vel.x = this.vel.x * 1.1;
		}

		this.parent();
	},

})
})
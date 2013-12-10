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
	
	knockback: true,
	killWhenDead: false,
	showsPain: false,
	damageFlash: true,

	goldDropValue: 5,

	animSheet: new ig.AnimationSheet( 'media/sprites/Wolf.png', 32, 32 ),

	idleTimer: null,
	hasAttacked: false, // each time it attacks, this keeps track of when it actually starts moving fast

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [3,4,3,5] );
		this.addAnim( 'walk', 0.4, [0,1,0,2] );
		this.addAnim( 'attack', 0.1, [0,3,6,7,7,7,7] );
		this.addAnim( 'death', 0.1, [0,9,10,11,12], true );
		this.addAnim( 'howl', 0.1, [3,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,3]);

		// Stops walking and idles or howls every 10 - 20 secs
		this.idleTimer = new ig.Timer(Math.floor((Math.random()*10) + 10));
		
	},

	handleTimers: function() {

		if (this.idleTimer != null && this.idleTimer.delta() > 0 && this.currentAnim == this.anims.walk) {
			// 70% chance of idle, 30% chance of howl
			if ( Math.random() > 0.3 ) {
				this.currentAnim = this.anims.idle.rewind();	
			} else {
				this.currentAnim = this.anims.howl.rewind();
			}
			
			this.vel.x = 0;
			this.idleTimer.reset();
		} else if (this.idleTimer != null && this.idleTimer.delta() > 0) {
			// reset the timer if time is up but it's not currently walking
			this.idleTimer.reset();
		}

		this.parent();
	},

	handleAnimations: function() {

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
		
		if (!this.dead && this.currentAnim == this.anims.walk) {
			var xdir = this.flip ? 1 : -1;
			this.vel.x = this.speed * xdir;
			this.currentAnim = this.anims.walk;
		}

		this.currentAnim.flip.x = !this.flip;
		
		// Attack the player when near
		if (!this.dead && this.currentAnim != this.anims.attack &&this.distanceTo(ig.game.player) < 60) {
			this.currentAnim = this.anims.attack.rewind();
			this.vel.x = 0;
			this.hasAttacked = false;
		}

		// When attacking, actually jump at the player once it reaches a certain frame in the attack animation
		if (!this.dead && this.currentAnim == this.anims.attack && !this.hasAttacked && this.currentAnim.tile == 6) {
			var xdir = this.flip ? 1 : -1;
			this.vel.x = this.speed * xdir * 4;
			this.hasAttacked = true;
		}

		this.parent();
	},

	deathCallback: function() {
		// Stop it from moving and cancel the idle timer when it dies
		this.vel.x = 0;
		this.idleTimer = null;
		this.parent();
	}

})
})
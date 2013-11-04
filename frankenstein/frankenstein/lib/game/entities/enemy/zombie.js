ig.module(
	'game.entities.enemy.zombie'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntityZombie = EntityEnemy.extend({
	size: {x: 14, y: 24},
	offset: {x: 12, y: 8},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},

	edgeReverse: false,
	killWhenDead: false, // Use death animation instead of killing right away

	moanCheck: true,	 // Does zombie moan?
	moanTimer: null, 	 // countdown to when it moans
	
	animSheet: new ig.AnimationSheet( 'media/sprites/Zombie01.png', 32, 32 ),
	
	health: 5,
	// debugDraw: true,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'walk', 0.17, [0,2,0,3] );
		this.addAnim( 'death', 0.1, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], true );
		this.addAnim( 'moan', 0.2, [0, 4, 5, 6, 7, 8 , 5, 4]);

		// It stops and moans every 5-15 seconds
		if(this.moanCheck){
			this.moanTimer = new ig.Timer(Math.floor((Math.random()*10)+5));
		}
		
	},

	handleTimers: function() {

		// Check if it's time to moan again
		if (this.moanTimer != null && this.moanTimer.delta() > 0 && this.currentAnim != this.anims.moan && this.currentAnim != this.anims.death) {
			this.currentAnim = this.anims.moan.rewind();
			this.moanTimer.set(Math.floor((Math.random()*10)+5));
		}

		this.parent();
	},

	handleAnimations: function() {

		// Check if done moaning
		if (this.currentAnim == this.anims.moan && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.walk.rewind();
		}

		this.parent();
	},

	// Change the bounding box when flipping
	flipOver: function(direction) {
		this.parent(direction);

		if (this.flip) {
			this.offset.x = 6;
			this.pos.x += 4;
		} else {
			this.offset.x = 10;
			this.pos.x -= 4;
		}
	},
	
	
	myUpdate: function() {
		
		if (!this.tempInvincible && !this.dead && this.currentAnim != this.anims.moan) {
			var xdir = this.flip ? 1 : -1;
			this.vel.x = this.speed * xdir;
		}

		this.currentAnim.flip.x = !this.flip;
		
		this.parent();
	},
	
	kill: function() {
		// this.sfxDie.play();
		this.parent();
		
	}
});

});
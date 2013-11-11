ig.module(
	'game.entities.particle'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
EntityParticle = EntityBase.extend({

	_wmIgnore: true, // This entity will no be available in Weltmeister

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,

	removeTimer: null, // countdown to when it goes away
	removeAfterAnimation: false, // remove it as soon as the animation completes

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.vel.x = (Math.random()*10 - 5) * 10;
		this.vel.y = (Math.random() * -100) - 100;
		this.friction.x = 70.0;

		// Remove it after 3 seconds
		this.removeTimer = new ig.Timer(3);
	},

	handleAnimations: function() {
		if (this.removeAfterAnimation && this.currentAnim.loopCount > 0) {
			this.kill();
		}
		this.parent();
	},

	handleTimers: function() {

		// Check if it's time remove the particle
		if (this.removeTimer.delta() > 0) {
			this.flashKill();
		}

		this.parent();
	},
	
	
});

});
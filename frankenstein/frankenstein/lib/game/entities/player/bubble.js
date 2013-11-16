ig.module(
	'game.entities.player.bubble'
)
.requires(
	'game.entities.particle',
	'game.entities.level.water'
)
.defines(function(){
	
EntityBubble = EntityParticle.extend({

	// Bubbles from being underwater

	animSheet: new ig.AnimationSheet( 'media/sprites/WaterBubbles.png', 8, 8 ),
	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	maxVel: {x: 10, y: 50},

	gravityFactor: 0,
	reverseTimer: null,
	water: null,		// water line entity
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Use a random bubble image
		var index = Math.floor(Math.random()*3);
		this.addAnim( 'idle', 1, [index] );
		this.currentAnim = this.anims.idle;

		this.vel.x = 10;
		this.vel.y = -20 - (index)*10;
		this.accel.x = -30;

		this.reverseTimer = new ig.Timer(1);
		this.removeTimer = null;
	},

	// Find the water line
	startUpdate: function() {
		this.water = ig.game.getEntitiesByType( EntityWater )[0];
		this.parent();
	},
	
	handleTimers: function() {

		if (this.reverseTimer.delta() > 0) {
			this.accel.x = -this.accel.x;
			this.reverseTimer.reset();
		}

		this.parent();
	},

	myUpdate: function() {

		// Die once you reach the water
		if (this.pos.y < this.water.pos.y + 4) {
			this.kill();
		}

		// If you're stuck on a ceiling, die
		if (this.vel.y >= -0.01) {
			this.kill();
		}

		this.parent();
	}
	
});

});
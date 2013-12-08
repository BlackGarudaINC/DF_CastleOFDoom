ig.module(
	'game.entities.enemy.enemymelee'
)
.requires(
	'game.entities.enemy.enemyprojectile'
)
.defines(function(){
	
EntityEnemymelee = EntityEnemyprojectile.extend({

	size: {x: 12, y: 32},
	offset: {x: 0, y: 0},

	collides: ig.Entity.COLLIDES.NEVER,

	ignoreCollisions: true,
	gravityFactor: 0,
	killTimer: null,

	// debugDraw: true,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.killTimer = new ig.Timer(0.5);
	},

	handleTimers: function() {
		// Check if it's time to kill this
		if (this.killTimer != null && this.killTimer.delta() > 0) {
			this.killTimer = null;
			this.kill();
		}

		this.parent();
	},

	// Destroy it once it deals damage
	giveDamageCallback: function() {
		this.parent();
		this.kill();
	}
	
});

});
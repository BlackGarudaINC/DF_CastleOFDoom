ig.module(
	'game.entities.enemy.witchprojectile'
)
.requires(
	'game.entities.enemy.enemyprojectile'
)
.defines(function(){
	
EntityWitchprojectile = EntityEnemyprojectile.extend({

	size: {x: 12, y: 12},
	offset: {x: 10, y: 10},

	collides: ig.Entity.COLLIDES.NEVER,

	ignoreCollisions: true,
	gravityFactor: 0,
	speed: 120,

	// debugDraw: true,

	zIndex: 30,
	
	animSheet: new ig.AnimationSheet( 'media/sprites/Witch.png', 32, 32 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [8, 9, 10] );

		// Shoot it at the player
		var xdiff = ig.game.player.pos.x - this.pos.x;
		var ydiff = ig.game.player.pos.y - this.pos.y;
		var dist  = this.distanceTo(ig.game.player);

		if (dist == 0) { dist = 0.0001; }

		this.vel.x = (xdiff / dist) * this.speed;
		this.vel.y = (ydiff / dist) * this.speed;
	}
	
});

});
ig.module(
	'game.entities.enemy.cannonprojectile'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemyprojectile'
)
.defines(function(){
	
EntityCannonprojectile = EntityEnemyprojectile.extend({

	collides: ig.Entity.COLLIDES.NONE,

	size: {x: 8, y: 14},
	offset: {x: 4, y: 1},

	ignoreCollisions: true,
	gravityFactor: 0,
	speed: 80,

	// debugDraw: true,
	
	animSheet: new ig.AnimationSheet( 'media/sprites/WallCannonProjectiles.png', 16, 16 ),

	// These can be overridden in the settings for the different types
	tile: 0,
	yDir: -1,
	xDir: 0,	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [this.tile, this.tile+1, this.tile+2, this.tile+3] );

		this.vel.x = this.xDir * this.speed;
		this.vel.y = this.yDir * this.speed;

		// Rotate it and change the hit box accordingly
		if (this.xDir == 1) {
			this.currentAnim.angle = ig.game.HALFPI;
		} else if (this.yDir == 1) {
			this.currentAnim.angle = Math.PI;
		} else if (this.xDir == -1) {
			this.currentAnim.angle = Math.PI + ig.game.HALFPI;
		}
		if (this.xDir != 0) {
			this.size.x = 14;
			this.size.y = 8;
			this.offset.x = 1;
			this.offset.y = 4;
		}
	}
	
});

});
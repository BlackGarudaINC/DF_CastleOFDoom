ig.module(
	'game.entities.enemy.cyclopslaser'
)
.requires(
	'game.entities.enemy.enemyprojectile'
)
.defines(function(){
	
EntityCyclopslaser = EntityEnemyprojectile.extend({

	size: {x: 10, y: 32},
	offset: {x: 19, y: 10},

	gravityFactor: 0,
	speed: 150,

	// debugDraw: true,

	zIndex: 30,
	
	animSheet: new ig.AnimationSheet( 'media/sprites/Cyclops.png', 48, 48 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [13,14,15], true );

		this.vel.x = (this.flip ? -this.speed : this.speed);
	}
	
});

});
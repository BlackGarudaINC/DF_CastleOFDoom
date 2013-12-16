ig.module(
	'game.entities.enemy.cyclops'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){

EntityCyclops = EntityEnemy.extend({

	size: {x: 34, y: 34},
	offset: {x: 4, y: 14},

	health: 12,
	damage: 2,
	speed: 20,
	goldDropValue: 20,

	animSheet: new ig.AnimationSheet( 'media/sprites/Cyclops.png', 48, 48 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'walk', 0.1, [0,2,0,3] );
		this.addAnim( 'pain', 0.1, [6] );
		this.addAnim( 'roar', 0.1, [0,4,5] );
		this.addAnim( 'death', 0.1, [0,8,9,10,11,12], true );
		this.addAnim( 'attack', 0.1, [0,7], true);
		this.addAnim( 'projectile', 0.1, [13,14,15,15,15,15,15,15,15,15,15] );
		
	},

})
})
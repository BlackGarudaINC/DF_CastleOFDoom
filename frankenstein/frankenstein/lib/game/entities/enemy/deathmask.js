ig.module(
	'game.entities.enemy.deathmask'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy',
	'game.entities.enemy.phantasm'
)
.defines(function(){

EntityDeathmask = EntityPhantasm.extend({

	size: {x: 24, y: 32},
	offset: {x: 3, y: 0},

	health: 4,

	instantDeath: false,

	animSheet: new ig.AnimationSheet( 'media/sprites/DeathMask.png', 32, 32 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0] );
		this.addAnim( 'attack', 0.2, [1] );
		this.addAnim( 'walk', 0.1, [0,2,0,3] );
		this.addAnim( 'pain', 0.1, [2] );
		this.addAnim( 'death', 0.1, [3,3,3,3], true);
		// frames 4,5,6,7 apply to the death animation but must be done as particles.
	},

})
})
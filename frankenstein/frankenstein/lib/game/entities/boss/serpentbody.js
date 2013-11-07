ig.module(
	'game.entities.boss.serpentbody'
)
.requires(
	'game.entities.boss.bosschain',
	'impact.entity'
)
.defines(function(){
	

EntitySerpentbody = EntityBosschain.extend({

	size: {x: 32, y: 32},

	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 32, 32 ),

	damageBoss: true,
	health: 10,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [2] );
	}
	
	
});

});
ig.module(
	'game.entities.enemy.candle'
)
.requires(
	'game.entities.enemy.enemyparticle',
	'impact.entity'
)
.defines(function(){
	
EntityCandle = EntityEnemyparticle.extend({

	// Candles from falling chandelier

	animSheet: new ig.AnimationSheet( 'media/sprites/CandleFall01.png', 8, 8 ),
	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	bounciness: 0.3,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [0, 1]);

	}
	
	
});

});
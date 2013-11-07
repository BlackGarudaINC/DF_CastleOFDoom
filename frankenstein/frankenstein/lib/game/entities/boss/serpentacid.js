ig.module(
	'game.entities.boss.serpentacid'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemyprojectile'
)
.defines(function(){
	
EntitySerpentacid = EntityEnemyprojectile.extend({

	size: {x: 12, y: 12},
	offset: {x: 10, y: 10},
	
	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 32, 32 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [3] );

	}
	
});

});
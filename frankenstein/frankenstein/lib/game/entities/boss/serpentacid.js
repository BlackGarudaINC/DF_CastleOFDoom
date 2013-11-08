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

	ignoreCollisions: true,
	killWhenDead: false, // Use death animation
	
	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 32, 32 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [3] );
		this.addAnim( 'death', 0.05, [3, 4, 5, 6, 7], true );

	},

	// Stop it from moving when it breaks open
	deathCallback: function() {
		this.vel.x = 0;
		this.vel.y = 0;
		this.gravityFactor = 0;
	}
	
});

});
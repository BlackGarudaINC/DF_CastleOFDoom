ig.module(
	'game.entities.item.heartcontaineritem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityHeartcontaineritem = EntityItem.extend({

	// These can only be spawned by gold treasure chests
	_wmIgnore: true,
	goldItem: true,

	size: {x: 10, y: 12},
	offset: {x: 2, y: 6},
	animSheet: new ig.AnimationSheet( 'media/sprites/Items01_HUD.png', 16, 24 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [10] );
		this.currentAnim = this.anims.idle;
	},

	// Give the player the weapon
	collected: function( other ) {
		ig.game.playerState.maxHealth += 2;
		ig.game.playerState.health = ig.game.playerState.maxHealth;
		this.parent();
	}
});

});
ig.module(
	'game.entities.item.keyitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityKeyitem = EntityItem.extend({

	// These can only be spawned by gold treasure chests
	_wmIgnore: true,
	goldItem: true,

	size: {x: 10, y: 16},
	offset: {x: 2, y: 4},
	animSheet: new ig.AnimationSheet( 'media/sprites/Items01_HUD.png', 16, 24 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [12] );
		this.currentAnim = this.anims.idle;
	},

	// Give the player the key
	collected: function( other ) {
		ig.game.playerState.hasKey = true;
		this.parent();
	}
});

});
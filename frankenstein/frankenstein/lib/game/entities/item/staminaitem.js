ig.module(
	'game.entities.item.staminaitem'
)
.requires(
	'game.entities.item.item',
	'game.entities.fadetext'
)
.defines(function(){
	
EntityStaminaitem = EntityItem.extend({

	// These can only be spawned by gold treasure chests
	_wmIgnore: true,
	goldItem: true,

	size: {x: 10, y: 12},
	offset: {x: 2, y: 6},
	animSheet: new ig.AnimationSheet( 'media/sprites/Items01_HUD.png', 16, 24 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// TODO: this is just placeholder art for now
		this.addAnim( 'idle', 0.1, [9] );
		this.currentAnim = this.anims.idle;
	},

	// Give the player the weapon
	collected: function( other ) {
		ig.game.playerState.maxStamina += 5;

		// Inform the player about the stamina
		ig.game.spawnEntity( EntityFadetext, this.pos.x + 10, this.pos.y, {text: "+Stamina"} );

		this.parent();
	}
});

});
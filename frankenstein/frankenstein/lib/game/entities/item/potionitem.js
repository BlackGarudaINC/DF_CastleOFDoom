ig.module(
	'game.entities.item.potionitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityPotionitem = EntityItem.extend({

	size: {x: 8, y: 8},
	animSheet: new ig.AnimationSheet( 'media/sprites/ItemObjetcs01.png', 8, 8 ),

	potionCollected: new ig.Sound( 'media/sounds/Items/FullRecovery.*' ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'main', 0.1, [2] );
		this.currentAnim = this.anims.main;
	},

	// Give the player the weapon
	collected: function( other ) {
		ig.game.playerState.health = ig.game.playerState.maxHealth;

		this.potionCollected.play();

		this.parent();
	}
});

});
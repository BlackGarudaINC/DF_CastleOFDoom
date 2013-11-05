ig.module(
	'game.entities.item.golditem'
)
.requires(
	'game.entities.item.item',
	'game.entities.fadetext'
)
.defines(function(){
	
EntityGolditem = EntityItem.extend({

	size: {x: 8, y: 8},
	offset: {x: 0, y: 8},
	animSheet: new ig.AnimationSheet( 'media/sprites/ItemObjetcs01.png', 16, 16 ),

	goldCollected: new ig.Sound( 'media/sounds/Items/Gold.*' ),

	value: 10, // Default monetary value

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'main', 0.1, [2] );
		this.currentAnim = this.anims.main;
	},

	// Give the player the weapon
	collected: function( other ) {
		ig.game.playerState.gold += this.value;

		// Show how much the player got
		ig.game.spawnEntity( EntityFadetext, this.pos.x + 10, this.pos.y, {text: "+" + this.value} );

		// Play the gold collection sound
		this.goldCollected.play();
		
		this.parent();
	}
});

});
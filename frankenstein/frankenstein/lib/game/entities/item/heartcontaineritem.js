ig.module(
	'game.entities.item.heartcontaineritem'
)
.requires(
	'game.entities.item.item',
	'game.entities.fadetext'
)
.defines(function(){
	
EntityHeartcontaineritem = EntityItem.extend({

	// These can only be spawned by gold treasure chests
	_wmIgnore: true,
	goldItem: true,

	size: {x: 10, y: 12},
	offset: {x: 2, y: 6},
	animSheet: new ig.AnimationSheet( 'media/sprites/Items01_HUD.png', 16, 24 ),

	containerCollected: new ig.Sound( 'media/sounds/Items/Weapon.*' ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [10] );
		this.currentAnim = this.anims.idle;
	},

	// Give the player the weapon
	collected: function( other ) {
		ig.game.playerState.maxHealth += 2;
		ig.game.playerState.health = ig.game.playerState.maxHealth;
		this.containerCollected.play();

		// Inform the player about what they got
		ig.game.spawnEntity( EntityFadetext, this.pos.x + 10, this.pos.y, {text: "+Health"} );

		this.parent();
	}
});

});
ig.module(
	'game.entities.item.heartitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityHeartitem = EntityItem.extend({

	size: {x: 8, y: 8},
	animSheet: new ig.AnimationSheet( 'media/sprites/ItemObjetcs01.png', 8, 8 ),

	// Give the player the weapon
	collected: function( other ) {
		ig.game.playerState.health += 2;
		if (ig.game.playerState.health > ig.game.playerState.maxHealth) {
			ig.game.playerState.health = ig.game.playerState.maxHealth;
		}
		this.parent();
	}
});

});
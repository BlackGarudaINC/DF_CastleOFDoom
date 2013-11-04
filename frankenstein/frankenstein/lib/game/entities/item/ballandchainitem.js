ig.module(
	'game.entities.item.ballandchainitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityBallandchainitem = EntityItem.extend({

	size: {x: 24, y: 12},
	
	animSheet: new ig.AnimationSheet( 'media/sprites/BallAndChain_Weapon.png', 24, 12 ),

	// Give the player the weapon
	collected: function( other ) {
		other.changeMeleeWeapon(3);
		this.parent();
	}
});

});
ig.module(
	'game.entities.item.aciditem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityAciditem = EntityItem.extend({

	size: {x: 8, y: 8},
	animSheet: new ig.AnimationSheet( 'media/sprites/Acid_ThrowWeapon.png', 8, 8 ),

	// Give the player the weapon
	collected: function( other ) {
		other.changeThrowingWeapon(3);
		this.parent();
	}
});

});
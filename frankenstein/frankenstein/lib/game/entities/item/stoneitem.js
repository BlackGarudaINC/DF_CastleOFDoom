ig.module(
	'game.entities.item.stoneitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityStoneitem = EntityItem.extend({

	size: {x: 8, y: 8},
	animSheet: new ig.AnimationSheet( 'media/sprites/Stone_WeaponThrow.png', 8, 8 ),

	isWeapon: true,

	// Give the player the weapon
	collected: function( other ) {
		other.changeThrowingWeapon(2);
		this.parent();
	}
});

});
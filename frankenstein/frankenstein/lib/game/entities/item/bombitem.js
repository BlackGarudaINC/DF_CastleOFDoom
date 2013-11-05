ig.module(
	'game.entities.item.bombitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityBombitem = EntityItem.extend({

	animSheet: new ig.AnimationSheet( 'media/sprites/Bomb_WeaponThrow.png', 16, 16 ),

	isWeapon: true,

	// Give the player the weapon
	collected: function( other ) {
		other.changeThrowingWeapon(4);
		this.parent();
	}
});

});
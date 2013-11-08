ig.module(
	'game.entities.item.hatchetitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityHatchetitem = EntityItem.extend({

	animSheet: new ig.AnimationSheet( 'media/sprites/Hatchet_WeaponThrow.png', 16, 16 ),

	size: {x: 8, y: 12},
	offset: {x: 3, y: 4},

	isWeapon: true,

	// Give the player the hatchet weapon
	collected: function( other ) {
		other.changeThrowingWeapon(1);
		this.parent();
	}
});

});
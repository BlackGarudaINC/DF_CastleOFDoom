ig.module(
	'game.entities.item.clubitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityClubitem = EntityItem.extend({

	size: {x: 8, y: 18},
	offset: {x: 12, y:12},
	
	animSheet: new ig.AnimationSheet( 'media/sprites/TheCreature01.png', 32, 32 ),

	isWeapon: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [63] );
		this.currentAnim = this.anims.idle.rewind();
	},

	// Give the player the weapon
	collected: function( other ) {
		other.changeMeleeWeapon(1);
		this.parent();
	}
});

});
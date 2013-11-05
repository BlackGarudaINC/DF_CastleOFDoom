ig.module(
	'game.entities.item.scytheitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityScytheitem = EntityItem.extend({

	size: {x: 16, y: 20},
	offset: {x: 8, y:8},
	
	animSheet: new ig.AnimationSheet( 'media/sprites/TheCreature01.png', 32, 32 ),

	isWeapon: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [54] );
		this.currentAnim = this.anims.idle.rewind();
	},

	// Give the player the weapon
	collected: function( other ) {
		other.changeMeleeWeapon(4);
		this.parent();
	}
});

});
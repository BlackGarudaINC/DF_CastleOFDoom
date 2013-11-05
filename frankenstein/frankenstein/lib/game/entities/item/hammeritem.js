ig.module(
	'game.entities.item.hammeritem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityHammeritem = EntityItem.extend({

	size: {x: 8, y: 22},
	offset: {x: 12, y:8},
	
	animSheet: new ig.AnimationSheet( 'media/sprites/TheCreature01.png', 32, 32 ),

	isWeapon: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [62] );
		this.currentAnim = this.anims.idle.rewind();
	},

	// Give the player the weapon
	collected: function( other ) {
		other.changeMeleeWeapon(5);
		this.parent();
	}
});

});
ig.module(
	'game.entities.item.electricitem'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
EntityElectricitem = EntityItem.extend({

	size: {x: 16, y: 22},
	offset: {x: 8, y:8},
	
	// TODO: This is just placeholder for now
	animSheet: new ig.AnimationSheet( 'media/sprites/TheCreature01.png', 32, 32 ),

	damage: 1,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [131, 132] );
		this.currentAnim = this.anims.idle.rewind();
	},

	// Energize the player or hurt them
	collected: function( other ) {
		if (ig.game.playerState.energize) {
			ig.game.player.getEnergized();
			this.parent();
		} else {
			other.receiveDamage( this.damage, this );
		}
	}
});

});
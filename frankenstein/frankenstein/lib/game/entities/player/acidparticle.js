ig.module(
	'game.entities.player.acidparticle'
)
.requires(
	'game.entities.particle',
	'impact.entity'
)
.defines(function(){
	
EntityAcidparticle = EntityParticle.extend({

	// Glass shards from the acid vile

	animSheet: new ig.AnimationSheet( 'media/sprites/Acid_ThrowWeapon.png', 8, 8 ),
	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'one', 0.3, [1]);
		this.addAnim( 'two', 0.3, [2]);
		this.addAnim( 'three', 0.3, [3]);

		this.friction.x = 140.0;

		// Use the settings to determine which type to use
		if (settings.image == 1) {
			this.currentAnim = this.anims.one;
		} else if (settings.image == 2) {
			this.currentAnim = this.anims.two;
		} else if (settings.image == 3) {
			this.currentAnim = this.anims.two;
		}
	},
	
	
});

});
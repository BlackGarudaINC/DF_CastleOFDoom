ig.module(
	'game.entities.player.stoneparticle'
)
.requires(
	'game.entities.particle',
	'impact.entity'
)
.defines(function(){
	
EntityStoneparticle = EntityParticle.extend({

	// The stone breaks into particles upon impact

	animSheet: new ig.AnimationSheet( 'media/sprites/Stone_WeaponThrow.png', 8, 8 ),
	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	bounciness: 0.3,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'one', 0.3, [1]);
		this.addAnim( 'two', 0.3, [2]);

		// Use the settings to determine which type to use
		if (settings.image == 1) {
			this.currentAnim = this.anims.one;
		} else if (settings.image == 2) {
			this.currentAnim = this.anims.two;
		}
	},
	
	
});

});
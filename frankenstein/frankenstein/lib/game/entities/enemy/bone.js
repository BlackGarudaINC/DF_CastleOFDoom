ig.module(
	'game.entities.enemy.bone'
)
.requires(
	'game.entities.particle',
	'impact.entity'
)
.defines(function(){
	
EntityBone = EntityParticle.extend({

	// These are the bone particles from the skeleton, as well as the coffin particles.

	animSheet: new ig.AnimationSheet( 'media/sprites/skeleton01.png', 32, 32 ),
	size: {x: 16, y: 16},
	offset: {x: 0, y: 0},
	bounciness: 0.3,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Bones
		this.addAnim( 'one', 0.3, [8]);
		this.addAnim( 'two', 0.3, [9]);
		this.addAnim( 'three', 0.3, [10]);

		// Coffin pieces
		this.addAnim( 'four', 0.3, [11]);
		this.addAnim( 'five', 0.3, [12]);

		// Use the settings to determine which type to use
		if (settings.image == 1) {
			this.currentAnim = this.anims.one;
		} else if (settings.image == 2) {
			this.currentAnim = this.anims.two;
		} else if (settings.image == 3) {
			this.currentAnim = this.anims.three;
		} else if (settings.image == 4) {
			this.currentAnim = this.anims.four;
		} else {
			this.currentAnim = this.anims.five;
		}

	},
	
	
});

});
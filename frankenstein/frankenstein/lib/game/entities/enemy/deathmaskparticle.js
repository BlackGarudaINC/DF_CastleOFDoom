ig.module(
	'game.entities.enemy.deathmaskparticle'
)
.requires(
	'game.entities.particle'
)
.defines(function(){
	
EntityDeathmaskparticle = EntityParticle.extend({

	// These are the bone particles from the skeleton, as well as the coffin particles.

	animSheet: new ig.AnimationSheet( 'media/sprites/DeathMask.png', 32, 32 ),
	size: {x: 16, y: 16},
	offset: {x: 0, y: 0},
	spriteIndex: 4,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [this.spriteIndex]);

		if (this.spriteIndex == 5 || this.spriteIndex == 7) {
			this.offset.x = 16;
			this.offset.y = 16;
		}
	},
	
	
});

});
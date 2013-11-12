ig.module(
	'game.entities.trap.spikes'
)
.requires(
	'impact.entity',
	'game.entities.trap.trap'
)
.defines(function(){
	
// Basically, just an unkillable enemy, like spikes or something
EntitySpikes = EntityTrap.extend({

	collides: ig.Entity.COLLIDES.FIXED,

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/sprites/Spike_Trap.png', 8, 8 ),

	gravityFactor: 0,

	tile: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [this.tile] );

		if(this.flip){
			this.currentAnim.flip.y = true;
		}
	},
	
});

});
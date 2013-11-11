ig.module(
	'game.entities.trap.spikes'
)
.requires(
	'impact.entity',
	'game.entities.enemy.trap'
)
.defines(function(){
	
// Basically, just an unkillable enemy, like spikes or something
EntitySpikes = EntityTrap.extend({

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/sprites/Spike_Trap.png', 8, 8 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [0] );

	},
	
});

});
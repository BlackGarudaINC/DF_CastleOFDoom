ig.module(
	'game.entities.enemy.phantasmspeed'
)
.requires(
	'impact.entity',
	'game.entities.enemy.phantasm'
)
.defines(function(){
	
EntityPhantasmspeed = EntityPhantasm.extend({
	speed: 0.8, 		// This is moving manually (without physics)

	animSheet: new ig.AnimationSheet( 'media/sprites/Phantasm02.png', 32, 32 ),
	
});

});
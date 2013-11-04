ig.module(
	'game.entities.enemy.bonepower'
)
.requires(
	'game.entities.enemy.bone',
	'impact.entity'
)
.defines(function(){
	
EntityBonepower = EntityBone.extend({

	// These are the bone particles from the skeleton, as well as the coffin particles.

	animSheet: new ig.AnimationSheet( 'media/sprites/skeleton02.png', 32, 32 ),
	
});

});
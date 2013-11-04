ig.module(
	'game.entities.enemy.skeletonpower'
)
.requires(
	'impact.entity',
	'game.entities.enemy.bonepower',
	'game.entities.enemy.skeleton'
)
.defines(function(){
	
EntitySkeletonpower = EntitySkeleton.extend({
	animSheet: new ig.AnimationSheet( 'media/sprites/skeleton02.png', 32, 32 ),
	
	health: 5,
	damage: 2,

	goldDropValue: 15,
	
	createParticles: function() {
		// Generate a bunch of bones as particles
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-15, {image: 1} );
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-5, {image: 2} );
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-5, {image: 3} );
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-5, {image: 3} );
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-5, {image: 2} );
		
	}
});

});
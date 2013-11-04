ig.module(
	'game.entities.enemy.coffinpower'
)
.requires(
	'impact.entity',
	'game.entities.enemy.skeletonpower',
	'game.entities.enemy.coffin'
)
.defines(function(){
	
EntityCoffinpower = EntityCoffin.extend({

	animSheet: new ig.AnimationSheet( 'media/sprites/skeleton02.png', 32, 32 ),

	spawnSkeleton: function(){
		ig.game.spawnEntity( EntitySkeletonpower, this.pos.x, this.pos.y );
	},
	
	createParticles: function(){

		// Generate a bunch of bones as particles
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-5, {image: 5} );
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-5, {image: 4} );
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-5, {image: 5} );
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-5, {image: 4} );
		ig.game.spawnEntity( EntityBonepower, this.pos.x, this.pos.y-5, {image: 5} );
	
	},

});

});
ig.module(
	'game.entities.level.monstercloset'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
// Normal chests have standard items, defined in weltmeister.
EntityMonstercloset = EntityEnemy.extend({

	size: {x: 16, y: 32},
	offset: {x: 0, y: 0},

	animSheet: new ig.AnimationSheet( 'media/sprites/ClosetDoors.png' ),

});

});
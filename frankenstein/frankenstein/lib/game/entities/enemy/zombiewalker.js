ig.module(
	'game.entities.enemy.zombiewalker'
)
.requires(
	'impact.entity',
	'game.entities.enemy.zombie'
)
.defines(function(){
	
EntityZombiewalker = EntityZombie.extend({
	animSheet: new ig.AnimationSheet( 'media/sprites/Zombie02.png', 32, 32 ),
	
	health: 8,
	damage: 2,
	speed: 28,

	goldDropValue: 15,

	moanCheck: false

});

});
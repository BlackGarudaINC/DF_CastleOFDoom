ig.module(
	'game.entities.enemy.trap'
)
.requires(
	'game.entities.enemy.enemy',
	'impact.entity'
)
.defines(function(){
	
// Basically, just an unkillable enemy, like spikes or something
EntityTrap = EntityEnemy.extend({

	knockback: false,
	drawHealthBar: false,
	damageFlash: false,
	dropsItems: false, 
	wallReverse: false,	
	edgeReverse: false,	
	levelReverse: false,
	invincible: true

	
	
});

});
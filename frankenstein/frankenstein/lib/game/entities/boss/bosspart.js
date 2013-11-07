ig.module(
	'game.entities.boss.bosspart'
)
.requires(
	'game.entities.enemy.enemy',
	'impact.entity'
)
.defines(function(){
	
// Part of a boss, but not the actual boss itself (should be spawned directly from the boss)
EntityBosspart = EntityEnemy.extend({

	_wmIgnore: true,

	knockback: false,
	drawHealthBar: false,
	damageFlash: true,

	boss: null,				// Instance of the boss
	damageBoss: false,		// Does the damage this part takes also hurt the main boss?
	damageMultiplier: 1,	// Does damage to this part hurt more or less than other parts?

	// "boss" should be passed in at spawn
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

	},

	// Check if the damage also hurts the main boss
	receiveDamage: function( amount, from, bounceback, direction ) {

		if (this.damageBoss) {
			console.log(this.boss);
			this.boss.receiveDamage( amount*this.damageMultiplier, from, bounceback, direction );
		}

		this.parent( amount, from, bounceback, direction );
	}
	
	
});

});
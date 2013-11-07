ig.module(
	'game.entities.enemy.enemypart'
)
.requires(
	'game.entities.enemy.enemy',
	'impact.entity'
)
.defines(function(){
	
// Part of an enemy, but not the actual enemy itself (should be spawned directly from the enemy)
EntityEnemypart = EntityEnemy.extend({

	_wmIgnore: true,

	knockback: false,
	drawHealthBar: false,
	damageFlash: true,
	dropsItems: false, 
	ignoreCollisions: true,

	master: null,			// Instance of the controlling enemy
	damageMaster: false,	// Does the damage this part takes also hurt the main enemy?
	damageMultiplier: 1,	// Does damage to this part hurt more or less than other parts?

	// "master" should be passed in at spawn
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Register this part with the boss
		this.master.registerPart(this);
	},

	// Check if the damage also hurts the master
	receiveDamage: function( amount, from, bounceback, direction ) {

		if (this.damageMaster) {
			this.master.receiveDamage( amount*this.damageMultiplier, from, bounceback, direction );
		}

		this.parent( amount, from, bounceback, direction );
	}
	
	
});

});
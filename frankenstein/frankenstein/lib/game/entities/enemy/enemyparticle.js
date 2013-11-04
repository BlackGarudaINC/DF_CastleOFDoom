ig.module(
	'game.entities.enemy.enemyparticle'
)
.requires(
	'game.entities.particle',
	'impact.entity'
)
.defines(function(){
	
// Particles that hurt you
EntityEnemyparticle = EntityParticle.extend({

	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,

	damage: 1,

	// Hurt the player
	check: function( other ) {
		if (!this.dead) {
			other.receiveDamage( this.damage, this );
		}
	}

});

});
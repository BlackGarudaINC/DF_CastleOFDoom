ig.module(
	'game.entities.boss.serpentbody'
)
.requires(
	'game.entities.enemy.enemychain',
	'impact.entity'
)
.defines(function(){
	

EntitySerpentbody = EntityEnemychain.extend({

	size: {x: 32, y: 32},

	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 32, 32 ),

	damageMaster: true,
	damageMultiplier: 0.3,	// Damage to the body does a lot less damage than head damage
	invincible: true,		// You can't destroy the individual body segments
	killWhenDead: false,
	rotates: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [2] );
		this.addAnim( 'death', 4, [22], true );
	},

	// Make it stop and fall to the ground when dead
	deathCallback: function() {
		this.vel.x = 0;
		this.vel.y = 0;
		this.accel.x = 0;
		this.accel.y = 0;
		this.gravityFactor = ig.game.gravity;
		this.ignoreCollisions = false;
		this.maxVel.y = 400;

		this.parent();
	}
	
	
});

});
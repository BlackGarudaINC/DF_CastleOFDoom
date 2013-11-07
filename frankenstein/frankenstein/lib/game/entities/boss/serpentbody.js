ig.module(
	'game.entities.boss.serpentbody'
)
.requires(
	'game.entities.boss.bosschain',
	'impact.entity'
)
.defines(function(){
	

EntitySerpentbody = EntityBosschain.extend({

	size: {x: 32, y: 32},

	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 32, 32 ),

	damageBoss: true,
	damageMultiplier: 0.3,	// Damage to the body does a lot less damage than head damage
	invincible: true,		// You can't destroy the individual body segments
	killWhenDead: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [2] );
		this.addAnim( 'death', 2, [2, 2], true );
	},

	// Make it stop and fall to the ground when dead
	deathCallback: function() {
		this.vel.x = 0;
		this.vel.y = 0;
		this.gravityFactor = ig.game.gravity;
		this.ignoreCollisions = false;

		this.parent();
	}
	
	
});

});
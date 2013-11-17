ig.module(
	'game.entities.enemy.skullserpentbody'
)
.requires(
	'game.entities.enemy.enemychain',
	'impact.entity'
)
.defines(function(){
	

EntitySkullserpentbody = EntityEnemychain.extend({

	size: {x: 18, y: 20},
	offset: {x: 7, y: 6},

	animSheet: new ig.AnimationSheet( 'media/sprites/SkullSerpent.png', 32, 32 ),

	damageMaster: true,
	killWhenDead: false,
	rotates: true,
	invincible: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [2], true );
		this.addAnim( 'death', 2, [2], true );
	},

	// Make it stop and fall to the ground when dead
	deathCallback: function() {
		this.vel.x = 0;
		this.vel.y = 0;
		this.accel.x = 0;
		this.accel.y = 0;
		this.gravityFactor = 1;
		this.ignoreCollisions = false;
		this.maxVel.x = 0;
		this.maxVel.y = 300;

		this.parent();
	}
	
	
});

});
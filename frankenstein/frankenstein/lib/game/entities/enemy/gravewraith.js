ig.module(
	'game.entities.enemy.gravewraith'
)
.requires(
	'impact.entity',
	'game.entities.enemy.phantasm'
)
.defines(function(){
	
EntityGravewraith = EntityPhantasm.extend({
	health: 6,
	
	size: {x: 32, y: 28},
	offset: {x: 0, y: 2},
	maxVel: {x: 200, y: 200},

	speed: 30,			// Patrol speed
	attackSpeed: 100,	// Attack speed
	attackRange: 350,

	goldDropValue: 15,	 // Value of gold that this enemy drops

	animSheet: new ig.AnimationSheet( 'media/sprites/GraveWraith.png', 32, 32 ),

	//debugDraw: true,

	// Calculate the vectors needed to move towards the player
	prepareAttack: function() {
		var xdiff = ig.game.player.pos.x - this.pos.x;
		var ydiff = ig.game.player.pos.y - this.pos.y;
		var dist  = this.distanceTo(ig.game.player);

		if (dist == 0) { dist = 0.0001; }

		this.vel.x = (xdiff / dist) * this.attackSpeed;
		this.vel.y = (ydiff / dist) * this.attackSpeed + 100;
		this.accel.y = -100;

		this.flip = (ig.game.player.pos.x > this.pos.x);
	},

	setVelocity: function() {

		if (this.currentAnim != this.anims.attack) {

			// Patrol
			this.accel.y = 0;
			this.vel.y = 0;
			this.vel.x = this.flip ? this.speed : -this.speed;
		}
	}
});

});
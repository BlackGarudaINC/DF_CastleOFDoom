ig.module(
	'game.entities.enemy.enemyprojectile'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){
	

EntityEnemyprojectile = EntityEnemy.extend({
	
	_wmIgnore: true,

	maxVel: {x: 400, y: 400},

	killWhenDead: true,
	invincible: true,
	wallReverse: false,
	edgeReverse: false,
	levelReverse: false, 
	dropsItems: false, 
	instantDeath: true, // don't flash out
	
	handleMovementTrace: function( res ) {
		
		// Get destroyed when hitting a wall
		if( !this.dead &&  (res.collision.y || res.collision.x )) {
			this.die();
		}

		this.parent( res );
		
	},

	myUpdate: function() {

		// kill itself when it leaves the room
		if (this.pos.x < -32 || this.pos.x > ig.game.levelWidth + 8 || this.pos.y < -32 || this.pos.y > ig.game.levelHeight + 8) {
			this.kill();
		}

		this.parent();
	}
	
});

});
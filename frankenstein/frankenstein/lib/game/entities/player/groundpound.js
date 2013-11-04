ig.module(
	'game.entities.player.groundpound'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack'
)
.defines(function(){

EntityGroundpound = EntityPlayerattack.extend({

	size: {x: 24, y: 12},

	ignorePhysics: true,	
	visible: false,
	damage: 2,
	bounceback: 2,
	stayAfterDamage: true,

	// debugDraw: true,

	// Always be below to the player
	myUpdate: function() {

		// Make sure the player is still ground pounding
		if (!ig.game.player.pounding()) {
			this.kill();
		}

		this.pos.x = ig.game.player.pos.x - 4;
		this.pos.y = ig.game.player.pos.y + 20;

		this.parent();
	}
	
});



});

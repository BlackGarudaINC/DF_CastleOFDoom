ig.module(
	'game.entities.level.wallcannon'
)
.requires(
	'game.entities.base',
	'game.entities.enemy.cannonprojectile'
)
.defines(function(){
	
EntityWallcannon = EntityBase.extend({

	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 55, 55, 0.7)',

	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NONE,

	gravityFactor: 0,
	ignoreCollisions: true,

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},

	zIndex: -60,

	fireTimer: null,	// Time until next fire
	fireCount: 0,		// How many times it fired in this cycle

	// Definable in Weltmeister
	fireCycle: 3,		// How many projectiles to fire per cycle
	fireWait: 0.5,		// How long to wait between firing
	waitTime: 4,		// How much time to wait between cycles
	yDir: -1,			// Direction to fire.  By default, it fires up.
	xDir: 0,
	tile: 0,			// Type of projectile to spawn (multiples of 4, corresponding to the wall cannon projectile sheet)		

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.fireTimer = new ig.Timer(this.waitTime);
	},


	handleTimers: function() {
		// Check if it's time to shake or fall
		if (this.fireTimer != null && this.fireTimer.delta() > 0) {
			
			ig.game.spawnEntity( EntityCannonprojectile, this.pos.x, this.pos.y, {yDir: this.yDir, xDir: this.xDir, tile: this.tile} );

			this.fireCount += 1;
			if (this.fireCount >= this.fireCycle) {
				this.fireCount = 0;
				this.fireTimer.set(this.waitTime);
			} else {
				this.fireTimer.set(this.fireWait);
			}
		}

		this.parent();
	}
	
});

});
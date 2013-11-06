/*
This entity calls ig.game.loadLevel() when its triggeredBy() method is called -
usually through an EntityTrigger entity.


Keys for Weltmeister:

level
	Name of the level to load. E.g. "LevelTest1" or just "test1" will load the 
	'LevelTest1' level.
spawn
	Name of the spawn point where the player should start in the next room
*/

ig.module(
	'game.entities.levelchange'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
EntityLevelchange = EntityBase.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 0, 255, 0.7)',
	_wmScalable: true,

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // check against the player only
	collides: ig.Entity.COLLIDES.NEVER,
	ignorePhysics: true,

	size: {x: 16, y: 16},
	level: null,
	spawn: null,
	active: true,	// certain doors inherit from this and aren't initially active
	fadeTimer: null,
	requireUp: true,	// Require the player to press "up" to go in

	handleTimers: function() {

		if (this.fadeTimer != null && this.fadeTimer.delta() > 0) {
			this.changeLevel();
		}

		this.parent();
	},

	changeLevel: function() {
		var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function( m, l, a, b ) {
			return a.toUpperCase() + b;
		});

		ig.game.spawnLoc = this.spawn;
		
		ig.game.currentLevelName = levelName;
		ig.game.loadLevelDeferred( ig.global['Level'+levelName] );
	},
	
	check: function( other ) {
		if( this.level && this.active && this.fadeTimer == null && (ig.input.state('up') || !this.requireUp) ) {
			this.fadeTimer = new ig.Timer(0.5);
			ig.game.fadeOut = true;
		}
	}
});

});
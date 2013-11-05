ig.module(
	'game.entities.npc.cutscene'
)
.requires(
	'game.entities.base',
	'game.entities.npc.cutsceneactor'
)
.defines(function(){
	
EntityCutscene = EntityBase.extend({

	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 255, 100, 0.7)',

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,

	visible: false,
	ignorePhysics: true,

	eventTimer: null, 	// countdown to the next cutscene event
	currentEvent: 0,	// index of the current cutscene event (event 0 is triggered immediately)
	events: [],			// array of event times

	// The Weltmeister parameters are a list of event times after the previous event (in seconds), for example:
	// events.1: 2
	// events.2: 5.5
	// events.3: 1
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		ig.game.cutsceneRunning = true;

		// Create the timer (it will be set in triggerEvent)
		this.eventTimer = new ig.Timer();
	},

	// Trigger the first event on the first update
	startUpdate: function() {
		this.triggerEvent();
		ig.game.player.enableInput = false;
		this.parent();
	},

	// Trigger whatever the next event is
	triggerEvent: function() {

		// Trigger the event callback in every actor in the scene
		var actors = ig.game.getEntitiesByType(EntityCutsceneactor);
		for (var i in actors) {
			if (!isNaN(i)) {
				actors[i].eventCallback(this.currentEvent);
			}
		}

		// Increment for the next event
		this.currentEvent += 1;

		// Set the timer for the next event, or stop if we're done
		if (this.currentEvent in this.events) {
			this.eventTimer.set(this.events[this.currentEvent]);
		} else {
			this.endCutscene();
		}
	},

	// Return control back to the game
	endCutscene: function() {
		ig.game.player.enableInput = true;
		ig.game.cutsceneRunning = false;
		this.kill();
	},

	handleTimers: function() {

		// Check if it's time remove the particle
		if (this.eventTimer.delta() > 0) {
			this.triggerEvent();
		}

		this.parent();
	},
	
	
});

});
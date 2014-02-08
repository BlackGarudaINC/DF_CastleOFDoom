ig.module(
	'game.entities.npc.cutsceneactor'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
// Base class for an actor in a cutscene
EntityCutsceneactor = EntityBase.extend({

	_wmIgnore: true,

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,

	actions: [], // Array of actions to execute at each cutscene event time

	flip: true,

	// Call the action that corresponds to this event.
	// For example, in Weltmeister, you could do the following:
	// action.1: walkAway
	// Then, when cutscene event 1 fires, it will call this.walkAway() on this actor.
	eventCallback: function( eventNum ) {
		var method = this.actions[eventNum];
		if (method != undefined && method != "") {
			this[method]();
		}
	},

	// All actors must also extend this function.
	// It is called when the cutscene has already been triggered in the past,
	// so rather than show it again, we just skip it.
	// In many cases, cancel would just be "this.kill();"
	cancel: function() {

	}
	
	
});

});
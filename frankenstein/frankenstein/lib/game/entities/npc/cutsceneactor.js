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

	flip: true,

	// All actors in cutscenes must extend this function.
	// The main cutscene controller tells all actors that the given event has just triggered,
	// so each actor can act accordingly
	eventCallback: function( eventNum ) {

	},

	// All actors must also extend this function.
	// It is called when the cutscene has already been triggered in the past,
	// so rather than show it again, we just skip it.
	// In many cases, cancel would just be "this.kill();"
	cancel: function() {

	}
	
	
});

});
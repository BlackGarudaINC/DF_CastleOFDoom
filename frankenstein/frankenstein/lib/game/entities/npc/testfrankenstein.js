ig.module(
	'game.entities.npc.testfrankenstein'
)
.requires(
	'game.entities.npc.frankensteinactor'
)
.defines(function(){
	
// Test cutscene for Dr. Frankenstein (there will be a new class for each cutscene he is in)
EntityTestfrankenstein = EntityFrankensteinactor.extend({

	_wmIgnore: false,


	eventCallback: function( eventNum ) {

		switch(eventNum) {
		// For case 0 (the initial event), we just want to stay idle, so do nothing
		case 1: // Point and talk
			this.currentAnim = this.anims.talkpoint;
			break;
		case 2: // Walk away from the player
			this.walkAway(!this.flip);
			break;
		case 3: // Jump off the screen
			this.jumpAway();
			break;
		}

		this.parent(eventNum);
	}
	
	
});

});
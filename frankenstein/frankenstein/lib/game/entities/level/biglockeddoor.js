ig.module(
	'game.entities.level.biglockeddoor'
)
.requires(
	'game.entities.level.bigdoor'
)
.defines(function(){
	
EntityBiglockeddoor = EntityBigdoor.extend({

	// animSheet: new ig.AnimationSheet( 'media/sprites/BigDoor01.png', 48, 48 ),

	locked: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// TODO: Add art
	},

	startUpdate: function() {

		// Check if the door was already unlocked
		if (ig.game.oneTimeEvents.unlockedDoors.indexOf(ig.game.currentLevelName) != -1) {
			this.locked = false;
		}
		
		this.parent();
	},


	// Open the door
	open: function() {
		this.parent();

		// Use the key if it's not unlocked yet
		if (this.locked) {
			this.locked = false;
			ig.game.playerState.hasKey = false;
			ig.game.oneTimeEvents.unlockedDoors.push(ig.game.currentLevelName);
		}
	},

	// By default, doors are unlocked, but this can be overridden
	unlocked: function() {
		return (!this.locked || ig.game.playerState.hasKey);
	}
});

});
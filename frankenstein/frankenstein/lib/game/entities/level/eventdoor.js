ig.module(
	'game.entities.level.eventdoor'
)
.requires(
	'game.entities.levelchange'
)
.defines(function(){
	
EntityEventdoor = EntityLevelchange.extend({
	_wmDrawBox: false,
	_wmScalable: false,
	
	size: {x: 16, y: 16},
	offset: {x:8, y: 8},

	animSheet: new ig.AnimationSheet( 'media/sprites/DungeonDoors.png', 32, 32 ),

	active: false,
	delayTimer: null,
	zIndex: -50,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'closed', 1, [0] );
		this.addAnim( 'opening', 0.2, [0, 1, 2, 3], true );
		this.addAnim( 'open', 1, [3] );
		
	},

	handleTimers: function() {

		// Check for delayed openings
		if (this.delayTimer != null && this.delayTimer.delta() > 0) {
			this.delayTimer = null;
			this.open();
		}

		this.parent();
	},

	handleAnimations: function() {

		// Make the door active once it's done opening
		if (this.currentAnim == this.anims.opening && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.open;
			this.active = true;
		}

		this.parent();
	},

	// Open the door
	open: function() {
		this.currentAnim = this.anims.opening.rewind();
	},

	// Open the door after a few seconds
	delayedOpen: function() {
		this.delayTimer = new ig.Timer(3);
	}
});

});
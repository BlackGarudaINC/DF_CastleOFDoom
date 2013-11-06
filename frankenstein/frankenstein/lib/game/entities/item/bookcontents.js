ig.module(
	'game.entities.item.bookcontents'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
// Books are how the player learns new moves
EntityBookcontents = EntityBase.extend({

	_wmIgnore: true,
	zIndex: 150,

	move: "",					// the move that this book teaches
	bookImage: null,			// the image to display when reading the book
	activatePlayerTimer: null,	// there's a minor delay after closing the book before you can move again

	// Specify the name of the move in Weltmeister, based on the playerState variable names in main.js.
	// For example, "move": "groundPound"
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		if (ig.system.running) {
			this.bookImage = new ig.Image( 'media/sprites/' + this.move + '.png' );

			// Stop the player from moving while viewing the contents
			ig.game.player.enableInput = false;
		}
	},

	// Once one of these buttons is pressed, stop reading the book
	myUpdate: function() {
		if ( this.activatePlayerTimer == null && (ig.input.pressed('attack') || ig.input.pressed('shoot') || ig.input.pressed('pause') || ig.input.pressed('escape')) ) {
			this.activatePlayerTimer = new ig.Timer(0.05);
		}

		this.parent();
	},

	handleTimers: function() {

		// Return control to the player after a fraction of a second
		if (this.activatePlayerTimer != null && this.activatePlayerTimer.delta() > 0) {
			this.activatePlayerTimer = null;
			ig.game.player.enableInput = true;
			this.kill();
		}

		this.parent();
	},

	// Draw the contents
	draw: function() {
		this.parent();
		this.bookImage.drawTile( 0, 0, 0, 320, 240 );
	}

});

});
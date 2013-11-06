ig.module(
	'game.entities.item.book'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
// Books are how the player learns new moves
EntityBook = EntityItem.extend({

	size: {x: 14, y: 16},
	offset: {x: 8, y: 16},
	animSheet: new ig.AnimationSheet( 'media/sprites/Notebook01.png', 32, 32 ),

	move: "",
	gravityFactor: 0,

	// Specify the name of the move in Weltmeister, based on the playerState variable names in main.js.
	// For example, "move": "groundPound"
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'open', 0.1, [1] );

		// Check if the move is already learned, and if so, open the book
		if (ig.game.playerState[this.move]) {
			this.openBook();
		}
	},

	// Display the book as open
	openBook: function() {
		this.currentAnim = this.anims.open;
	},

	// Learn the move by showing a book page.
	// We don't destroy the book after learning, we just leave it there open.
	collected: function( other ) {
		if (this.currentAnim != this.anims.open) {
			this.openBook();
			ig.game.playerState[this.move] = true;
		}	
	}
});

});
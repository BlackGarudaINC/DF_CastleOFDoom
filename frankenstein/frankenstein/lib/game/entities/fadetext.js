ig.module(
	'game.entities.fadetext'
)
.requires(
	'game.entities.base'
)
.defines(function(){

// This draws text to the screen and fades out.
// It's used for things like seeing how much money you picked up.	
EntityFadetext = EntityBase.extend({

	_wmIgnore: true,

	text: "",
	currAlpha: 1,
	font: new ig.Font( 'media/sprites/GothicFont_GoldMetal_Size_16.png' ),
	gravityFactor: 0,
	zIndex: 110,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

	},

	// Fade out
	myUpdate: function() {
		this.currAlpha -= 0.01;
		if (this.currAlpha < 0) {
			this.kill();
		}

		this.font.alpha = this.currAlpha;

		this.parent();
	},

	// Draw the actual text
	draw: function() {
		this.font.draw( this.text, this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, ig.Font.ALIGN.CENTER);
	}
});

});
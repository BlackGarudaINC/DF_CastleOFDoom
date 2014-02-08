ig.module(
	'game.entities.npc.actors.frankensteinactor'
)
.requires(
	'game.entities.npc.cutsceneactor'
)
.defines(function(){
	
// Base class for any time Dr. Frankenstein is in a cutscene.
// This includes no event callbacks, just sprite definitions and things like that.
EntityFrankensteinactor = EntityCutsceneactor.extend({

	_wmIgnore: false,

	size: {x: 32, y: 32},

	animSheet: new ig.AnimationSheet( 'media/sprites/DrFrank01.png', 32, 32 ),

	speed: 80,

	sfxDFLaugh: new ig.Sound( 'media/sounds/Enemies/DrFrank02.*' ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.9, [0, 1] );
		this.addAnim( 'walk', 0.15, [0, 2, 0, 3] );
		this.addAnim( 'talkpoint', 0.2, [10, 11] );
	},

	// Look at the player and talk and point
	talkPoint: function() {
		this.currentAnim = this.anims.talkpoint;
		this.flip = (ig.game.player.pos.x > this.pos.x);
	},

	// Turn around and walk away
	walkAway: function() {
		this.flip = !this.flip;
		this.currentAnim = this.anims.walk;
	},

	// Jump off screen, ignoring all walls and stuff
	jumpAway: function() {
		this.vel.y = -300;
		this.ignoreCollisions = true;
		this.sfxDFLaugh.play();
	},

	myUpdate: function() {

		// Check if he's off screen, and if so, kill him
		if (this.pos.y > ig.game.levelHeight) {
			this.kill();
		}

		// If walking, set the velocity
		if (this.currentAnim == this.anims.walk) {
			this.vel.x = (this.flip ? this.speed : -this.speed);
		} else {
			this.vel.x = 0;
		}

		this.currentAnim.flip.x = !this.flip;
	},

	// If a cutscene is skipped, just kill off Dr. Frankenstein from the scene
	cancel: function() {
		this.parent();

		this.kill();
	}
	
	
});

});
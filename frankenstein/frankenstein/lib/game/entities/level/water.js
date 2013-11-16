ig.module(
	'game.entities.level.water'
)
.requires(
	'game.entities.base',
	'game.entities.level.watersplash'
)
.defines(function(){
	
EntityWater = EntityBase.extend({

	_wmScalable: true, // ONLY SCALE IN THE X DIRECTION! LEAVE Y AT 8!

	checkAgainst: ig.Entity.TYPE.A, // Check if the player enters the water
	collides: ig.Entity.COLLIDES.NEVER,

	gravityFactor: 0, // Just floats in place
	ignoreCollisions: true,

	size: {x: 64, y: 8},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/sprites/WaterSurface.png', 8, 8 ),

	sfxSplash: new ig.Sound( 'media/sounds/Environment/WaterSplash.*' ),

	zIndex: -50,

	tileImage: true,	// Repeat the image across the entire width


	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.2, [0, 1, 2] );

	},

	// Check for the player entering or leaving the water
	check: function( other ) {
		if (other instanceof EntityPlayer) {

			// Used to check if we need to make a splash, and if so, which direction gravity is going.
			// By using a variable and putting the splash logic at the end, we can prevent repeat logic.
			var splash = 0;

			if (this.pos.y > ig.game.player.pos.y + 10) {
				
				// We can use the player's underwater property to see if we should make a splash
				if( ig.game.playerState.underWater ) {
					splash = 1;
					ig.game.player.leaveWater();
				}

			} else {
				
				if( !ig.game.playerState.underWater ) {		
					splash = -1;
					ig.game.player.enterWater();
				}
				
			}

			// If we need to make a splash...
			if (splash != 0) {

				// Generate a bunch of random splash particles
				for(var i = 0; i < 20; i++) {

					// Get a random x and y offset each time through the loop.
					// If this were outside the loop, the particles would all be on top of each other.
					var ranX = Math.floor((Math.random() * 10) + 1);
					var ranY = Math.floor((Math.random() * 10) + 1);

					// Generate one particle to either side of the player in the x direction.
					// Also give it an initial offset in the direction of gravity for this splash.
					ig.game.spawnEntity( EntityWatersplash, ig.game.player.pos.x + ig.game.player.size.x + ranX, this.pos.y + ranY*splash, {gravityFactor: splash} );
					ig.game.spawnEntity( EntityWatersplash, ig.game.player.pos.x - ranX, this.pos.y + ranY*splash, {gravityFactor: splash} );
				}

				this.sfxSplash.play();
			}
		}
	},
	
});

});
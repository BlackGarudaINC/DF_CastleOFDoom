ig.module(
	'game.entities.level.water'
)
.requires(
	'game.entities.base'
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
	zIndex: -50,

	tileImage: true,	// Repeat the image across the entire width


	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.2, [0, 1, 2] );

	},



	// Check for the player entering or leaving the water
	check: function( other ) {
		if (other instanceof EntityPlayer) {
			if (this.pos.y > ig.game.player.pos.y + 10) {
				ig.game.player.leaveWater();
			} else {
				ig.game.player.enterWater();
			}
		}
	},
	
});

});
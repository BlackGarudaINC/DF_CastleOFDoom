ig.module(
	'game.entities.level.electrichidewall'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
EntityElectrichidewall = EntityBase.extend({

	_wmScalable: true,

	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,

	// BE SURE TO GIVE THIS A UNIQUE NAME IN WELTMEISTER SO THAT IT CAN BE TARGETED!

	gravityFactor: 0,
	ignoreCollisions: true,

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/sprites/MovingPlatforms.png', 8, 8 ),
	zIndex: -5,

	tileImage: true,

	// This is the tile to use for the platform
	tile: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [this.tile] );
	},

	// Once an electric item that targets this gets energized, make the wall disappear
	electrify: function(first) {
		if (first) {
			this.flashKill();
		} else {
			this.kill();
		}
	}
	
});

});
ig.module(
	'game.entities.level.fallingblock'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
EntityFallingblock = EntityBase.extend({

	_wmScalable: true, // ONLY SCALE IN THE X DIRECTION! LEAVE Y AT 8!

	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.A, 	// check against the player
	collides: ig.Entity.COLLIDES.FIXED,

	gravityFactor: 0,
	ignoreCollisions: true,

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/sprites/TileCrack.png', 8, 8 ),
	myImage: new ig.Image('media/sprites/GameTiles01.png'),
	zIndex: -60,

	shakeCounter: 0,	// How many shakes before it falls
	shakeTimer: null,	// Time between vibrations
	shakeToggle: false,	// Shake to the left or right while shaking
	active: false,
	falling: false,

	tile: -1,			// The index of the tile this is placed on top of in weltmeister

	// This is the wait time once it gets to its destination
	waitTime: 1,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'crack', 0.2, [0, 1, 2, 3], true );


	},

	// Get the tile underneath this, store it as this entity's tile, and delete the tile from the map
	startUpdate: function() {
		var tiles = ig.game.getMapByName('main');
		this.tile = tiles.getTile(this.pos.x, this.pos.y) - 1;
		tiles.setTile(this.pos.x, this.pos.y, 0);

		this.parent();
	},

	myUpdate: function() {



		this.parent();

	},

	handleTimers: function() {
		// Check if it's time to shake or fall
		if (this.shakeTimer != null && this.shakeTimer.delta() > 0) {
			if (this.shakeCounter < 10) {	// shake 14 times total
				this.offset.x += (this.shakeToggle ? 1 : -1);	// shake back and forth 1 pixel, based on shakeToggle
				this.shakeToggle = !this.shakeToggle;
				this.shakeTimer.reset();
				this.shakeCounter += 1;
			} else {	// stop shaking and start falling
				this.falling = true;
				this.gravityFactor = 1;
				this.shakeTimer = null;
				this.ignoreCollisions = false;
				this.collides = ig.Entity.COLLIDES.PASSIVE;
			}
		}

		this.parent();
	},

	// Check if the player steps on this
	check: function( other ) {
		if( !this.active && other instanceof EntityPlayer && other.pos.y + other.size.y - 1 < this.pos.y) {
			this.active = true;
			this.shakeTimer = new ig.Timer(0.05);
			this.currentAnim = this.anims.crack.rewind();
		}
	},

	handleMovementTrace: function( res ){

		// When it hits the floor
		if( this.falling && res.collision.y ){
			this.flashKill();		// Flash out and disappear
			this.falling = false;	// set falling to false to eliminate repeat floor collisions
		}

		this.parent( res );
	},

	draw: function() {

		// Draw the tile underneath the crack
		if (this.tile != -1 && this.visible) {
			this.myImage.drawTile( this.pos.x - ig.game.screen.x - this.offset.x, this.pos.y - ig.game.screen.y, this.tile, 8, 8 );
		}

		this.parent();
	}
	
});

});
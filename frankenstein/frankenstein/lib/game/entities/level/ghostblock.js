ig.module(
	'game.entities.level.ghostblock'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
EntityGhostblock = EntityBase.extend({

	_wmDrawBox: true,
	_wmBoxColor: 'rgba(155, 155, 155, 0.7)',

	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.FIXED,

	gravityFactor: 0,
	ignoreCollisions: true,

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/sprites/GameTiles01.png', 8, 8 ),
	zIndex: -60,

	currAlpha: 1,		// Transparency to draw this at
	increasing: false,	// Whether the alpha value is increasing or decreasing at this time 
	stateTimer: null,	// How long it's in each state

	tile: -1,			// The index of the tile this is placed on top of in weltmeister


	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.stateTimer = new ig.Timer(2);
	},

	// Get the tile underneath this, store it as this entity's tile, and delete the tile from the map
	startUpdate: function() {
		var tiles = ig.game.getMapByName('main');
		this.tile = tiles.getTile(this.pos.x, this.pos.y) - 1;
		tiles.setTile(this.pos.x, this.pos.y, 0);

		this.addAnim('idle', 1, [this.tile], true);
		this.currentAnim = this.anims.idle;

		this.parent();
	},

	myUpdate: function() {

		if (this.stateTimer == null) {
			this.currAlpha += (this.increasing ? 0.01 : -0.01);
			if (this.currAlpha > 1) {
				this.currAlpha = 1;
				this.stateTimer = new ig.Timer(4);
			} else if (this.currAlpha < 0) {
				this.currAlpha = 0;
				this.visible = false;
				this.collides = ig.Entity.COLLIDES.NONE;
				this.stateTimer = new ig.Timer(2);
			}
		}

		this.currentAnim.alpha = this.currAlpha;

		this.parent();

	},

	handleTimers: function() {
		// Check if it's time to shake or fall
		if (this.stateTimer != null && this.stateTimer.delta() > 0) {
			if (!this.visible) {
				this.visible = true;
				this.increasing = true;
				this.collides = ig.Entity.COLLIDES.FIXED;
			} else {
				this.increasing = false;
			}
			this.stateTimer = null;
		}

		this.parent();
	}
	
});

});
ig.module(
	'game.entities.level.chandelier'
)
.requires(
	'game.entities.base',
	'game.entities.enemy.candle'
)
.defines(function(){
	
EntityChandelier = EntityBase.extend({

	checkAgainst: ig.Entity.TYPE.A, // Check if the player bumps into it

	gravityFactor: 0, // initially, there's no gravity, but when it falls there is

	size: {x: 28, y: 24},
	offset: {x: 2, y: 0},
	animSheet: new ig.AnimationSheet( 'media/sprites/Chandelier01.png', 32, 32 ),
	zIndex: -15,

	falling: false,		// If it's actually falling (this is set by it spawning a new instance of itself)

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.3, [0, 0, 0, 0, 1] );
		this.addAnim( 'moving', 0.05, [0, 3, 0, 4] );
		this.addAnim( 'stub', 1, [2] );
		this.addAnim( 'falling', 0.1, [6, 7] );

		// If this was spawned from itself as the falling part
		if (this.falling) {
			this.currentAnim = this.anims.falling;
			this.gravityFactor = 1;
			this.offset.y = 8;
		}
	},


	handleAnimations: function() {
		// Move a few times before falling
		if(this.currentAnim == this.anims.moving && this.currentAnim.loopCount > 2) {
			this.currentAnim = this.anims.stub;

			// Spawn another instance of the chandelier for the actual falling part
			ig.game.spawnEntity( EntityChandelier, this.pos.x, this.pos.y, {falling: true} );
		}

		this.parent();
	},

	// If falling, check for crashing into the floor
	handleMovementTrace: function( res ){

		// When it hits the floor
		if( this.falling && res.collision.y ){
			this.currentAnim.stop = true;
			this.flashKill();
			this.falling = false;

			// Spawn some random candles
			ig.game.spawnEntity( EntityCandle, this.pos.x+14, this.pos.y-5, {} );
			if (Math.random() < 0.66) {
				ig.game.spawnEntity( EntityCandle, this.pos.x, this.pos.y-5, {} );
			}
			if (Math.random() < 0.66) {
				ig.game.spawnEntity( EntityCandle, this.pos.x+28, this.pos.y-5, {} );
			}
		}

		this.parent( res );
	},

	// Check for the player bumping into it
	check: function( other ) {
		if (this.currentAnim == this.anims.idle) {
			this.currentAnim = this.anims.moving.rewind();
		}
	},
	
});

});
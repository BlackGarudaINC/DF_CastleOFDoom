ig.module(
	'game.entities.player.acidfire'
)
.requires(
	'impact.entity',
	'game.entities.player.playerattack'
)
.defines(function(){

EntityAcidfire = EntityPlayerattack.extend({

	size: {x: 8, y: 8},
	offset: {x: 0, y: 0},
	
	count: 0, 			// How many more to spawn in this direction
	direction: 1,		// -1 for left, 1 for right
	spawnTimer: null, 	// Time from when this one spawns until it spawns the next one

	damage: 0.4,
	bounceback: 0.6,
		
	animSheet: new ig.AnimationSheet( 'media/sprites/Acid_ThrowWeapon.png', 8, 8 ),	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// If it's in a wall, kill it
		if ( (ig.game.collisionMap.getTile(this.pos.x, this.pos.y-4) && ig.game.collisionMap.getTile(this.pos.x, this.pos.y)) || ( ig.game.collisionMap.getTile(this.pos.x+7, this.pos.y-4) && ig.game.collisionMap.getTile(this.pos.x+7, this.pos.y) )) {
			this.kill();
		}

		this.count = settings.count;
		this.direction = settings.direction;

		this.friction.x = 100000;

		this.addAnim( 'burn', 0.1, [4, 5, 6, 7, 8, 9 ,10, 11] );
		this.currentAnim = this.anims.burn.rewind();
		
		if (this.count > 0) {
			this.spawnTimer = new ig.Timer(0.15);
		}
	},

	handleTimers: function() {

		if (this.spawnTimer != null && this.spawnTimer.delta() > 0) {
			var newx = this.pos.x + (this.direction*8);
			var newy = this.pos.y;

			// Check if the new spawn location is in a wall
			if (ig.game.collisionMap.getTile(newx, newy)) {

				// Try moving it up a little, in case it's on a slope
				newy = newy - 8;
				if (ig.game.collisionMap.getTile(newx, newy)) {
					newx = this.pos.x;
					newy = this.pos.y;
				}
			}

			ig.game.spawnEntity( EntityAcidfire, newx, newy, {count: this.count - 1, direction: this.direction} );
			this.spawnTimer = null;
		}

		this.parent();
	},

	// Only animate once and then die
	handleAnimations: function() {
		if (this.currentAnim.loopCount > 0) {
			this.kill();
		}
		this.parent();
	},

	// Override the damage dealing so that it doesn't get removed when it hits an enemy
	dealDamage: function( other ) {
		if (!other.dead) {
			other.receiveDamage( this.damage, this, this.bounceback );
		}
	}	

});




});

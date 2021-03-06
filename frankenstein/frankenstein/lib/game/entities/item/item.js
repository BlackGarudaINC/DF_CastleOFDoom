ig.module(
	'game.entities.item.item'
)
.requires(
	'game.entities.base'
)
.defines(function(){
	
EntityItem = EntityBase.extend({
	size: {x: 16, y: 16},
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,

	zIndex: 10,

	dropped: false, 		// true if something drops this item rather than it just being in the level to start
	direction: 0, 			// If dropped, this is the x direction to move (-1 for left, 0 for none, or 1 for right)
	justDroppedTimer: null, // For the first small amount of time after dropping, you can't pick it up
	justDropped: false,		// True right after dropped
	disappearTimer: null,	// Timer until the item flashes out and goes away
	inStore: false,			// If an item is in a store, it has different properties
	chestName: "",			// If this comes from a treasure chest, you can optionally pass its name in

	isWeapon: false,		// Check on whether the item is a weapon.
	goldItem: false,		// Special items from gold chests

	weaponCollected: new ig.Sound('media/sounds/Items/Weapon.*' ),
		
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [0] );

		if (!this.inStore) {
			this.friction.x = 1000.0;

			// Drop the item on the ground
			if (settings.dropped) {
				this.dropped = true;
				this.justDropped = true;
				this.justDroppedTimer = new ig.Timer(1);
				this.disappearTimer = new ig.Timer(8);
				this.vel.y = -200;

				// Give a little x-velocity if thrown
				if (settings.direction) {
					this.vel.x = settings.direction * 250.0;
				}
			}
		} else {
			// Set it up for display in the shop
			this.ignorePhysics = true;
			if (this.size.x <= 8) {
				this.pos.x += 4;
			}
			if (this.size.y <= 8) {
				this.pos.y += 4;
			}
			this.zIndex = 120;
			this.collides = ig.Entity.COLLIDES.NEVER;
		}
	},

	// Destroy this item if it's in the store display, otherwise do nothing.
	storeDestroy: function() {
		if (this.inStore) {
			this.kill();
		}
	},
	
	handleTimers: function() {

		// Make the item obtainable again
		if (this.justDroppedTimer != null && this.justDroppedTimer.delta() > 0) {
			this.justDropped = false;
			this.justDroppedTimer = null;
		}

		// Make the item flash out eventually
		if (this.disappearTimer != null && this.disappearTimer.delta() > 0) {
			this.flashKill();
			this.disappearTimer = null;
		}

		this.parent();
	},
	
	// update: function() {		
	// 	// Do nothing in this update function; don't even call this.parent().
	// 	// The coin just sits there, isn't affected by gravity and doesn't move.

	// 	// We still have to update the animation, though. This is normally done
	// 	// in the .parent() update:
	// 	this.currentAnim.update();
	// },

	// Logic for when the item is collected
	collected: function( other ) {
		if(this.isWeapon){
			this.weaponCollected.play();
		}

		// If this is a special gold item, mark the gold chest for this room as opened as soon as it's collected
		if (this.goldItem) {
			ig.game.treasure.goldOpen.push(this.chestName);
		}

		this.kill();
	},
	
	
	check: function( other ) {
		// The instanceof should always be true, since the player is
		// the only entity with TYPE.A - and we only check against A.
		if( other instanceof EntityPlayer && !this.justDropped && !this.inStore) {
			// this.sfxCollect.play();
			this.collected(other);
		}
	}
});

});
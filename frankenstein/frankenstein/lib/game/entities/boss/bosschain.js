ig.module(
	'game.entities.boss.bosschain'
)
.requires(
	'game.entities.boss.bosspart',
	'impact.entity'
)
.defines(function(){
	
// A part of a boss that chains with a bunch of copies of itself, such as the serpent king's body
EntityBosschain = EntityBosspart.extend({
	
	gravityFactor: 0,

	parentNode: null,	// this node's parent in this chain
	childNode: null,	// this node's child in this chain (null if this node is the tail)
	lowRange: {x:0, y:0}, 	// Offsets from the parent where it's allowed to be
	highRange: {x: 0, y:0},
	speedDamping: 1,	// Each part of the chain can have slightly less speed than the parent.  This is a multiplier.

	xRangeTimer: null,	// Once you're out of range, wait a little before checking again
	yRangeTimer: null,

	behindLeft: false,	// If this part of the chain is lagging behind in a specific direction,
	behindRight: false, //   there's no reason to keep checking to keep showing that it's behind.
	behindAbove: false,
	behindBelow: false,

	// In addition to the boss, the following parameters are required in settings:
	// parentNode: whoever just created this
	// numNodes: how many nodes to create after this
	// nodeEntity: what type of entity we're creating in this chain
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// register this as a child to the parent
		this.parentNode.registerChild(this);

		// Each part should be behind the last
		this.zIndex = this.parentNode.zIndex - 1;

		// Set the speed, taking the damping into account
		this.speed = this.parentNode.speed * this.speedDamping;

		// If there are more nodes to be created in this chain, create them
		if (settings.numNodes > 0) {
			ig.game.spawnEntity( settings.nodeEntity, this.pos.x + 10, this.pos.y, {boss: this.boss, parentNode: this, numNodes: settings.numNodes - 1, nodeEntity: settings.nodeEntity} );
		}
	},

	// After a child is created, it calls back to register itself with its parent
	registerChild: function( node ) {
		this.childNode = node;
	},

	// Set the location and movement configuration for this chain part
	// Required settings:
	// initOffset: Where to start it, relative to the parent
	// lowRange: The minimum x, y offset from the parent
	// highRange: The maximum x, y offset from the parent
	configure: function( settings ) {

		// Position it
		this.pos.x = this.parentNode.pos.x + settings.initOffset.x;
		this.pos.y = this.parentNode.pos.y + settings.initOffset.y;

		// If the parent is the boss itself, there may be some additional offset
		if (this.parentNode == this.boss) {
			this.pos.x += this.boss.chainOrigin.x;
			this.pos.y += this.boss.chainOrigin.y;
		}

		// Set the ranges
		this.lowRange = settings.lowRange;
		this.highRange = settings.highRange;

		// Configure the rest of the chain
		if (this.childNode != null) {
			this.childNode.configure(settings);
		}
	},

	handleTimers: function() {
		if (this.xRangeTimer != null && this.xRangeTimer.delta() > 0) {
			this.xRangeTimer = null;
		}
		if (this.yRangeTimer != null && this.yRangeTimer.delta() > 0) {
			this.yRangeTimer = null;
		}

		this.parent();
	},

	myUpdate: function() {

		// Check if you're out of range, and if so, move at the boss's speed towards the range
		var target = {x: 0, y: 0};
		target.x  = this.parentNode.pos.x;
		target.y  = this.parentNode.pos.y;
		var outOfRange = false;
		if (this.parentNode == this.boss) {
			target.x += this.boss.chainOrigin.x;
			target.y += this.boss.chainOrigin.y;
		}

		// Check if the x pos is out of range
		if (this.xRangeTimer == null) {
			if (target.x + this.lowRange.x > this.pos.x + 0.5) {
				target.x += this.lowRange.x;
				outOfRange = true;
			} else if (target.x + this.highRange.x < this.pos.x - 0.5) {
				target.x += this.highRange.x;
				outOfRange = true;
			}

			// If not in the range, set the velocity to move towards the target
			// If there is no range in one direction and you're close enough to it,
			// just set your position to that range and call it a day
			if (outOfRange) {
				console.log('x');
				if (this.pos.x < target.x) {
					this.vel.x = this.speed;
				} else if (this.pos.x > target.x) {
					this.vel.x = -this.speed;
				}

				this.xRangeTimer = new ig.Timer(0.2);
				outOfRange = false;
			}
		}

		// Now check the y pos
		if (this.yRangeTimer == null) {

			if (target.y + this.lowRange.y > this.pos.y + 0.5) {
				target.y += this.lowRange.y;
				outOfRange = true;
			} else if (target.y + this.highRange.y < this.pos.y - 0.5) {
				target.y += this.highRange.y;
				outOfRange = true;
			}
			
			if (outOfRange) {
				console.log('y');
				if (this.highRange.y == this.lowRange.y && this.pos.y > target.y - 4 && this.pos.y < target.y + 4) {
					this.vel.y = 0;
					this.pos.y = target.y
				} else if (this.pos.y < target.y) {
					this.vel.y = this.speed;
				} else if (this.pos.y > target.y) {
					this.vel.y = -this.speed;
				}

				this.yRangeTimer = new ig.Timer(0.1);
			}
		}

		this.parent();
	},

	// If the boss isn't dead yet, we need to link the chain to account for the missing part
	kill: function() {
		if (!this.boss.dead) {
			this.parentNode.childNode = this.childNode;
			if (this.childNode != null) {
				this.childNode.parentNode = this.parentNode;
			}
		}

		this.parent();
	},
	
	
});

});
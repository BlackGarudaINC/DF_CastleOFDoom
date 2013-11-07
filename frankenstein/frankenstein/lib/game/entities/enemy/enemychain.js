ig.module(
	'game.entities.enemy.enemychain'
)
.requires(
	'game.entities.enemy.enemypart',
	'impact.entity'
)
.defines(function(){
	
// A part of an enemy that chains with a bunch of copies of itself, such as the serpent king's body
EntityEnemychain = EntityEnemypart.extend({
	
	gravityFactor: 0,

	parentNode: null,	// this node's parent in this chain
	childNode: null,	// this node's child in this chain (null if this node is the tail)
	lowRange: {x:0, y:0}, 	// Offsets from the parent where it's allowed to be
	highRange: {x: 0, y:0},
	speedDamping: 1,	// Each part of the chain can have slightly less speed than the parent.  This is a multiplier.
	speed: {x: 0, y:0}, // the speed to move in each direction

	behindLeft: false,	// If this part of the chain is lagging behind in a specific direction,
	behindRight: false, //   there's no reason to keep checking to keep showing that it's behind.
	behindAbove: false,
	behindBelow: false,

	// In addition to the master, the following parameters are required in settings:
	// parentNode: whoever just created this
	// numNodes: how many nodes to create after this
	// nodeEntity: what type of entity we're creating in this chain
	// initOffset: Where to start it, relative to the parent
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// register this as a child to the parent
		this.parentNode.registerChild(this);

		// Each part should be behind the last
		this.zIndex = this.parentNode.zIndex - 1;

		// Position it
		this.pos.x = this.parentNode.pos.x + settings.initOffset.x;
		this.pos.y = this.parentNode.pos.y + settings.initOffset.y;

		// If the parent is the master itself, there may be some additional offset
		if (this.parentNode == this.master) {
			this.pos.x += this.master.chainOrigin.x;
			this.pos.y += this.master.chainOrigin.y;
		}

		// If there are more nodes to be created in this chain, create them
		if (settings.numNodes > 0) {
			ig.game.spawnEntity( settings.nodeEntity, this.pos.x + 10, this.pos.y, {master: this.master, parentNode: this, numNodes: settings.numNodes - 1, nodeEntity: settings.nodeEntity, initOffset: settings.initOffset} );
		}
	},

	// After a child is created, it calls back to register itself with its parent
	registerChild: function( node ) {
		this.childNode = node;
	},

	// Set the movement configuration for this chain part
	// Required settings:
	// lowRange: The minimum x, y offset from the parent
	// highRange: The maximum x, y offset from the parent
	// speed: The x and y speed
	configure: function( settings ) {

		// Set the ranges
		this.lowRange = settings.lowRange;
		this.highRange = settings.highRange;

		// Set the speed and apply the damping
		this.speed.x = settings.speed.x * this.speedDamping;
		this.speed.y = settings.speed.y * this.speedDamping;

		// Configure the rest of the chain
		if (this.childNode != null) {
			this.childNode.configure(settings);
		}
	},


	myUpdate: function() {

		// Check if you're out of range, and if so, move at the master's speed towards the range
		var target = {x: 0, y: 0};
		target.x  = this.parentNode.pos.x;
		target.y  = this.parentNode.pos.y;
		if (this.parentNode == this.master) {
			target.x += this.master.chainOrigin.x;
			target.y += this.master.chainOrigin.y;
		}

		// Check if the x pos is out of range
		// First, we check if there is supposed to be any movement in the X-direction.
		// If there is no x-range, we check if the velocity is 0 in the x-direction.
		// If it's not, then something knocked it out of place so it's trying to move back into place.
		// Once it gets close to the position it's supposed to be in, we put it in that position and turn off
		// the x velocity.
		if (this.highRange.x == this.lowRange.x && this.vel.x != 0 && this.pos.x > target.x + this.highRange.x - 4 && this.pos.x < target.x + this.highRange.x + 4) {
			this.vel.x = 0;
			this.pos.x = target.x + this.highRange.x;
			this.behindLeft = false;
			this.behindRight = false;
		}
		// If, as far as we know, the object isn't out of range to the left of where it should be,
		// we check to see if it is now behind and to the left.
		// However, if we already know it's behind to the left, we don't bother checking again since
		// all of the proper variables are already set here.
		if (!this.behindLeft) {
			if (target.x + this.lowRange.x > this.pos.x + 0.5) {
				this.vel.x = this.speed.x;
				this.behindLeft = true;
				this.behindRight = false;
			}
		} 
		// Now we do the same check but to the right.
		if (!this.behindRight) {
			if (target.x + this.highRange.x < this.pos.x - 0.5) {
				this.vel.x = -this.speed.x;
				this.behindRight = true;
				this.behindLeft = false;
			}
		}


		// Now check the y pos in the same way we checked X.
		if (this.highRange.y == this.lowRange.y && this.vel.y != 0 && this.pos.y > target.y + this.highRange.y - 4 && this.pos.y < target.y + this.highRange.y + 4) {
			this.vel.y = 0;
			this.pos.y = target.y + this.highRange.y;
			this.behindAbove = false;
			this.behindBelow = false;
		} 
		if (!this.behindAbove) {
			if (target.y + this.lowRange.y > this.pos.y + 0.5) {
				this.vel.y = this.speed.y;
				this.behindAbove = true;
				this.behindBelow = false;
			} 
		}
		if (!this.behindBelow) {
			if (target.y + this.highRange.y < this.pos.y - 0.5) {
				this.vel.y = -this.speed.y;
				this.behindBelow = true;
				this.behindAbove = false;
			}
		}
			


		this.parent();
	},

	// If the master isn't dead yet, we need to link the chain to account for the missing part
	kill: function() {
		if (!this.master.dead) {
			this.parentNode.childNode = this.childNode;
			if (this.childNode != null) {
				this.childNode.parentNode = this.parentNode;
			}
		}

		this.parent();
	},
	
	
});

});
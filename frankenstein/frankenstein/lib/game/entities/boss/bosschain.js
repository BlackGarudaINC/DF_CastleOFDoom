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
	configure: function( settings ) {

		// Position it
		this.pos.x = this.parentNode.pos.x + settings.initOffset.x;
		this.pos.y = this.parentNode.pos.y + settings.initOffset.y;

		// If the parent is the boss itself, there may be some additional offset
		if (this.parentNode == this.boss) {
			this.pos.x += this.boss.chainOrigin.x;
			this.pos.y += this.boss.chainOrigin.y;
		}

		// Configure the rest of the chain
		if (this.childNode != null) {
			this.childNode.configure(settings);
		}
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
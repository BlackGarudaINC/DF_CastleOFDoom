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

		// If there are more nodes to be created in this chain, create them
		if (settings.numNodes > 0) {
			ig.game.spawnEntity( settings.nodeEntity, this.pos.x + 10, this.pos.y, {boss: this.boss, parentNode: this, numNodes: settings.numNodes - 1, nodeEntity: settings.nodeEntity} );
		}
	},

	// After a child is created, it calls back to register itself with its parent
	registerChild: function( node ) {
		this.childNode = node;
	}
	
	
});

});
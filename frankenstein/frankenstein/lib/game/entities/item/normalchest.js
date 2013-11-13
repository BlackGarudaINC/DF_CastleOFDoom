ig.module(
	'game.entities.item.normalchest'
)
.requires(
	'game.entities.item.treasure',
	'game.entities.item.stoneitem',
	'game.entities.item.potionitem'
)
.defines(function(){
	
// Normal chests have standard items, defined in weltmeister.
EntityNormalchest = EntityTreasure.extend({

	_wmIgnore: false,

	item: "",
	name: "",

	// Specify "item" in Weltmeister.  For example, "heartcontaineritem" would be "item": "Heartcontainer" in Weltmeister 
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [0] );
		this.addAnim( 'open', 0.1, [1] );
		this.currentAnim = this.anims.idle;

	},

	startUpdate: function() {
		// Get the proper entity name for this item
		this.item = 'Entity' + this.item + 'item';

		// // Figure out the name
		// this.name = ig.game.currentLevelName + this.item;

		// // Check if this chest was already opened
		// if (ig.game.treasure.goldOpen.indexOf(this.name) != -1) {
		// 	this.opened = true;
		// 	this.currentAnim = this.anims.open;
		// }
	},

	// Spawn the item set in weltmeister
	spawnItem: function() {
		ig.game.spawnEntity( this.item, this.pos.x + 10, this.pos.y, {dropped: true, direction: 0, chestName: this.name} );
	},

	open: function() {
		this.currentAnim = this.anims.open;
		this.parent();
	}
});

});
ig.module(
	'game.entities.item.treasure'
)
.requires(
	'game.entities.item.item'
)
.defines(function(){
	
// Generic treasure base class (not to be used on its own)
EntityTreasure = EntityItem.extend({

	_wmIgnore: true,

	type: ig.Entity.TYPE.B, // we open the chests by attacking it, so it goes in the enemy type

	animSheet: new ig.AnimationSheet( 'media/sprites/Chests.png', 16, 16 ),

	opened: false, // Whether or not the chest has been opened
	zIndex: -40,

	// Do nothing since you can't collect the treasure chest itself
	collected: function( other ) {},

	// Spawn the item that the treasure chest drops
	spawnItem: function() {
		// Empty by default, each type defines what they drop
	},

	// Open the treasure chest
	open: function() {
		this.opened = true;
		this.spawnItem();
	},

	// When receiving damage from the player, we open the chest
	receiveDamage: function() {
		if (!this.opened) {
			this.open();
		}
	}
});

});
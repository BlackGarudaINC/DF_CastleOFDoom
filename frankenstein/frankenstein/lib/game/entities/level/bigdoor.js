ig.module(
	'game.entities.level.bigdoor'
)
.requires(
	'game.entities.base',
	'game.entities.player.meleeattack'
)
.defines(function(){
	
EntityBigdoor = EntityBase.extend({

	type: ig.Entity.TYPE.B, // we open the door by attacking it, so it goes in the enemy type

	gravityFactor: 0,

	size: {x: 16, y: 48},
	animSheet: new ig.AnimationSheet( 'media/sprites/BigDoor01.png', 48, 48 ),
	zIndex: -200,
	flip: false,

	opened: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'closed', 1, [0] );
		this.addAnim( 'opening', 0.15, [0, 1, 2, 3, 4], true );
		this.addAnim( 'closing', 0.15, [4, 3, 2, 1, 0], true );

		// If it's not on the left side of the room, flip it over
		if (this.pos.x > 200) {
			this.flip = true;
			this.offset.x = 32;
			this.currentAnim.flip.x = this.flip;
		}
	},

	startUpdate: function() {
		this.toggleCollisionMap();
		this.parent();
	},


	handleAnimations: function() {
		// Wait until the animation ends before opening the door
		if(!this.opened && this.currentAnim == this.anims.opening && this.currentAnim.loopCount > 0) {
			this.open();
		}

		this.parent();
	},

	// Open the door
	open: function() {
		this.opened = true;
		this.toggleCollisionMap();
	},

	// Turn on/off the collision tiles underneath the door
	toggleCollisionMap: function() {
		var newVal 	= (this.opened ? 0 : 1);

		for (var y=0; y<48; y+=8) {
			ig.game.collisionMap.setTile(this.pos.x, this.pos.y + y, newVal);
			ig.game.collisionMap.setTile(this.pos.x+8, this.pos.y + y, newVal);
		}
	},

	// By default, doors are unlocked, but this can be overridden
	unlocked: function() {
		return true;
	},

	// When receiving damage from the player, we open the door
	receiveDamage: function( amount, from ) {
		if (!this.opened && this.currentAnim == this.anims.closed && from instanceof EntityMeleeattack && this.unlocked()) {
			this.currentAnim = this.anims.opening.rewind();
			this.currentAnim.flip.x = this.flip;
		}
	}
});

});
ig.module(
	'game.entities.level.destructiblewall'
)
.requires(
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntityDestructiblewall = EntityEnemy.extend({

	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.FIXED,

	size: {x: 16, y: 16},
	animSheet: new ig.AnimationSheet( 'media/sprites/DestructableWalls.png', 16, 16 ),
	faceRight: true,	// Default to right facing walls
	wallType: 0, // 0, 1, or 2, depending on type

	gravityFactor: 0,
	health: 4,
	dealsDamage: false,
	dropsItems: false,
	instantDeath: true,
	ignorePhysics: true,
	drawHealthBar: false,

	opened: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		var firstTile = this.wallType * 8;
		if (this.faceRight) {
			this.addAnim( 'idle', 1, [firstTile, firstTile+1, firstTile+2, firstTile+3] );
		} else {
			this.addAnim( 'idle', 1, [firstTile+7, firstTile+6, firstTile+5, firstTile+4] );
		}

	},

	// Keep the animation on the proper frame
	myUpdate: function() {
		this.currentAnim.gotoFrame(Math.ceil(this.startHealth - this.health));
		this.parent();
	}
});

});
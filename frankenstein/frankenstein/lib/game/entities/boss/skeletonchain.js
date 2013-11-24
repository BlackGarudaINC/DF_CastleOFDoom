ig.module(
	'game.entities.boss.skeletonchain'
)
.requires(
	'game.entities.enemy.enemychain',
	'impact.entity'
)
.defines(function(){
	

EntitySkeletonchain = EntityEnemychain.extend({

	size: {x: 10, y: 10},
	offset: {x: 11, y: 11},

	animSheet: new ig.AnimationSheet( 'media/sprites/SkeletonGeneral.png', 32, 32 ),

	damageMaster: false,	// Hitting the chain doesn't hurt the general
	invincible: true,		// The chains feel no pain
	killWhenDead: true,
	rotates: false,

	// gravityFactor: 1,

	maceBall: false,		// The end of the chain is a mace ball

	debugDraw: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Check if it's part of the chain or the mace ball at the end
		if (settings.numNodes == 0) {
			this.addAnim( 'idle', 1, [8] );
			this.maceBall = true;
			this.size.x = 24;
			this.size.y = 24;
			this.offset.x = 4;
			this.offset.y = 4;
		} else {
			this.addAnim( 'idle', 1, [9] );
		}

		this.zIndex += 2;
	},

	// The actual logic for how the ball and chain works
	// followLogic: function() {
	// 	var target = {x: 0, y: 0};
	// 	target.x  = this.parentNode.pos.x;
	// 	target.y  = this.parentNode.pos.y;
	// 	if (this.parentNode == this.master) {
	// 		target.x += this.master.chainOrigin.x;
	// 		target.y += this.master.chainOrigin.y;
	// 	}

		
	// }
	
	
});

});
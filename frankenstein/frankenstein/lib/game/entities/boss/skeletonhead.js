ig.module(
	'game.entities.boss.skeletonhead'
)
.requires(
	'game.entities.enemy.enemypart',
	'impact.entity'
)
.defines(function(){
	

EntitySkeletonhead = EntityEnemypart.extend({

	size: {x: 20, y: 24},
	offset: {x: 6, y: 4},

	animSheet: new ig.AnimationSheet( 'media/sprites/SkeletonGeneral.png', 32, 32 ),

	damageMaster: true,
	damageMultiplier: 1.5,
	invincible: true,
	killWhenDead: true,
	gravityFactor: 0,

	// debugDraw: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'pain', 0.5, [2] );
		this.addAnim( 'laugh', 0.1, [0, 1, 2, 1] );

		this.zIndex = this.master.zIndex + 1;

		// Let the body know that this is the head
		this.master.registerHead(this);
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleAnimations: function() {

		// After laughing a few times, stop
		if (this.currentAnim == this.anims.laugh && this.currentAnim.loopCount > 4) {
			this.currentAnim = this.anims.idle;
		}

		this.parent();
	},

	laugh: function() {
		this.currentAnim = this.anims.laugh.rewind();
	},

	myUpdate: function () {
		this.pos.x = this.master.pos.x + (this.master.flip ? 14 : -4);
		this.pos.y = this.master.pos.y - 12;

		this.currentAnim.flip.x = this.master.flip;

		this.parent();
	}
	
	
});

});
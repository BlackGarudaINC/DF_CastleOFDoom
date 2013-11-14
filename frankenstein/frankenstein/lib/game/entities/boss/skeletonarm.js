ig.module(
	'game.entities.boss.skeletonarm'
)
.requires(
	'game.entities.enemy.enemypart',
	'impact.entity'
)
.defines(function(){
	

EntitySkeletonarm = EntityEnemypart.extend({

	size: {x: 16, y: 44},
	offset: {x: 2, y: 4},

	animSheet: new ig.AnimationSheet( 'media/sprites/SkeletonGeneral.png', 32, 64 ),

	damageMaster: true,
	damageMultiplier: 1,
	invincible: true,
	killWhenDead: true,
	gravityFactor: 0,

	// debugDraw: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [3] );
		this.addAnim( 'attack', 0.1, [3, 4, 5] );

		this.zIndex = this.master.zIndex - 1;

		// Let the body know that this is the arm
		this.master.registerArm(this);
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleAnimations: function() {

		// After laughing a few times, stop
		if (this.currentAnim == this.anims.attack && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.idle;
		}

		this.parent();
	},

	// Play the attack animation
	attack: function() {
		this.currentAnim = this.anims.attack.rewind();
	},

	myUpdate: function () {
		this.pos.x = this.master.pos.x + (this.master.flip ? 38 : -24);
		this.pos.y = this.master.pos.y - 22;

		this.currentAnim.flip.x = this.master.flip;
		this.offset.x = (this.master.flip ? 14 : 2);

		this.parent();
	}
	
	
});

});
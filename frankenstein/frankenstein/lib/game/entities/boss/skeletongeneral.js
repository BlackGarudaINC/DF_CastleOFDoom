ig.module(
	'game.entities.boss.skeletongeneral'
)
.requires(
	'impact.entity',
	'game.entities.boss.boss'
)
.defines(function(){
	
EntitySkeletongeneral = EntityBoss.extend({
	size: {x: 28, y: 32},
	offset: {x: 18, y: 32},
	maxVel: {x: 200, y: 600},
	friction: {x: 150, y: 0},

	edgeReverse: false,
	killWhenDead: false, // Use death animation instead of killing right away
	knockback: true,    // If they bounce back from damage
	knockbackForce: 100, // How much force pushes them back
	speed: 200,
	damageFlash: true,

	attackTimer: null, 	 // countdown to when it attacks
	
	animSheet: new ig.AnimationSheet( 'media/sprites/SkeletonGeneral.png', 64, 64 ),
	myImage: new ig.Image( 'media/sprites/SkeletonGeneral.png' ),
	flashImage: new ig.Image( 'media/sprites/SkeletonGeneral.png#ffffff' ),
	
	health: 3,
	// debugDraw: true,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// The main general is just the legs for the core animation, everything else is extra
		this.addAnim( 'idle', 0.2, [4] );
		this.addAnim( 'walk', 0.2, [4, 5, 4, 6] );

	},

	startBattle: function() {
		this.parent();

		this.attackTimer = new ig.Timer(4);
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleTimers: function() {

		// // Check if it's time to attack again
		// if (this.attackTimer != null && this.attackTimer.delta() > 0) {

		// 	// Get ready to attack
		// 	if (this.currentAnim == this.anims.idle) {
		// 		this.currentAnim = this.anims.prepare.rewind();
		// 		this.attackTimer = null;
		// 		this.showsPain = false;
		// 	} 
			
		// }

		this.parent();
	},

	handleAnimations: function() {

		// // Check if done preparing to attack
		// if (this.currentAnim == this.anims.prepare && this.currentAnim.loopCount > 0) {
		// 	this.currentAnim = this.anims.attack;
		// }

		this.parent();
	},

	// Depending on the battle phase, attacks end when you hit the wall
	flipOver: function(direction) {
		
		this.parent(direction);
	},
	
	
	myUpdate: function() {

		

		this.parent();
		
	}
});

});
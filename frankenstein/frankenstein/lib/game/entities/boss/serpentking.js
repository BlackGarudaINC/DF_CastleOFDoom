ig.module(
	'game.entities.boss.serpentking'
)
.requires(
	'impact.entity',
	'game.entities.boss.boss',
	'game.entities.boss.serpentbody'
)
.defines(function(){
	
EntitySerpentking = EntityBoss.extend({
	size: {x: 52, y: 38},
	offset: {x: 12, y: 0},
	maxVel: {x: 200, y: 600},
	friction: {x: 150, y: 0},

	edgeReverse: false,
	killWhenDead: true, 
	knockback: false,    // If they bounce back from damage
	speed: 200,
	damageFlash: true,
	gravityFactor: 0,

	attackTimer: null, 	 // countdown to when it attacks
	
	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 64, 32 ),
	myImage: new ig.Image( 'media/sprites/SerpentKing.png' ),
	
	health: 20,
	// debugDraw: true,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// There's not really any animations, just overflow drawing
		this.addAnim( 'idle', 1, [0] );

		if (ig.system.running) {
			// Spawn the body parts
			ig.game.spawnEntity( EntitySerpentbody, this.pos.x - 40, this.pos.y, {boss: this} );
		}

	},

	startBattle: function() {
		this.parent();


		// this.attackTimer = new ig.Timer(4);
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleTimers: function() {

		// Check if it's time to attack again
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

		// Check if done preparing to attack
		// if (this.currentAnim == this.anims.prepare && this.currentAnim.loopCount > 0) {
		// 	this.currentAnim = this.anims.attack;
		// }

		this.parent();
	},

	
	draw: function() {

		// Draw the other half of the mouth
		if (this.visible) {
			this.myImage.drawTile( this.pos.x - this.offset.x, this.pos.y + 20, 2, 64, 32 );
		}

		this.parent();
	},
	
	
	myUpdate: function() {

		// // If idle, always look at the player
		// if (this.currentAnim == this.anims.idle || this.currentAnim == this.anims.prepare) {
		// 	this.flip = (ig.game.player.pos.x > this.pos.x);
		// }

		// // If attacking, move 
		// if (this.currentAnim == this.anims.attack) {
		// 	this.vel.x = (this.flip ? this.speed : -this.speed)

		// 	// During certain phases of battle, jump while moving
		// 	if (this.standing && (this.phase == 1 || this.phase == 3)) {
		// 		this.vel.y = -350;
		// 	}
		// }

		// this.currentAnim.flip.x = !this.flip;

		this.parent();
		
	}
});

});
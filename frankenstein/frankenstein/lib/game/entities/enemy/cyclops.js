ig.module(
	'game.entities.enemy.cyclops'
)
.requires(
	'game.entities.enemy.cyclopslaser',
	'game.entities.enemy.enemy'
)
.defines(function(){

EntityCyclops = EntityEnemy.extend({

	size: {x: 34, y: 34},
	offset: {x: 4, y: 14},

	health: 12,
	damage: 2,
	speed: 25,
	goldDropValue: 20,
	damageFlash: true,
	knockback: false,
	killWhenDead: false,

	edgeReverse: false,

	idleTimer: null,	// How long to remain idle before chasing again
	attackTimer: null,	// Timer for laser shooting


	animSheet: new ig.AnimationSheet( 'media/sprites/Cyclops.png', 48, 48 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'walk', 0.1, [0,2,0,3] );
		this.addAnim( 'idle', 0.1, [0,1] );
		this.addAnim( 'pain', 0.1, [6] );
		this.addAnim( 'roar', 0.1, [0,4,5,5,4] );
		this.addAnim( 'death', 0.1, [0,8,9,10,11,12], true );
		this.addAnim( 'attack', 0.1, [0,7,7,7,7,7,7,7], true);

		this.attackTimer = new ig.Timer(Math.random()*5 + 2);
		
	},

	// We're cheating a little here, this gets called from wall and level end collisions,
	// so instead of flipping we're just making him become idle
	flipOver: function() {
		this.becomeIdle();
	},

	// Go from moving to being idle by roaring first 
	becomeIdle: function() {
		if (this.currentAnim == this.anims.walk) {
			this.currentAnim = this.anims.roar.rewind();
			this.idleTimer = new ig.Timer(2);
			this.attackTimer = null;
		}
	},

	handleTimers: function() {
		this.parent();

		// Start walking again after being idle for a little
		if (this.idleTimer != null && this.idleTimer.delta() > 0 && this.currentAnim == this.anims.idle) {
			this.currentAnim = this.anims.walk;
			this.idleTimer = null;
			this.attackTimer = new ig.Timer(Math.random()*5 + 2);
		}

		// Shoot lasers
		if (this.attackTimer != null && this.attackTimer.delta() > 0 && this.currentAnim == this.anims.walk) {
			this.currentAnim = this.anims.attack.rewind();
			ig.game.spawnEntity( EntityCyclopslaser, this.pos.x + 16, this.pos.y-5, {flip: this.flip} );
			this.attackTimer = new ig.Timer(Math.random()*5 + 2);
		}
	},

	handleAnimations: function() {
		this.parent();

		// After roaring, go right back to idle
		if (this.currentAnim == this.anims.roar && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.idle;
		}

		// After shooting, go back to walking
		if (this.currentAnim == this.anims.attack && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.walk;
		}
	},

	myUpdate: function() {
		this.parent();

		// Always look at the player
		this.flip = (this.pos.x > ig.game.player.pos.x);

		// If walking, move
		if (this.currentAnim == this.anims.walk) {
			this.vel.x = (this.flip ? -this.speed : this.speed);

			// Check if you're stuck in one place close to the player's x position
			if (this.pos.x > ig.game.player.pos.x - 4 && this.pos.x < ig.game.player.pos.x + 4) {
				this.becomeIdle();
			}

		} else {
			this.vel.x = 0;
		}


		this.currentAnim.flip.x = this.flip;
		
		this.parent();
	}

})
})
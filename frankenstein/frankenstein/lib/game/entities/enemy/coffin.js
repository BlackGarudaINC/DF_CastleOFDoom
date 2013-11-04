ig.module(
	'game.entities.enemy.coffin'
)
.requires(
	'impact.entity',
	'game.entities.enemy.skeleton',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntityCoffin = EntityEnemy.extend({
	size: {x: 20, y: 24},
	offset: {x: 6, y: 8},
	

	shakeTimer: null,  // the coffin shakes back and forth before opening
	knockback: false,  // don't bounce back when hit
	damageFlash: true, // flash when hit
	dropsItems: false, // Don't drop any items when dead

	awake: false, // true once the player gets close enough that it starts to wake up
	shakeCounter: 0, // counts how many times it shakes so that it knows when to eventually open
	
	animSheet: new ig.AnimationSheet( 'media/sprites/skeleton01.png', 32, 32 ),
	
	health: 8,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [13] );
		this.addAnim( 'open', 0.15, [13, 14, 15], true);
		
	},

	handleTimers: function() {
		
		// Check if it's time to attack again
		if (this.awake && this.shakeTimer.delta() > 0 && this.currentAnim != this.anims.open) {
			if (this.shakeCounter < 20) {
				this.vel.y = -40;
				this.shakeTimer.set(0.1);
				this.shakeCounter += 1;
			} else {
				this.currentAnim = this.anims.open.rewind();
			}
		}

		this.parent();
	},

	spawnSkeleton: function(){
		ig.game.spawnEntity( EntitySkeleton, this.pos.x, this.pos.y );
	},

	handleAnimations: function() {
		
		// Check if done opening
		if (this.currentAnim == this.anims.open && this.currentAnim.loopCount > 0) {
			this.spawnSkeleton();
			this.kill();
		}

		this.parent();
	},

	myUpdate: function() {

		// If not awake yet, check if close enough to start waking up
		if (!this.awake && this.distanceTo(ig.game.player) < 100) {
			this.awake = true;
			this.shakeTimer = new ig.Timer(0.1);
		}

		this.parent();
	},
	
	createParticles: function(){

		// Generate a bunch of bones as particles
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-5, {image: 5} );
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-5, {image: 4} );
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-5, {image: 5} );
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-5, {image: 4} );
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-5, {image: 5} );

	},
	
	kill: function() {
		
		this.createParticles();
		this.parent();
		
	}
});

});
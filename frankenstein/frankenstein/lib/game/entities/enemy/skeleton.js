ig.module(
	'game.entities.enemy.skeleton'
)
.requires(
	'impact.entity',
	'game.entities.enemy.bone',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntitySkeleton = EntityEnemy.extend({
	size: {x: 20, y: 24},
	offset: {x: 6, y: 8},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},

	attackTimer: null, // countdown to when it attacks

	
	animSheet: new ig.AnimationSheet( 'media/sprites/skeleton01.png', 32, 32 ),
	
	health: 5,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'walk', 0.17, [0,2,0,3] );
		this.addAnim( 'pain', 0.3, [7]);
		this.addAnim( 'attack', 0.17, [4, 5, 4, 6]);

		// It attacks every 5-10 seconds
		this.attackTimer = new ig.Timer(Math.floor((Math.random()*5)+5));
	},

	handleTimers: function() {

		// Check if it's time to attack again
		if (this.attackTimer.delta() > 0 && this.currentAnim != this.anims.attack && this.currentAnim != this.anims.death) {
			this.currentAnim = this.anims.attack.rewind();
			this.attackTimer.set(Math.floor((Math.random()*5)+5));
		}

		this.parent();
	},

	handleAnimations: function() {

		// Check if done attacking
		if (this.currentAnim == this.anims.attack && this.currentAnim.loopCount > 1) {
			this.currentAnim = this.anims.walk.rewind();
		}

		this.parent();
	},
	
	
	myUpdate: function() {
		
		if (!this.tempInvincible && !this.dead) {
			var xdir = this.flip ? 1 : -1;
			this.vel.x = this.speed * xdir;
		}

		this.currentAnim.flip.x = !this.flip;
		
		this.parent();
	},
	
	createParticles: function(){
		
		// Generate a bunch of bones as particles
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-15, {image: 1} );
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-5, {image: 2} );
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-5, {image: 3} );
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-5, {image: 3} );
		ig.game.spawnEntity( EntityBone, this.pos.x, this.pos.y-5, {image: 2} );

	},

	kill: function() {
		
		this.createParticles();
		this.parent();
		
	}
});

});
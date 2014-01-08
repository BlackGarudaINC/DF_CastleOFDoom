ig.module(
	'game.entities.enemy.deathmask'
)
.requires(
	'game.entities.enemy.enemy',
	'game.entities.enemy.deathmaskparticle'
)
.defines(function(){

EntityDeathmask = EntityEnemy.extend({

	size: {x: 24, y: 32},
	offset: {x: 3, y: 0},

	collides: ig.Entity.COLLIDES.NEVER,

	health: 4,
	damageFlash: true, // flash when damaged
	knockback: false,
	killWhenDead: false, // use death animation
	wallReverse: false, // Don't reverse when you hit a wall
	levelReverse: false,
	edgeReverse: false,	
	currAlpha: 1, 		// Current transparency value
	ignoreCollisions: true,
	gravityFactor: 0,	// Float (don't use gravity)

	origin: {x: 0, y: 0},
	currAngle: 0, 			// it rotates around its origin
	rotationSpeed: 0.6,		// Radians per second of rotation
	radius: 50,				// How big the movement circle is
	radiusVariation: 20,	// How much the radius changes
	radiusAngle: 0,			// A separate angle is used for the radius variation
	radiusSpeed: 1,			// How many radians per second the radius change moves

	fake: false,		// One is real and the rest are fake
	master: null,		// For the fakes, they need to know who the parent is
	fadeSpeed: 0.5,		// How fast a fake fades back in after being hit

	animSheet: new ig.AnimationSheet( 'media/sprites/DeathMask.png', 32, 32 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'walk', 0.2, [0, 1] );
		this.addAnim( 'idle', 0.2, [0] );
		this.addAnim( 'attack', 0.2, [1] );
		this.addAnim( 'pain', 0.2, [2] );
		this.addAnim( 'death', 0.1, [3,3,3,3], true);
		// frames 4,5,6,7 apply to the death animation but must be done as particles.

		this.origin.x = this.pos.x;
		this.origin.y = this.pos.y;
	},

	startUpdate: function() {
		this.parent();

		// Generate copies of itself
		if (!this.fake) {
			ig.game.spawnEntity( EntityDeathmask, this.pos.x, this.pos.y, {currAngle: ig.game.HALFPI, fake: true, master: this} );
			ig.game.spawnEntity( EntityDeathmask, this.pos.x, this.pos.y, {currAngle: Math.PI, fake: true, master: this} );
			ig.game.spawnEntity( EntityDeathmask, this.pos.x, this.pos.y, {currAngle: ig.game.HALFPI+Math.PI, fake: true, master: this} );
		} else {
			// The copies need to register themselves to the parent
			this.master.registerPart(this);
			this.invincible = true;
			this.dropsItems = false;
		}
	},

	myUpdate: function() {
		
		if (!this.dead) {
			// The radius slowly changes as it moves in and out
			var currRadius = this.radius + this.radiusVariation * Math.sin(this.radiusAngle);

			// Move in a circle
			this.pos.x = this.origin.x + currRadius * Math.cos(this.currAngle);
			this.pos.y = this.origin.y + currRadius * Math.sin(this.currAngle);
			this.currAngle += ig.system.tick * this.rotationSpeed;
			this.radiusAngle += ig.system.tick * this.radiusSpeed;
			if (this.currAngle > ig.game.TWOPI) {
				this.currAngle -= ig.game.TWOPI;
			}
			if (this.radiusAngle > ig.game.TWOPI) {
				this.radiusAngle -= ig.game.TWOPI;
			}
		}

		// Fade back in if transparent
		if (this.currAlpha < 1) {
			this.currAlpha += ig.system.tick * this.fadeSpeed;
			if (this.currAlpha > 1) {
				this.currAlpha = 1;
			}
		}



		this.currentAnim.alpha = this.currAlpha;
		this.currentAnim.flip.x = (ig.game.player.pos.x < this.pos.x);

		this.parent();
	},

	// The fakes don't actually receive damage, they just fade out
	receiveDamage: function( amount, from, bounceback, direction ) {
		if (this.fake) {
			this.currAlpha = 0.1;
		} else {
			this.parent(amount, from, bounceback, direction);
		}
	},

	kill: function() {
		// Make particles
		if (!this.fake) {
			ig.game.spawnEntity( EntityDeathmaskparticle, this.pos.x+10, this.pos.y, {spriteIndex: 4} );
			ig.game.spawnEntity( EntityDeathmaskparticle, this.pos.x+10, this.pos.y, {spriteIndex: 5} );
			ig.game.spawnEntity( EntityDeathmaskparticle, this.pos.x+10, this.pos.y, {spriteIndex: 6} );
			ig.game.spawnEntity( EntityDeathmaskparticle, this.pos.x+10, this.pos.y, {spriteIndex: 7} );
		}
		this.parent();
	}

})
})
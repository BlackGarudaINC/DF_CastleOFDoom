ig.module(
	'game.entities.enemy.gargoyle'
)
.requires(
	'game.entities.player.stoneparticle',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntityGargoyle = EntityEnemy.extend({
	
	health: 3,
	speed: 50,

	collides: ig.Entity.COLLIDES.NEVER,

	size: {x: 27, y: 34},
	offset: {x: 18, y: 30},
	maxVel: {x: 200, y: 200},

	offsetChange: 20,	// a different y-offset is used for flying vs. idle

	knockback: false,
	damageFlash: true,
	killWhenDead: false,
	showsPain: false,
	ignoreCollisions: true,

	attackSpeed: 100,	// Attack speed
	attackRange: 350,
	gravityFactor: 0,

	edgeReverse: false,
	levelReverse: false,
	wallReverse: false,

	goldDropValue: 15,

	awake: false,		// Awake and moving around

	attackTimer: null,
	idleTimer: null,	// How long it has to remain idle before attacking again
	attackSpeed: 100,
	returnSpeed: 80,

	position1: {x: 0, y: 0},
	position2: {x: 0, y: 0},
	target: {x: 0, y:0},

	foundX: false,
	foundY: false,

	lastPos: 1,

	animSheet: new ig.AnimationSheet( 'media/sprites/Gargoyle.png', 64, 64 ),

	// debugDraw: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.3, [0,1] );
		this.addAnim( 'prepare', 0.3, [2,3] );
		this.addAnim( 'fly', 0.1, [2,3] );
		this.addAnim( 'attack', 1, [2] );
		this.addAnim( 'death', 0.2, [4,5,6,7], true );

		// Define position 2 in weltmeister.
		// If it's not defined, it will just return back to position 1.
		this.position1.x = this.pos.x;
		this.position1.y = this.pos.y;
	},

	startUpdate: function() {
		this.parent();
		this.becomeIdle();
	},

	// Return to an idle position
	becomeIdle: function() {
		this.currentAnim = this.anims.idle;
		this.flip = (this.pos.x < ig.game.levelWidth / 2);
		this.vel.x = 0;
		this.vel.y = 0;
		this.accel.x = 0;
		this.accel.y = 0;
		this.awake = false;
		this.returning = false;
		this.idleTimer = new ig.Timer(3);
	},

	// Choose where to perch next
	getNextTarget: function() {
		if (this.lastPos == 1 && (this.position2.x != 0 || this.position2.y != 0)) {
			this.lastPos = 2;
			this.target = this.position2;
		} else {
			this.lastPos = 1;
			this.target = this.position1;
		}
	},

	handleTimers: function() {
		
		// Check if it's time to start or end the attack
		if (this.awake && this.attackTimer != null && this.attackTimer.delta() > 0) {

			if (this.currentAnim == this.anims.prepare) {
				this.attack();
				this.attackTimer.set(3.5);
			} else if (this.currentAnim == this.anims.attack) {
				this.prepareReturn();
				this.attackTimer = null;
			}
			
		}

		if (this.idleTimer != null && this.idleTimer.delta() > 0) {
			this.idleTimer = null;
		}

		this.parent();
	},

	// Start going back to a perched position
	prepareReturn: function() {
		this.getNextTarget();

		var xdiff = this.target.x - this.pos.x;
		var ydiff = this.target.y - this.pos.y;
		var dist  = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));

		if (dist == 0) { dist = 0.0001; }

		this.vel.x = (xdiff / dist) * this.returnSpeed;
		this.vel.y = (ydiff / dist) * this.returnSpeed;

		this.accel.x = 0;
		this.accel.y = 0;

		this.foundX = false;
		this.foundY = false;

		this.flip = (this.pos.x < this.target.x);

		this.currentAnim = this.anims.fly;
	},


	// Calculate the vectors needed to move towards the player
	attack: function() {
		var xdiff = ig.game.player.pos.x - this.pos.x;
		var ydiff = ig.game.player.pos.y - this.pos.y;
		var dist  = this.distanceTo(ig.game.player);

		if (dist == 0) { dist = 0.0001; }

		this.vel.x = (xdiff / dist) * this.attackSpeed;
		this.vel.y = (ydiff / dist) * this.attackSpeed + 100;
		this.accel.y = -100;

		this.flip = (this.pos.x < ig.game.player.pos.x);

		this.currentAnim = this.anims.attack;
	},
	

	myUpdate: function() {

		// If not awake yet, check if close enough to start waking up and preparing to attack
		if (!this.awake && this.idleTimer == null && this.distanceTo(ig.game.player) < 150) {
			this.awake = true;
			this.attackTimer = new ig.Timer(2);
			this.accel.y = -10;
			this.currentAnim = this.anims.prepare.rewind();
			this.flip = (this.pos.x < ig.game.player.pos.x);
			this.offset.y -= this.offsetChange;
		}

		// If returning to a perch, check if you've almost made it
		if (this.awake && this.currentAnim == this.anims.fly) {
			if (this.pos.x > this.target.x - 4 && this.pos.x < this.target.x + 4 && this.pos.y < this.target.y + 4 && this.pos.y > this.target.y - 4) { // Made it
				this.offset.y += this.offsetChange;
				this.pos.x = this.target.x;
				this.pos.y = this.target.y;
				this.becomeIdle();
			} else if (this.pos.x > this.target.x - 4 && this.pos.x < this.target.x + 4 && !this.foundX) { // Matched x-coords
				this.vel.x = 0;
				if (!this.foundY) {
					this.vel.y = (this.pos.y < this.target.y ? this.returnSpeed/2 : -this.returnSpeed/2);
				}
				this.foundX = true;
				this.pos.x = this.target.x;
			} else if (this.pos.y > this.target.y - 4 && this.pos.y < this.target.y + 4 && !this.foundY) { // Matched y-coords
				this.vel.y = 0;
				if (!this.foundX) {
					this.vel.x = (this.pos.x < this.target.x ? this.returnSpeed/2 : -this.returnSpeed/2);
				}
				this.foundY = true;
				this.pos.y = this.target.y;
			}
		}

		this.currentAnim.flip.x = !this.flip;

		this.parent();
	},

	deathCallback: function() {
		this.parent();
		this.vel.x = 0;
		this.vel.y = 0;
		this.accel.x = 0;
		this.accel.y = -10;
	},

	kill: function() {
		this.parent();

		// Make stone particles spawn
		for (var i=0; i<15; i++) {
			ig.game.spawnEntity( EntityStoneparticle, this.pos.x + Math.random()*20, this.pos.y + Math.random()*20, {image: 1} );
			ig.game.spawnEntity( EntityStoneparticle, this.pos.x + Math.random()*20, this.pos.y + Math.random()*20, {image: 2} );
		}
		
	}

});

});
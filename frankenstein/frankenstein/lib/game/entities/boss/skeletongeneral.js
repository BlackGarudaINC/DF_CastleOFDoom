ig.module(
	'game.entities.boss.skeletongeneral'
)
.requires(
	'impact.entity',
	'game.entities.boss.boss',
	'game.entities.boss.skeletonhead',
	'game.entities.boss.skeletonarm'
)
.defines(function(){
	
EntitySkeletongeneral = EntityBoss.extend({
	size: {x: 28, y: 92},
	offset: {x: 18, y: -28},
	maxVel: {x: 200, y: 600},
	friction: {x: 150, y: 0},

	edgeReverse: false,
	killWhenDead: false, // Use death animation instead of killing right away
	knockback: false,    // If they bounce back from damage
	speed: 20,
	damageFlash: true,

	attackTimer: null, 	// countdown to when it attacks
	armTimer: null,		// Change the frame for the idle arm
	armFrame: false,	// Alternates between the two arm frames
	walkTimer: null,	// He starts / stops walking
	walking: 0,			// Walking direction (0 is not walking)

	flip: false,		// False = facing left
	
	animSheet: new ig.AnimationSheet( 'media/sprites/SkeletonGeneral.png', 64, 64 ),
	myImage: new ig.Image( 'media/sprites/SkeletonGeneral.png' ),
	flashImage: new ig.Image( 'media/sprites/SkeletonGeneral.png#ffffff' ),

	// Body parts
	head: null,
	arm: null,	// attacking arm
	
	health: 5,
	// debugDraw: true,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// The main general is just the legs for the core animation, everything else is extra
		this.addAnim( 'idle', 0.2, [4] );
		this.addAnim( 'walk', 0.2, [4, 5, 4, 6] );

		if (ig.system.running && !this.alreadyDead) {

			// Spawn the various body parts
			ig.game.spawnEntity( EntitySkeletonhead, this.pos.x, this.pos.y, {master: this} );
			ig.game.spawnEntity( EntitySkeletonarm, this.pos.x, this.pos.y, {master: this} );
		}

	},

	startBattle: function() {
		this.parent();

		this.attackTimer = new ig.Timer(4);
		this.walkTimer = new ig.Timer(2);
		this.armTimer = new ig.Timer(0.8);
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	// Allow body parts to register themselves as what they are
	registerHead: function (head) {
		this.head = head;
	},
	registerArm: function (arm) {
		this.arm = arm;
	},

	handleTimers: function() {

		// Check if it's time to attack again
		if (this.attackTimer != null && this.attackTimer.delta() > 0) {

			// He either attacks or laughs, and he's more likely to attack later in battle
			if ( Math.random() < (this.phase+1)*0.2 ) {
				this.arm.attack();
			} else {
				this.head.laugh();
			}

			this.attackTimer.reset(); 
			
		}

		// Update the animation frame for the arm
		if (this.armTimer != null && this.armTimer.delta() > 0) {
			this.armFrame = !this.armFrame;
			this.armTimer.reset();
		}

		// Toggle walking / not walking
		if (this.walkTimer != null && this.walkTimer.delta() > 0) {
			this.flip = (ig.game.player.pos.x > this.pos.x);
			if (this.walking == 0) {
				this.walkTimer.set(8);
				this.currentAnim = this.anims.walk;
				this.walking = (this.flip ? 1 : -1);
			} else {
				this.walkTimer.set(6);
				this.currentAnim = this.anims.idle;
				this.walking = 0;
			}
		}

		this.parent();
	},


	// Depending on the battle phase, attacks end when you hit the wall
	flipOver: function(direction) {
		this.walking = -this.walking;
		
		this.parent(direction);
	},
	
	
	myUpdate: function() {

		if (this.walking != 0) {
			this.vel.x = this.speed * this.walking;
		}

		this.currentAnim.flip.x = this.flip;

		this.parent();
		
	},

	draw: function() {

		this.parent();

		if (this.visible) {

			var image = this.myImage;
			if (this.flashTimer != null) {
				image = this.flashImage;
			}

			// Draw the torso
			image.drawTile( this.pos.x - 2 - ig.game.screen.x, this.pos.y - ig.game.screen.y, 15, 32, 64, this.flip );

			// Draw the arm
			image.drawTile( this.pos.x + (this.flip ? -9 : 7) - ig.game.screen.x, this.pos.y + 12 - ig.game.screen.y, (this.armFrame ? 6 : 7), 32, 64, this.flip);

		}
		
	}
});

});
ig.module(
	'game.entities.player.player'
)
.requires(
	'game.entities.base',
	'game.entities.spawn',
	'game.entities.player.playerattack',
	'game.entities.player.meleeattack',
	'game.entities.player.groundpound',
	'game.entities.item.clubitem',
	'game.entities.item.pitchforkitem',
	'game.entities.item.ballandchainitem',
	'game.entities.item.scytheitem',
	'game.entities.item.hammeritem',
	'game.entities.player.hatchet',
	'game.entities.item.hatchetitem',
	'game.entities.player.acid',
	'game.entities.item.aciditem',
	'game.entities.player.bomb',
	'game.entities.item.bombitem',
	'game.entities.player.stone',
	'game.entities.item.stoneitem'
)
.defines(function(){

EntityPlayer = EntityBase.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 16, y: 26},
	offset: {x: 8, y: 6},
	
	maxVel: {x: 120, y: 300},
	friction: {x: 200, y: 0},
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/sprites/TheCreature01.png', 32, 32 ),
	playerImage: new ig.Image( 'media/sprites/TheCreature01.png' ),
	heartHud: new ig.Image( 'media/sprites/Hearts_HUD.png' ),
	weaponHud: new ig.Image( 'media/sprites/WeaponHUD.png' ),
	itemHud: new ig.Image( 'media/sprites/Items01_HUD.png' ),
	itemHud2: new ig.Image( 'media/sprites/Items02_HUD.png' ),
	goldHud: new ig.Image( 'media/sprites/GoldSack_HUD.png' ),
	
	sfxHurt1: new ig.Sound( 'media/sounds/Player/PlayerGetHit01.*' ),
	sfxJump: new ig.Sound( 'media/sounds/jump.*' ),

	// Attack Sounds
	sfxPunch: new ig.Sound( 'media/sounds/Player/PlayerPunch.*' ),

	sfxDeath: new ig.Sound( 'media/sounds/Player/PlayerGroan.*' ),

	jumping: false,
	falling: false,
	
	slopeStanding: {min: (0).toRad(), max: (180).toRad() }, // You can stand on slopes (not slide)

	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelGround: 600,
	accelAir: 600,
	jump: 500,	
	speed: 64,
	groundPoundSpeed: 500,
	slideSpeed: 160,

	usedDoubleJump: false, // Whether or not the player used the second jump yet
	tempInvincible: false, // You're invincible for a set time after getting hit
	tempInvincibleTimer: null,
	flashTimer: null, // Flash while temporarily invincible
	enableInput: true, // Enable if the player can move (this is false when talking to NPCs)

	runStartTimer: null,	// You have to hit over twice in a row really fast to start running
	runLeft: false,			// This ensures that you hit over twice in the same direction
	running: false,			// Whether or not you're actually running at the moment
	poundTimer: null,		// Timer once you hit the ground after a pound before you can move again
	slideTimer: null,		// Timer for how long a slide lasts

	staminaTimer: null,	// Refills your stamina by a percentage every x seconds

	energized: false,		// True if the player is currently electrified
	electricDrawTimer: null,// When to update the sprite being drawn for electricity
	electricFrame: 0,		// Current frame to draw for electricity
	numElectricFrames: 4,	// number of frames of electricity

	// debugDraw: true,

	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 0.5, [0, 1] );
		this.addAnim( 'run', 0.12, [2,3,2,4] );
		this.addAnim( 'jump', 0.05, [5,6], true ); // stop at the last frame
		this.addAnim( 'slide', 0.1, [94] );
		this.addAnim( 'flip', 0.1, [19, 20, 21, 22]);
		this.addAnim( 'pound', 0.05, [66, 66, 70, 70], true);
		this.addAnim( 'fall', 1, [7] ); 
		this.addAnim( 'pain', 0.3, [14], true );
		this.addAnim( 'death', 0.2, [14, 56, 57, 58, 59, 59, 59, 59, 59, 60, 61], true );
		this.addAnim( 'attack1', 0.1, [11, 12, 13]);
		this.addAnim( 'attack2', 0.1, [16, 17, 18]);
		this.addAnim( 'throwing', 0.1, [11, 12, 13]);
		this.addAnim( 'club', 0.1, [24, 25, 26]);
		this.addAnim( 'pitchfork', 0.1, [27, 28, 30]);
		this.addAnim( 'ballandchain', 0.1, [40, 41, 42, 44, 46, 48]);
		this.addAnim( 'scythe', 0.1, [49, 50, 52]);
		this.addAnim( 'hammer', 0.1, [33, 34, 35]);
		this.addAnim( 'clubidle', 1, [64, 65]);
		this.addAnim( 'clubrun', 0.12, [72,73,72,74] );
		this.addAnim( 'clubjump', 0.05, [80,81], true );
		this.addAnim( 'clubslide', 0.1, [111] );
		this.addAnim( 'clubfall', 1, [82] ); 
		this.addAnim( 'clubpain', 0.3, [67], true );
		this.addAnim( 'clubpound', 0.05, [142, 142, 143, 143], true);
		this.addAnim( 'clubflip', 0.1, [120, 121, 122, 123]);
		this.addAnim( 'ballidle', 1, [88, 89]);
		this.addAnim( 'ballrun', 0.12, [96,97,96,98] );
		this.addAnim( 'balljump', 0.05, [104,105], true );
		this.addAnim( 'ballslide', 0.1, [140] );
		this.addAnim( 'ballfall', 1, [106] ); 
		this.addAnim( 'ballpain', 0.3, [75], true );
		this.addAnim( 'ballpound', 0.05, [150, 150, 151, 151], true);
		this.addAnim( 'ballflip', 0.1, [112, 113, 114, 115]);
		this.addAnim( 'pitchforkidle', 1, [15, 23]);
		this.addAnim( 'pitchforkrun', 0.12, [37,38,37,39] );
		this.addAnim( 'pitchforkjump', 0.05, [90,99], true );
		this.addAnim( 'pitchforkslide', 0.1, [136] );
		this.addAnim( 'pitchforkfall', 1, [107] ); 
		this.addAnim( 'pitchforkpain', 0.3, [10], true );
		this.addAnim( 'pitchforkflip', 0.1, [79, 87, 95, 103]);
		this.addAnim( 'pitchforkpound', 0.05, [144, 144, 145, 145], true);
		this.addAnim( 'scytheidle', 1, [68, 69]);
		this.addAnim( 'scytherun', 0.12, [76,77,76,78] );
		this.addAnim( 'scythejump', 0.05, [84,85], true );
		this.addAnim( 'scytheslide', 0.1, [137] );
		this.addAnim( 'scythefall', 1, [86] ); 
		this.addAnim( 'scythepain', 0.3, [91], true );
		this.addAnim( 'scytheflip', 0.1, [124, 125, 126, 127]);
		this.addAnim( 'scythepound', 0.05, [148, 148, 149, 149], true);
		this.addAnim( 'hammeridle', 1, [92, 93]);
		this.addAnim( 'hammerrun', 0.12, [100,101,100,102] );
		this.addAnim( 'hammerjump', 0.05, [108,109], true );
		this.addAnim( 'hammerslide', 0.1, [138] );
		this.addAnim( 'hammerfall', 1, [110] ); 
		this.addAnim( 'hammerpain', 0.3, [83], true );
		this.addAnim( 'hammerpound', 0.05, [146, 146, 147, 147], true);
		this.addAnim( 'hammerflip', 0.1, [116, 117, 118, 119]);

		this.zIndex = 100;

		// Set a reference to the player on the game instance
		ig.game.player = this;

		// Start the stamina refill timer
		this.staminaTimer = new ig.Timer(0.1);
	},

	// Separate initializations that depend on other entities in the room
	startUpdate: function() {
		// Check if we just changed rooms, and if so, where to go
		if (ig.game.spawnLoc) {
			var spawn = ig.game.getEntityByName(ig.game.spawnLoc);
			this.pos = spawn.pos;
		}

		// Check which side of the room you're on to determine your initial flip
		if (this.pos.x > 100) {
			this.flip = true;
		}

		// If you came into the room energized, start the timer back up
		if (ig.game.playerState.energized) {
			this.electricDrawTimer = new ig.Timer(0.05);
		}

		this.parent();
	},

	attacking: function() {
		return (this.currentAnim == this.anims.attack1 || this.currentAnim == this.anims.attack2 || this.currentAnim == this.anims.throwing || this.currentAnim == this.anims.club || this.currentAnim == this.anims.pitchfork || this.currentAnim == this.anims.ballandchain || this.currentAnim == this.anims.scythe || this.currentAnim == this.anims.hammer);
	},

	// returns if you are ground pounding
	pounding: function() {
		return (this.currentAnim == this.anims.pound || this.currentAnim == this.anims.clubpound || this.currentAnim == this.anims.ballpound || this.currentAnim == this.anims.pitchforkpound || this.currentAnim == this.anims.scythepound || this.currentAnim == this.anims.hammerpound);
	},

	handleInput: function() {

		// Check for running
		if (ig.game.playerState.run && (ig.input.pressed('left') || ig.input.pressed('right'))) {

			if (this.runStartTimer == null) { // First press
				this.runStartTimer = new ig.Timer(0.5);
				this.runLeft = true;
				this.running = false;
				if (ig.input.pressed('right')) { this.runLeft = false; }
			} else if ( (ig.input.pressed('left') && this.runLeft) || (ig.input.pressed('right') && !this.runLeft) ) {
				// Start running on the second press if it's in the same direction
				this.running = true;
				this.runStartTimer = null;
			}
		}

		// You can't press any buttons while pounding or sliding
		if (!this.pounding() && !this.inSlideAnimation()) {

			// Handle user input; move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if( ig.input.state('left') && (!this.attacking() || !this.standing) ) {
				if (!this.runLeft) { this.running = false; }
				this.vel.x = -this.speed * (this.running ? 2 : 1);
				this.flip = true;
			}
			else if( ig.input.state('right') && (!this.attacking() || !this.standing) ) {
				if (this.runLeft) { this.running = false; }
				this.vel.x = this.speed * (this.running ? 2 : 1);
				this.flip = false;
			}
			else {
				// this.accel.x = 0;
				this.vel.x = 0;
				this.running = false;
			}

			// jump
			if( this.standing && ig.input.pressed('jump') ) {

				// Check if it's a slide rather than a jump
				if (ig.input.state('down') && ig.game.playerState.slide) {
					this.slide();
				} else {
					this.vel.y = -this.jump;
					this.sfxJump.play();
					this.usedDoubleJump = false;
				}
			}

			// double jump
			if (ig.input.pressed('jump') && !this.standing && ig.game.playerState.doubleJump && !this.usedDoubleJump) {
				this.usedDoubleJump = true;
				this.vel.y = -this.jump;
				this.flipAnimation();
				this.sfxJump.play();
			}
			
			// throw attack
			if( ig.input.pressed('shoot') && !this.attacking()) {
				this.throwAttack();
			}

			// attack
			if (ig.input.pressed('attack') && !this.attacking()) {

				// Check if this is actually a ground pound
				if (ig.input.state('down') && !this.standing && ig.game.playerState.groundPound) {
					this.groundPound();
				} else {
					this.meleeAttack();
				}
			}
		}

	},

	// Use the proper throw attack
	throwAttack: function() {
		if (ig.game.playerState.throwWeapon) {
			var entity = this.getThrowingEntity();
			if (entity != null) { // If you have enough stamina
				this.currentAnim = this.anims.throwing.rewind();
				ig.game.spawnEntity( entity, this.pos.x, this.pos.y, {flip:this.flip} );
			}
		}
	},

	// Slide across the ground
	slide: function() {
		this.slideAnimation();
		this.slideTimer = new ig.Timer(0.3);
		this.size.y = 14;
		this.offset.y = 18;
		this.pos.y += 12;
	},

	// Ground pound
	groundPound: function() {
		this.poundAnimation();
		this.gravityFactor = 0; // Float momentarily
	},

	// Use the proper melee attack
	meleeAttack: function() {
		var attackTime = 0.3;
		var width = 8;
		var damage = 1;
		var bounceback = 1;
		var delay = 0.1;

		switch(ig.game.playerState.meleeWeapon) {
		case 1: // Club
			this.currentAnim = this.anims.club.rewind();
			width = 10;
			damage = 1.2;
			break;
		case 2: // Pitchfork
			this.currentAnim = this.anims.pitchfork.rewind();
			width = 18;
			damage = 1.0;
			bounceback = 0.5;
			delay = 0;
			break;
		case 3: // Ball and chain
			this.currentAnim = this.anims.ballandchain.rewind();
			width = 32;
			damage = 1.4;
			bounceback = 2.0;
			attackTime = 0.5;
			delay = 0.3;
			break;
		case 4: // Scythe
			this.currentAnim = this.anims.scythe.rewind();
			width = 20;
			damage = 1.8;
			break;
		case 5: // Hammer
			this.currentAnim = this.anims.hammer.rewind();
			width = 14;
			damage = 1.5
			bounceback = 1.5
			break;
		default: // No weapon
			if (Math.random() < 0.5) {
				this.currentAnim = this.anims.attack2.rewind();
			} else {
				this.currentAnim = this.anims.attack1.rewind();
			}
			this.sfxPunch.play();
			break;
		}

		ig.game.spawnEntity( EntityMeleeattack, this.pos.x, this.pos.y, {damage: damage, attackTime: attackTime, flip: this.flip, width: width, bounceback: bounceback, delay: delay} );
	},

	// Check every active timer
	handleTimers: function() {

		// Check if it's time to toggle visibility
		if (this.tempInvincible && this.flashTimer.delta() > 0) {
			this.visible = !this.visible;
			this.flashTimer.set(0.1);
		}

		// Check if you're done being temporarily invincible
		if (this.tempInvincible && this.tempInvincibleTimer.delta() > 0) {
			this.tempInvincible = false;
			this.visible = true;
		}

		// Refill the stamina meter
		if (this.staminaTimer.delta() > 0) {
			if (ig.game.playerState.stamina < ig.game.playerState.maxStamina) {
				ig.game.playerState.stamina += 0.5;
			}
			this.staminaTimer.set(0.05);
		}

		// Check if the run start timer expired
		if (this.runStartTimer != null && this.runStartTimer.delta() > 0) {
			this.runStartTimer = null;
		}

		// Check if done ground pounding
		if (this.poundTimer != null && this.poundTimer.delta() > 0) {
			this.poundTimer = null;
			this.idleAnimation();
		}

		// Check if it's time to update the electric frame
		if (this.electricDrawTimer != null && this.electricDrawTimer.delta() > 0) {
			this.electricFrame += 1;
			if (this.electricFrame >= this.numElectricFrames) {
				this.electricFrame = 0;
			}
			// The timer has different random ranges depending on which frame is used
			if (this.electricFrame == 0 || this.electricFrame == 2) {
				this.electricDrawTimer.set(0.1 + (Math.random() * 0.25));
			} else {
				this.electricDrawTimer.set(0.05 + (Math.random() * 0.05));
			}
		}

		// Check if done sliding
		if (this.slideTimer != null && this.slideTimer.delta() > 0) {

			// Check if you can stand up, and if not, keep sliding a little longer
			if( ig.game.collisionMap.getTile(this.pos.x, this.pos.y - 12) || ig.game.collisionMap.getTile(this.pos.x + this.size.x, this.pos.y - 12) ) {
				this.slideTimer.set(0.1);
			} else {
				this.slideTimer = null;
				this.idleAnimation();
				this.size.y = this.originalSize.y;
				this.offset.y = this.originalOffset.y;
				this.pos.y -= 12;
			}
		}
	},

	// Figure out which animation to use
	handleAnimations: function() {

		// Check if in one of the animations that override idle states
		if( (this.inPainAnimation() || this.currentAnim == this.anims.death || this.attacking() || this.inFlipAnimation()) &&
			this.currentAnim.loopCount < 1
		) {
			// Do nothing if we're in pain, dying, flipping, or attacking and we're only on the first animation loop
		}
		else if( ig.game.playerState.health <= 0 ) {
			// We're actually dead and the death (pain) animation is 
			// finished. Remove ourself from the game world.
			this.kill();
		}
		else if (this.pounding()) { 
			if (!this.standing) {
				// When ground pounding, keep ground pounding until we hit the ground.
				if (this.currentAnim.loopCount > 0) {
					this.vel.y = this.groundPoundSpeed;
					// The first time the player starts moving, spawn the ground pound attack
					if (this.gravityFactor == 0) {
						ig.game.spawnEntity( EntityGroundpound, this.pos.x, this.pos.y, {} );
					}
				} else {
					this.vel.y = 0;
				}
			} else if (this.poundTimer == null) {
				// Once we hit the ground, set the timer before you can move again
				this.poundTimer = new ig.Timer(0.5);
			}
		}
		else if (this.inSlideAnimation()) {
			// Slide across the floor
			this.vel.x = (this.flip ? -this.slideSpeed : this.slideSpeed);
		}
		else if( this.vel.y < 0 && !this.standing ) {
			if (!this.jumping || this.inFlipAnimation()) { this.jumpAnimation(); }
			this.jumping = true;
			this.falling = false;
		}
		else if( this.vel.y > 0 && !this.standing) {
			if (!this.falling || this.inFlipAnimation()) { this.fallAnimation(); }
			this.jumping = false;
			this.falling = true;
		}
		else if( this.vel.x != 0 ) {
			this.runAnimation();
		}
		else {
			this.idleAnimation();
		}

		if (this.standing) {
			this.jumping = false;
			this.falling = false;
		}

		// Make sure gravity is always on unless ground pounding
		if (!this.pounding() || this.currentAnim.loopCount > 0) {
			this.gravityFactor = this.originalGravity;
		}
		
		this.currentAnim.flip.x = this.flip;
	},

	// Use the proper idle animation based on the melee weapon for a variety of situations
	idleAnimation: function() {
		switch(ig.game.playerState.meleeWeapon) {
		case 1:  // Club
			this.currentAnim = this.anims.clubidle;
			break;
		case 2:  // Pitchfork
			this.currentAnim = this.anims.pitchforkidle;
			break;
		case 3:  // Ball and chain
			this.currentAnim = this.anims.ballidle;
			break;
		case 4:  // Scythe
			this.currentAnim = this.anims.scytheidle;
			break;
		case 5:  // Hammer
			this.currentAnim = this.anims.hammeridle;
			break;
		default: // unarmed
			this.currentAnim = this.anims.idle;
			break;
		}
	},
	runAnimation: function() {
		switch(ig.game.playerState.meleeWeapon) {
		case 1:  // Club
			this.currentAnim = this.anims.clubrun;
			break;
		case 2:  // Pitchfork
			this.currentAnim = this.anims.pitchforkrun;
			break;
		case 3:  // Ball and chain
			this.currentAnim = this.anims.ballrun;
			break;
		case 4:  // Scythe
			this.currentAnim = this.anims.scytherun;
			break;
		case 5:  // Hammer
			this.currentAnim = this.anims.hammerrun;
			break;
		default: // unarmed
			this.currentAnim = this.anims.run;
			break;
		}
	},
	jumpAnimation: function() {
		switch(ig.game.playerState.meleeWeapon) {
		case 1:  // Club
			this.currentAnim = this.anims.clubjump.rewind();
			break;
		case 2:  // Pitchfork
			this.currentAnim = this.anims.pitchforkjump.rewind();
			break;
		case 3:  // Ball and chain
			this.currentAnim = this.anims.balljump.rewind();
			break;
		case 4:  // Scythe
			this.currentAnim = this.anims.scythejump.rewind();
			break;
		case 5:  // Hammer
			this.currentAnim = this.anims.hammerjump.rewind();
			break;
		default: // unarmed
			this.currentAnim = this.anims.jump.rewind();
			break;
		}
	},
	flipAnimation: function() {
		switch(ig.game.playerState.meleeWeapon) {
		case 1:  // Club
			this.currentAnim = this.anims.clubflip.rewind();
			break;
		case 2:  // Pitchfork
			this.currentAnim = this.anims.pitchforkflip.rewind();
			break;
		case 3:  // Ball and chain
			this.currentAnim = this.anims.ballflip.rewind();
			break;
		case 4:  // Scythe
			this.currentAnim = this.anims.scytheflip.rewind();
			break;
		case 5:  // Hammer
			this.currentAnim = this.anims.hammerflip.rewind();
			break;
		default: // unarmed
			this.currentAnim = this.anims.flip.rewind();
			break;
		}
	},
	poundAnimation: function() {
		switch(ig.game.playerState.meleeWeapon) {
		case 1:  // Club
			this.currentAnim = this.anims.clubpound.rewind();
			break;
		case 2:  // Pitchfork
			this.currentAnim = this.anims.pitchforkpound.rewind();
			break;
		case 3:  // Ball and chain
			this.currentAnim = this.anims.ballpound.rewind();
			break;
		case 4:  // Scythe
			this.currentAnim = this.anims.scythepound.rewind();
			break;
		case 5:  // Hammer
			this.currentAnim = this.anims.hammerpound.rewind();
			break;
		default: // unarmed
			this.currentAnim = this.anims.pound.rewind();
			break;
		}
	},
	fallAnimation: function() {
		switch(ig.game.playerState.meleeWeapon) {
		case 1:  // Club
			this.currentAnim = this.anims.clubfall;
			break;
		case 2:  // Pitchfork
			this.currentAnim = this.anims.pitchforkfall;
			break;
		case 3:  // Ball and chain
			this.currentAnim = this.anims.ballfall;
			break;
		case 4:  // Scythe
			this.currentAnim = this.anims.scythefall;
			break;
		case 5:  // Hammer
			this.currentAnim = this.anims.hammerfall;
			break;
		default: // unarmed
			this.currentAnim = this.anims.fall;
			break;
		}
	},
	painAnimation: function() {
		switch(ig.game.playerState.meleeWeapon) {
		case 1:  // Club
			this.currentAnim = this.anims.clubpain.rewind();
			break;
		case 2:  // Pitchfork
			this.currentAnim = this.anims.pitchforkpain.rewind();
			break;
		case 3:  // Ball and chain
			this.currentAnim = this.anims.ballpain.rewind();
			break;
		case 4:  // Scythe
			this.currentAnim = this.anims.scythepain.rewind();
			break;
		case 5:  // Hammer
			this.currentAnim = this.anims.hammerpain.rewind();
			break;
		default: // unarmed
			this.currentAnim = this.anims.pain.rewind();
			break;
		}
	},
	slideAnimation: function() {
		switch(ig.game.playerState.meleeWeapon) {
		case 1:  // Club
			this.currentAnim = this.anims.clubslide.rewind();
			break;
		case 2:  // Pitchfork
			this.currentAnim = this.anims.pitchforkslide.rewind();
			break;
		case 3:  // Ball and chain
			this.currentAnim = this.anims.ballslide.rewind();
			break;
		case 4:  // Scythe
			this.currentAnim = this.anims.scytheslide.rewind();
			break;
		case 5:  // Hammer
			this.currentAnim = this.anims.hammerslide.rewind();
			break;
		default: // unarmed
			this.currentAnim = this.anims.slide.rewind();
			break;
		}
	},

	// Returns true if any of the pain animations are running
	inPainAnimation: function() {
		return (this.currentAnim == this.anims.pain || this.currentAnim == this.anims.clubpain || this.currentAnim == this.anims.pitchforkpain || this.currentAnim == this.anims.ballpain || this.currentAnim == this.anims.scythepain || this.currentAnim == this.anims.hammerpain);
	},

	// Returns true if any of the flip animations are running
	inFlipAnimation: function() {
		return (this.currentAnim == this.anims.flip || this.currentAnim == this.anims.clubflip || this.currentAnim == this.anims.pitchforkflip || this.currentAnim == this.anims.ballflip || this.currentAnim == this.anims.scytheflip || this.currentAnim == this.anims.hammerflip);
	},

	// Returns true if sliding
	inSlideAnimation: function() {
		return (this.currentAnim == this.anims.slide || this.currentAnim == this.anims.clubslide || this.currentAnim == this.anims.pitchforkslide || this.currentAnim == this.anims.ballslide || this.currentAnim == this.anims.scytheslide || this.currentAnim == this.anims.hammerslide);
	},
	
	myUpdate: function() {

		if (this.currentAnim != this.anims.death && !this.inPainAnimation() && this.enableInput) {
			this.handleInput();
		} else if (!this.inPainAnimation()) {
			this.vel.x = 0;
		}

		this.handleAnimations();
		this.handleTimers();
		
		this.parent();
	},

	drawHealth: function() {

		var i;

		// Stamina Bar
		for (i=0; i<Math.floor(ig.game.playerState.maxStamina/16); i++) {
			this.heartHud.drawTile( i*16, ig.system.height - 18, 3, 16 );
		}
		this.heartHud.drawTile( i*16, ig.system.height - 18, 4, 16 );

		// Stamina
		ig.system.context.fillStyle = "rgb(154,101,10)";
		ig.system.context.beginPath();
		ig.system.context.rect(
		                0, 
		                (ig.system.height - 16) * ig.system.scale, 
		                ig.game.playerState.stamina * ig.system.scale, 
		                12 * ig.system.scale
		            );
		ig.system.context.closePath();
		ig.system.context.fill();

		// Hearts
		var halfHealth = Math.floor(ig.game.playerState.health / 2);
		for (i=0; i<halfHealth; i++) {
			this.heartHud.drawTile( i*16, ig.system.height - 18, 0, 16 );
		}

		if (ig.game.playerState.health % 2 == 1) {
			this.heartHud.drawTile( i*16, ig.system.height - 18, 1, 16 );
			i++;
		}

		var maxHearts = Math.floor(ig.game.playerState.maxHealth / 2);
		for (; i<maxHearts; i++) {
			this.heartHud.drawTile( i*16, ig.system.height - 18, 2, 16 );
		}
	},

	drawWeapons: function() {

		// HUD background
		this.weaponHud.drawTile( ig.system.width-66, ig.system.height - 26, 0, 64, 24 );

		// Throw weapon
		switch(ig.game.playerState.throwWeapon) {
		case 1: // Hatchet
			this.itemHud.drawTile( ig.system.width-22, ig.system.height - 26, 2, 16, 24 );
			break;
		case 2: // Stone
			this.itemHud.drawTile( ig.system.width-22, ig.system.height - 26, 0, 16, 24 );
			break;
		case 3: // Acid
			this.itemHud.drawTile( ig.system.width-22, ig.system.height - 26, 1, 16, 24 );
			break;
		case 4: // Bomb
			this.itemHud.drawTile( ig.system.width-22, ig.system.height - 26, 3, 16, 24 );
			break;
		}

		// Melee weapon
		switch(ig.game.playerState.meleeWeapon) {
		case 1: // Club
			this.itemHud2.drawTile( ig.system.width-50, ig.system.height - 26, 0, 24, 24 );
			break;
		case 2: // Pitchfork
			this.itemHud2.drawTile( ig.system.width-50, ig.system.height - 26, 3, 24, 24 );
			break;
		case 3: // Ball and Chain
			this.itemHud2.drawTile( ig.system.width-50, ig.system.height - 26, 4, 24, 24 );
			break;
		case 4: // Scythe
			this.itemHud2.drawTile( ig.system.width-50, ig.system.height - 26, 2, 24, 24 );
			break;
		case 5: // Hammer
			this.itemHud2.drawTile( ig.system.width-50, ig.system.height - 26, 1, 24, 24 );
			break;
		}

	},

	drawItems: function() {
		// Draw the gold
		this.goldHud.drawTile( ig.system.width-112, ig.system.height - 22, 0, 16, 20 );
		ig.game.whiteFont.draw( ig.game.playerState.gold, ig.system.width-94, ig.system.height - 16, ig.Font.ALIGN.LEFT);
	},

	// Draw the electricity behind the player 
	drawElectricity: function() {
		frame = 0;

		if (this.standing) {
			switch(this.electricFrame) {
			case 0:
			case 2:
				frame = 128;
				break;
			case 1:
				frame = 129;
				break;
			case 3:
				frame = 130;
				break;
			}
		} else {
			switch(this.electricFrame) {
			case 0:
			case 2:
				frame = 128;
				break;
			case 1:
				frame = 131;
				break;
			case 3:
				frame = 132;
				break;
			}
		}

		this.playerImage.drawTile( this.pos.x - ig.game.screen.x - 8, this.pos.y - ig.game.screen.y - 6, frame, 32, 32 );
	},

	draw: function() {

		if (ig.system.running) {
			if (ig.game.playerState.energized) {
				this.drawElectricity();
			}
		}

		this.parent();

		this.drawAttackOverflow();

		// Draw the HUD
		if (ig.system.running) {
			this.drawHealth();
			this.drawWeapons();
			this.drawItems();
		}
	},

	// Draw the parts of certain melee attacks that go outside of the main sprite
	drawAttackOverflow: function() {
		var frame = null;
		var behind = false;
		if (this.currentAnim == this.anims.ballandchain) {
			if (this.currentAnim.frame == 2) {
				frame = 43;
			} else if (this.currentAnim.frame == 3) {
				frame = 45;
			} else if (this.currentAnim.frame == 4) {
				frame = 47;
			}
		} else if (this.currentAnim == this.anims.pitchfork) {
			if (this.currentAnim.frame == 1) {
				frame = 29;
			} else if (this.currentAnim.frame == 2) {
				frame = 31;
			}
		} else if (this.currentAnim == this.anims.scythe) {
			if (this.currentAnim.frame == 1) {
				frame = 51;
			} else if (this.currentAnim.frame == 2) {
				frame = 53;
			}
		} else if (this.currentAnim == this.anims.hammer) {
			if (this.currentAnim.frame == 0) {
				frame = 32;
				behind = true;
			} else if (this.currentAnim.frame == 2) {
				frame = 36;
			}
		} else if (this.currentAnim == this.anims.ballslide) {
			if (this.currentAnim.frame == 0) {
				frame = 139;
				behind = true;
			} 
		}

		// Draw the actual overflow part
		if (frame != null) {
			var x = this.pos.x;
			if ((this.flip && !behind) || (behind && !this.flip)) {
				x = x - this.offset.x - 32;
			} else {
				x = x + 32 - this.offset.x;
			}
			this.playerImage.drawTile( x - ig.game.screen.x, this.pos.y - this.offset.y - ig.game.screen.y, frame, 32, 32, this.flip );
		}
	},

	noKeyPress: function(){
		var actions = ig.input.actions;
		for( var action in actions ){
			if( actions[action] ){
				return false;
			}
		}
		var presses = ig.input.presses;
		for( var press in presses ){
			if( presses[press] ){
				return false;
			}
		}
		return true;
	},

	handleMovementTrace: function( res ){
		this.parent( res );

		// If standing on slope and no key press, stop all movement
		if( res.collision.slope && this.standing && this.noKeyPress() ){
			this.pos.x = this.last.x;
			this.pos.y = this.last.y;
			this.vel.x = 0;
			this.vel.y = 0;
		}
	},

	// Drop the given weapon
	dropWeapon: function( weapon ) {
		var dir = -1;
		if (this.flip) {dir = 1;}
		ig.game.spawnEntity( weapon, this.pos.x + 10, this.pos.y, {dropped: true, direction: dir} );
	},

	// Energize the player from electricity
	getEnergized: function() {
		if (!ig.game.playerState.energized) {
			ig.game.playerState.energized = true;
			this.electricDrawTimer = new ig.Timer(0.05);
		}
	},

	// Stop being energized
	loseEnergized: function() {
		ig.game.playerState.energized = false;
		this.electricDrawTimer = false;
	},

	// Given a weaponID, return the weapon item
	getThrowingItem: function() {
		switch(ig.game.playerState.throwWeapon) {
		case 1:
			return EntityHatchetitem;
			break;
		case 2:
			return EntityStoneitem;
			break;
		case 3:
			return EntityAciditem;
			break;
		case 4:
			return EntityBombitem;
			break;
		default:
			break;
		}
	},

	// Given a weaponID, return the weapon entity, or null if you don't have the stamina
	getThrowingEntity: function() {
		var entity = null;
		var cost = 0;

		switch(ig.game.playerState.throwWeapon) {
		case 1:
			entity = EntityHatchet;
			cost = 12;
			break;
		case 2:
			entity = EntityStone;
			cost = 10;
			break;
		case 3:
			entity = EntityAcid;
			cost = 40;
			break;
		case 4:
			entity = EntityBomb;
			cost = 30;
			break;
		default:
			break;
		}

		// Check if you have enough stamina
		if (ig.game.playerState.stamina > cost) {
			ig.game.playerState.stamina -= cost;
			return entity;
		} else {
			return null;
		}
	},

	// Given a weaponID, return the weapon item
	getMeleeItem: function() {
		switch(ig.game.playerState.meleeWeapon) {
		case 1:
			return EntityClubitem;
			break;
		case 2:
			return EntityPitchforkitem;
			break;
		case 3:
			return EntityBallandchainitem;
			break;
		case 4:
			return EntityScytheitem;
			break;
		case 5:
			return EntityHammeritem;
			break;
		default:
			break;
		}
	},


	// Collect the throwing weapon with the given ID
	changeThrowingWeapon: function( weaponID ) {

		// If you're currently holding a weapon, drop it
		if (ig.game.playerState.throwWeapon) {
			this.dropWeapon(this.getThrowingItem());
		}

		ig.game.playerState.throwWeapon = weaponID;
	},

	// Collect the melee weapon with the given ID
	changeMeleeWeapon: function( weaponID ) {

		// If you're currently holding a weapon, drop it
		if (ig.game.playerState.meleeWeapon) {
			this.dropWeapon(this.getMeleeItem());
		}

		ig.game.playerState.meleeWeapon = weaponID;
	},

	kill: function() {
		this.parent();

		// Put the life back to the max
		// ig.game.playerState.health = ig.game.playerState.maxHealth;

		// Reset the spawn location
		ig.game.spawnLoc = null;

		// Reload this level
		// ig.game.reloadLevel();

		// Restart from the last save point
		ig.game.load();
	},


	receiveDamage: function( amount, from ) {
		if( this.inPainAnimation() || this.currentAnim == this.anims.death || this.tempInvincible || this.pounding()) {
			// Already in pain, dead, or invincible? Do nothing.
			return;
		}

		// We don't call the parent implementation here, because it 
		// would call this.kill() as soon as the health is zero. 
		// We want to play our death (pain) animation first.
		ig.game.playerState.health -= amount;
		if (ig.game.playerState.health <= 0) {
			this.currentAnim = this.anims.death.rewind();
			this.sfxDeath.play();
		} else {
			this.painAnimation();
		}

		// Knockback
		this.vel.x = (from.pos.x > this.pos.x) ? -200 : 200;
		this.vel.y = -100;
		
		// Sound
		this.sfxHurt1.play();

		// Set temporary invincibility if not dead
		if (this.currentAnim != this.anims.death) {
			if (this.tempInvincibleTimer === null) {
				this.tempInvincibleTimer = new ig.Timer(1);
				this.flashTimer = new ig.Timer(0.1)
			} else {
				this.tempInvincibleTimer.set(1);
				this.flashTimer.set(0.1)
			}
			this.tempInvincible = true;
		}
	}
});


});
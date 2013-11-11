ig.module(
	'game.entities.boss.serpentking'
)
.requires(
	'impact.entity',
	'game.entities.boss.boss',
	'game.entities.boss.serpentbody',
	'game.entities.boss.serpentacid',
	'game.entities.boss.serpenttongue'
)
.defines(function(){
	
EntitySerpentking = EntityBoss.extend({
	size: {x: 52, y: 38},
	offset: {x: 12, y: 0},
	maxVel: {x: 600, y: 600},

	edgeReverse: false, 
	levelReverse: false,
	wallReverse: false,
	knockback: false,    // If they bounce back from damage
	speed: 40,
	damageFlash: true,
	gravityFactor: 0,
	flashParts: true,	// All parts flash when hit
	ignoreCollisions: true,

	attackTimer: null, 	 	// countdown to when it attacks
	xReverseTimer: null,	// countdown to when it reverses x velocity
	yReverseTimer: null,	// countdown to when it reverses y velocity
	idleTimer: null,		// countdown used for in between, idle time
	tongueTimer: null,		// countdown for pre-defined tongue action
	flip: false,
	
	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 64, 32 ),
	myImage: new ig.Image( 'media/sprites/SerpentKing.png' ),
	
	chainOrigin: {x: 22, y:0 }, // Offset the body chain a little back

	health: 5,
	// debugDraw: true,

	// Different attack states:
	// 0: No state yet
	// 1: Idle / shoot acid
	// 2: Move to a new position
	// 3: Bite quickly
	// 4: Move quickly across screen from off-screen
	state: 0,
	nextState: 0,	// When in state 2 (move to a new position), this is the state it's moving to
	targetPos: {x:0, y:0}, // In state 2, this is where it's trying to get to
	foundX: false,			// In state 2, if you made it to the x and y coordinates
	foundY: false,
	actionsRemaining: 0,	// How many actions are remaining in this state before changing states
	accelFactor: 3,	// Accelerations are set to maxVel times this value

	idlePos: {x:0, y:0},	// Starting position (also the position of the idle attack)

	xPositive: false,		// The direction it was moving at the end of the last frame
	yPositive: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'shoot', 0.1, [4, 5, 4], true); // shooting acid one at a time
		this.addAnim( 'spew', 0.1, [4, 5], true);  // keep mouth open for continuous acid shots
		this.addAnim( 'close', 0.1, [5, 4], true);    // close mouth (go to idle right after)
		this.addAnim( 'bite', 0.1, [0, 4, 5, 8, 8, 8, 8, 5, 4, 0], true); 
		this.addAnim( 'death', 4, [10], true );

		this.idlePos.x = this.pos.x;
		this.idlePos.y = this.pos.y;

		if (ig.system.running && !this.alreadyDead) {
			// Spawn the body parts, using initial offsets provided
			ig.game.spawnEntity( EntitySerpentbody, this.pos.x, this.pos.y, {master: this, parentNode: this, numNodes: 20, nodeEntity: EntitySerpentbody, initOffset: {x: 5, y: 2}} );
		}

	},

	startBattle: function() {
		this.parent();

		if (this.alreadyDead) {return;}

		// Configure the movement patterns for the body
		if (this.childNode) {
			this.childNode.configure({ lowRange: {x: -4, y: -6}, highRange: {x: 8, y: 6}, maxVel: {x: 10, y: 10} });
		}

		// this.idleAttack();
		this.newAttack(4);
	},

	// Stick out the tongue once
	tongue: function() {
		ig.game.spawnEntity( EntitySerpenttongue, 40, 40, {master: this} );
	},

	flipOver: function() {
		this.flip = !this.flip;
		this.offset.x = (this.flip ? -22 : 12);
	},

	// Move to a new attack
	newAttack: function( nextAttack ) {

		this.tongue();

		if (this.state == 1 && nextAttack == 3) {
			// Do nothing, there's no need to re-configure the speed for the short distance
		} else {

			this.maxVel.x = 80;
			this.maxVel.y = 80;

			// Configure for the movement between attacks
			if (this.childNode) {
				this.childNode.configureSpeed(this.maxVel);
			}
		}
		

		this.state = 2;
		this.nextState = nextAttack;
		this.foundX = false;
		this.foundY = false;
		this.xReverseTimer = null;
		this.yReverseTimer = null;

		// Locations where each attack takes place
		if (this.nextState == 1) {
			this.targetPos.x = this.idlePos.x;
			this.targetPos.y = this.idlePos.y;
		} else if (this.nextState == 3) {
			this.targetPos.x = this.idlePos.x - 10;
			this.targetPos.y = this.idlePos.y;
		} else if (this.nextState == 4) {
			this.targetPos.x = 360;
			this.targetPos.y = this.idlePos.y;
		}

		// Set the acceleration to move towards the target
		this.accel.x = this.maxVel.x * (this.pos.x < this.targetPos.x ? this.accelFactor : -this.accelFactor);
		this.accel.y = this.maxVel.y * (this.pos.y < this.targetPos.y ? this.accelFactor : -this.accelFactor);
	},

	// Hang out on the right and shoot acid
	idleAttack: function() {

		this.tongue();

		this.maxVel.x = 40;
		this.maxVel.y = 40;

		// Configure for the idle attack
		if (this.childNode) {
			this.childNode.configureSpeed(this.maxVel);
		}

		this.xReverseTimer = new ig.Timer(0.5);
		this.yReverseTimer = new ig.Timer(1);
		this.attackTimer = new ig.Timer(2);
		this.state = 1;
		this.vel.x = this.maxVel.x;
		this.vel.y = -this.maxVel.y;
		this.xPositive = true;
		this.yPositive = false;
		this.actionsRemaining = ((this.phase+1)*30) + Math.random()*80;
	},

	// Bite quickly towards the player a bunch of times
	biteAttack: function() {

		this.tongue();

		this.maxVel.x = 200;

		if (this.childNode) {
			this.childNode.configureSpeed({x: 15, y: 10});
			// Don't use smooth following so that it can keep up easier when biting
			this.childNode.toggleSmoothAccel();
		}

		this.attackTimer = new ig.Timer(1);
		this.xReverseTimer = null;
		this.yReverseTimer = null;
		this.state = 3;
		this.actionsRemaining = ((this.phase+1)*2) + Math.random()*3;

		this.accel.x = 40;
		this.accel.y = -10;
	},

	// Go offscreen and then speed across the screen at the player
	speedAttack: function() {

		this.state = 4;

		this.maxVel.x = 180;
		this.maxVel.y = 100;

		if (this.childNode) {
			this.childNode.configureSpeed(this.maxVel);
			this.childNode.toggleSmoothAccel();
		}

		this.setupSpeedAttack();
		
	},

	// Configure the actual speed attack
	setupSpeedAttack: function() {

		// Position it midway through the room in the Y-direction
		this.pos.y = ig.game.levelHeight / 2;

		this.yReverseTimer = new ig.Timer(0.5);
		this.vel.x = 0;
		this.vel.y = 0;
		this.xPositive = this.flip;
		this.accel.x = this.maxVel.x * (this.flip ? this.accelFactor : -this.accelFactor);
		this.yPositive = (Math.random() < 0.5);
		this.accel.y = this.maxVel.y * (this.yPositive ? this.accelFactor : -this.accelFactor);
	},


	// Bite towards the player
	bite: function() {
		this.currentAnim = this.anims.bite.rewind();
		this.accel.x = 0;
		this.accel.y = 0;
		this.vel.x = -this.maxVel.x;
		this.vel.y = -20 + Math.random()*150;
		this.maxVel.y = Math.abs(this.vel.y);
		this.actionsRemaining -= 1;

		// Re-configure the rest of the parts to the new random speed
		if (this.childNode) {
			this.childNode.configureSpeed(this.maxVel);
		}
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleAnimations: function() {

		if (this.currentAnim == this.anims.shoot && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.idle;
		}

		// Go to idle after closing mouth
		if (this.currentAnim == this.anims.close && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.idle;
		}

		// If biting, reverse once the animation is complete
		if (this.currentAnim == this.anims.bite && this.currentAnim.loopCount > 0) {
			this.vel.x = -this.vel.x;
			this.vel.y = -this.vel.y;
			this.currentAnim = this.anims.idle;
			this.attackTimer = new ig.Timer(1);
			this.flipOver();
		}

		this.parent();
	},

	handleTimers: function() {

		this.parent();

		if (this.dead) {
			return;
		}

		// Check if it's time to reverse movement
		if (this.xReverseTimer != null && this.xReverseTimer.delta() > 0) {
			if (this.state == 1) {
				this.xReverseTimer.set(1.5);
			}
			this.accel.x = -this.vel.x*this.accelFactor;
		}
		if (this.yReverseTimer != null && this.yReverseTimer.delta() > 0) {
			if (this.state == 1) {
				this.yReverseTimer.set(3);
			} else if (this.state == 4) {
				this.yReverseTimer.set(1);
			}
			this.accel.y = -this.vel.y*this.accelFactor;
		}

		// Check if it's time to attack again
		if (this.attackTimer != null && this.attackTimer.delta() > 0) {

			// Shoot acid
			if (this.state == 1) {

				if (this.currentAnim == this.anims.idle) {
					this.currentAnim = this.anims.spew.rewind();
				}
				ig.game.spawnEntity( EntitySerpentacid, this.pos.x+20, this.pos.y+26, {vel: {x: -100 + Math.random()*-200, y: -50 + Math.random()*-150}} );
				this.actionsRemaining -= 1;
				if (this.actionsRemaining <= 0) {
					this.attackTimer = null;
					this.currentAnim = this.anims.close.rewind();
					this.idleTimer = new ig.Timer(3);
					this.tongueTimer = new ig.Timer(1);
				} else {
					this.attackTimer.set(0.03 + Math.random()*0.04);
				}

				// This next block shoots acid one at a time.
				// this.currentAnim = this.anims.shoot.rewind();
				// ig.game.spawnEntity( EntitySerpentacid, this.pos.x+10, this.pos.y+12, {vel: {x: -50 + Math.random()*-200, y: -50 + Math.random()*-150}} );
				// this.actionsRemaining -= 1;
				// if (this.actionsRemaining <= 0) {
				// 	this.attackTimer = null;
				// 	this.idleTimer = new ig.Timer(4);
				// 	this.tongueTimer = new ig.Timer(1);
				// } else {
				// 	this.attackTimer.set(1);
				// }
			}

			// Bite
			if (this.state == 3) {
				this.attackTimer = null;
				if (this.flip) {
					this.flipOver();
				}
				if (this.actionsRemaining <= 0) {
					if (this.childNode != null) {
						this.childNode.toggleSmoothAccel();
					}
					this.newAttack(1);
				} else {
					this.bite();
				}	
			}
		}

		// Check if it's time to stick out the tongue
		if (this.tongueTimer != null && this.tongueTimer.delta() > 0) {
			this.tongueTimer = null;
			this.tongue();
		}

		// Check if it's time to stop being idle and do something new
		if (this.idleTimer != null && this.idleTimer.delta() > 0) {
			if (this.state == 1) {
				this.idleTimer = null;
				this.newAttack(4);
			}
			if (this.state == 3) {
				this.idleTimer = null;
				this.newAttack(1);
			}
		}

	},


	// Make it stop and fall to the ground when dead
	deathCallback: function() {
		this.vel.x = 0;
		this.vel.y = 0;
		this.accel.x = 0;
		this.accel.y = 0;
		this.gravityFactor = ig.game.gravity;
		this.ignoreCollisions = false;
		this.maxVel.x = 0;
		this.maxVel.y = 300;

		this.parent();
	},
	
	draw: function() {

		// Draw the overflow for various frames
		if (this.visible) {
			var tile = null;
			if (this.currentAnim.tile == 5) {
				tile = 9;
			} else if (this.currentAnim.tile == 8) {
				tile = 12;
			}

			if (tile != null) {
				this.myImage.drawTile( this.pos.x - this.offset.x, this.pos.y + 32 - this.offset.y, tile, 64, 32 );
			}
		}

		this.parent();
	},
	
	
	myUpdate: function() {

		this.parent();

		if (this.dead || this.state == 0) {
			return;
		}

		if (this.state == 2) {

			// Check if you made it to the target position
			if (this.pos.x > this.targetPos.x - 4 && this.pos.x < this.targetPos.x + 4) {
				this.accel.x = 0;
				this.vel.x = 0;
				this.foundX = true;
			}
			if (this.pos.y > this.targetPos.y - 4 && this.pos.y < this.targetPos.y + 4) {
				this.accel.y = 0;
				this.vel.y = 0;
				this.foundY = true;
			}

			// If you've reached your destination, go to the next state
			if (this.foundX && this.foundY) {
				this.foundX = false;
				this.foundY = false;
				if (this.nextState == 1) {
					this.idleAttack();
				} else if (this.nextState == 3) {
					this.biteAttack();
				} else if (this.nextState == 4) {
					this.speedAttack();
				}
			}
		} else if (this.state == 4) {

			// Check if you're far enough offscreen to flip over and attack again
			if (this.flip && this.pos.x > ig.game.levelWidth + 150) {
				this.flipOver();
				this.setupSpeedAttack();
			} else if (!this.flip && this.pos.x < -200) {
				this.flipOver();
				this.setupSpeedAttack();
			}
		}

		// Check if it reversed direction in the last frame,
		// and if so, notify the first child so that it can transition smoothly
		if (this.xPositive && this.vel.x < 0 || !this.xPositive && this.vel.x > 0) {
			this.xPositive = !this.xPositive;
			if (this.childNode != null && !this.foundX) {
				this.childNode.xFlip(this.xPositive);
			}
		}
		if (this.yPositive && this.vel.y < 0 || !this.yPositive && this.vel.y > 0) {
			this.yPositive = !this.yPositive;
			if (this.childNode != null && !this.foundY) {
				this.childNode.yFlip(this.yPositive);
			}
		}

		this.currentAnim.flip.x = this.flip;
		
	}
});

});
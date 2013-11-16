ig.module(
	'game.entities.enemy.enemy'
)
.requires(
	'game.entities.base',
	'game.entities.item.heartitem',
	'game.entities.item.golditem'
)
.defines(function(){
	
EntityEnemy = EntityBase.extend({
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,

	redAnimSheet: null,		// Red (damage) version of the images
	isRed: false,			// When flashing red from damage
	redAnim: null,		// Which animation was turned red, so you can turn it back
	
	health: 1,
	startHealth: 1,
	speed: 24,
	flip: false,
	damage: 1,
	knockback: true,    // If they bounce back from damage
	damageFlash: false, // flash when damaged
	knockbackForce: 150, // How much force pushes them back
	killWhenDead: true, // automatically kill when health is 0 (if false, play death anim instead) 
	dead: false,
	showsPain: true,	// Use the pain animation when hit if it's available

	tempInvincible: false, // It's invincible for a short time after getting hit
	tempInvincibleTimer: null,
	flashTimer: null,
	invincible: false,		// Some enemies are completely invincible at times
	
	wallReverse: true,		// Reverse when hitting a wall
	edgeReverse: true,		// Reverse at the edge of a platform
	levelReverse: true, 	// Reverse if you're about to leave the level

	dropsItems: true, 		// Drop gold or health randomly when it dies
	heartDropPercent: 0.15, // Percentage of heart item drops
	goldDropPercent: 0.3, 	// Percentage of gold item drops
	goldDropValue: 10,		// Value of gold that this enemy drops

	dealsDamage: true,		// Determines whether the enemy deals damage to the player
	drawHealthBar: true, 	// Draw a health bar above if damaged
	healthBarWidth: 20,		// Width of health bar that gets drawn

	childNode: null,		// first node in an enemy chain, if there is one
	enemyParts: [],			// array of the various parts of this enemy, if it has any
	flashParts: false,		// If true, all enemy parts will flash when hit
	chainOrigin: {x: 0, y:0 }, // If this enemy has a chain, this is the offset from the position where the chain will originate

	healthHud: new ig.Image( 'media/sprites/EnemyHP_HUD.png' ),

	sfxReceiveHit: new ig.Sound( 'media/sounds/Enemies/EnemyGetHit.*' ),
	
	init: function( x, y, settings ) {
		this.startHealth = this.health;

		// If they flash when damage, make the red version
		if (this.damageFlash) {
			this.redAnimSheet = new ig.AnimationSheet( this.animSheet.image.path + '#ffffff', this.animSheet.width, this.animSheet.height );
		}

		this.parent( x, y, settings );
		
	},

	// The first child node registers itself as the first node if there's a chain involved
	registerChild: function( node ) {
		this.childNode = node;
	},

	// Register an enemy part in the enemy parts array, if applicable
	registerPart: function( part ) {
		this.enemyParts.push(part);
	},
	
	// Check every active timer
	handleTimers: function() {

		// Check if it's time to toggle visibility
		if (this.damageFlash && this.flashTimer != null && this.flashTimer.delta() > 0) {
			if (this.redAnim != null) {
				this.redAnim.sheet = this.animSheet;
				this.redAnim = null;
			}
			this.flashTimer = null;
		}

		// Check if you're done being temporarily invincible
		if (this.tempInvincible && this.tempInvincibleTimer.delta() > 0) {
			this.tempInvincible = false;

			// if they are in pain still, go back to the default animation
			if (this.currentAnim == this.anims.pain) {
				this.currentAnim = this.defaultAnimation();
			}
			
		}

		this.parent();
	},

	// Return a default animation to go back to
	defaultAnimation: function() {
		return this.anims.walk;
	},

	// Check on animations
	handleAnimations: function() {

		// If there's a death animation, die after it's done
		if (!this.killWhenDead) {
			if (this.currentAnim == this.anims.death && this.currentAnim.loopCount > 0) {
				this.flashKill();
			}
		}

		this.parent();
	},
	
	myUpdate: function() {
		// Near an edge? return!
		if( this.edgeReverse && this.standing && !ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? this.size.x +2 : -2),
				this.pos.y + this.size.y+1
			)
		) {
			this.flipOver();
		}

		// Check if we're about to leave the level and need to flip
		if (this.levelReverse && (this.pos.x < 8 || this.pos.x > ig.game.levelWidth - 8)) {
			this.flipOver(this.pos.x < 8);
		}
		
		this.parent();
	},

	draw: function() {

		// Draw a health bar above damaged (but not dead) enemies
		if (this.drawHealthBar) {

			if (this.health > 0 && this.health < this.startHealth){

				var offset = (this.healthBarWidth - this.size.x) / 2; 

				// background
				ig.system.context.fillStyle = "rgb(0,0,0)";
				ig.system.context.beginPath();
				ig.system.context.rect(
				                (this.pos.x - ig.game.screen.x - offset) * ig.system.scale, 
				                (this.pos.y - ig.game.screen.y - 8) * ig.system.scale, 
				                this.healthBarWidth * ig.system.scale, 
				                3 * ig.system.scale
				            );
				ig.system.context.closePath();
				ig.system.context.fill();

				// health bar
				this.healthHud.drawTile( this.pos.x - ig.game.screen.x - offset, this.pos.y - ig.game.screen.y - 8, 0, this.healthBarWidth * (this.health / this.startHealth), 3 );
			}
		}

		this.parent();
	},

	flipOver: function(direction) {
		if (direction !== undefined) {
			this.flip = direction;
		} else {
			this.flip = !this.flip;
		}
	},
	
	kill: function() {
		this.parent();
		
		if (this.dropsItems) {
			var rand = Math.random();
			if (rand < this.goldDropPercent) {
				ig.game.spawnEntity( EntityGolditem, this.pos.x + 10, this.pos.y, {dropped: true, direction: 0, value: this.goldDropValue} );
			} else if (rand < this.goldDropPercent + this.heartDropPercent) {
				ig.game.spawnEntity( EntityHeartitem, this.pos.x + 10, this.pos.y, {dropped: true, direction: 0} );
			}
		}
	},
	
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		// Collision with a wall? return!
		if( this.wallReverse && res.collision.x ) {
			this.flipOver();
		}
	},

	// This is for if you ever need to do anything else when dealing damage
	giveDamageCallback: function() {

	},
	
	check: function( other ) {
		if (!this.dead && this.dealsDamage) {
			other.receiveDamage( this.damage, this );
			this.giveDamageCallback();
		}
	},

	// This is for if you ever need to do anything when moving to the death animation
	deathCallback: function() {

	},

	// This handles the logic for dying
	die: function() {
		this.dead = true;
		this.health = 0;
		if (this.killWhenDead) {
			this.kill();
		} else {
			this.currentAnim = this.anims.death.rewind();
			this.deathCallback();
		}

		// Inform all the parts that their master is dying, if applicable
		for (var i in this.enemyParts) {
			if (!isNaN(i)) {
				this.enemyParts[i].die();
			}
		}

	},

	showDamage: function() {
		// Set temporary invincibility if not dead
		if (this.currentAnim != this.anims.death) {
			
			// Switch to the pain animation if one exists
			if (this.anims.pain && this.showsPain) {
				this.currentAnim = this.anims.pain.rewind();
			}

			if (this.tempInvincibleTimer === null) {
				this.tempInvincibleTimer = new ig.Timer(0.2);
			} else {
				this.tempInvincibleTimer.set(0.2);
			}

			if (this.damageFlash) {
				this.flashTimer = new ig.Timer(0.1);
				this.currentAnim.sheet = this.redAnimSheet;
				this.redAnim = this.currentAnim;
			}

			this.tempInvincible = true;
		}

		// Inform all the enemy parts that you've taken damage, if applicable
		for (var i in this.enemyParts) {
			if (!isNaN(i)) {
				this.enemyParts[i].showDamage();
			}
		}
	},

	// Take damage
	// Amount: How much damage you take
	// From: Entity giving damage
	// Bounceback: Multiplier for the knockback force (some attacks knock you back more than usual)
	// Direction: (optional) Direction the attack knocks you in (usually this can be figured out from "From")
	receiveDamage: function( amount, from, bounceback, direction ) {

		if( this.currentAnim == this.anims.pain || this.currentAnim == this.anims.death || this.tempInvincible || this.invincible) {
			// Already in pain, dead, or invincible? Do nothing.
			return;
		}

		this.health -= amount;
		this.sfxReceiveHit.play();

		// Check if dead
		if (this.health <= 0) {
			this.die();
		}

		// knockback if enabled
		if (this.knockback) {
			if (direction === undefined) {
				direction = from.pos.x > this.pos.x;
			}
			this.vel.x = direction ? -this.knockbackForce : this.knockbackForce;
			this.vel.x *= bounceback;
			this.vel.y = -100;
		}

		this.showDamage();
	}
});

});
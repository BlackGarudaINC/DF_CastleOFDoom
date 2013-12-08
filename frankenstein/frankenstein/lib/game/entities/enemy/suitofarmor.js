ig.module(
	'game.entities.enemy.suitofarmor'
)
.requires(
	'game.entities.enemy.enemy',
	'game.entities.enemy.enemymelee'
)
.defines(function(){
	
EntitySuitofarmor = EntityEnemy.extend({
	size: {x: 24, y: 44},
	offset: {x: 12, y: 4},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},

	edgeReverse: true,
	killWhenDead: false, // Use death animation instead of killing right away
	knockback: false,
	damageFlash: true,

	attackTimer: null, 	 // countdown to when it can attack again
	
	animSheet: new ig.AnimationSheet( 'media/sprites/SuitOfArmor.png', 48, 48 ),
	myImage: new ig.Image( 'media/sprites/SuitOfArmor.png' ),
	flashImage: new ig.Image( 'media/sprites/SuitOfArmor.png#ffffff' ),
	
	health: 15,
	damage: 2,
	speed: 10,
	attackRange: 50,
	goldDropValue: 25,
	hasAttacked: false, // whether or not the melee hit box has been generated for the current attack

	// debugDraw: true,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'walk', 0.25, [0,1,0,2] );
		this.addAnim( 'death', 0.1, [0, 9, 10, 11, 12, 13, 14, 15], true );
		this.addAnim( 'attack', 0.15, [0, 3, 4, 6, 6, 6, 6, 6, 4, 3, 0, 8], true);
		
	},

	handleTimers: function() {

		// Check if it is allowed to attack again
		if (this.attackTimer != null && this.attackTimer.delta() > 0) {
			this.attackTimer = null;
		}

		this.parent();
	},

	handleAnimations: function() {

		// Check if done attacking
		if (this.currentAnim == this.anims.attack && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.walk.rewind();
		}

		this.parent();
	},
	
	draw: function() {

		// Draw the overflow for the attack frame
		if (this.visible && this.currentAnim.tile == 6) {

			var image = this.myImage;
			if (this.flashTimer != null) {
				image = this.flashImage;
			}

			var x = this.pos.x;
			if (this.flip) {
				x = x - this.offset.x - 48;
			} else {
				x = x + 48 - this.offset.x;
			}

			image.drawTile( x - ig.game.screen.x, this.pos.y - this.offset.y - ig.game.screen.y, 5, 48, 48, !this.flip );
			image.drawTile( this.pos.x - this.offset.x - ig.game.screen.x, this.pos.y - this.offset.y - ig.game.screen.y - 48, 7, 48, 48, !this.flip );
		}

		this.parent();
	},

	// Create the hitbox for the melee attack
	meleeAttack: function() {
		var x = this.pos.x;
		if (this.flip) {
			x += this.size.x;
		} else {
			x -= 15;
		}
		ig.game.spawnEntity( EntityEnemymelee, x, this.pos.y, {size:{x:15, y:this.size.y}, damage: 4} );
		this.hasAttacked = true;
	},

	myUpdate: function() {
		
		if (!this.tempInvincible && !this.dead && this.currentAnim != this.anims.attack) {
			var xdir = this.flip ? 1 : -1;
			this.vel.x = this.speed * xdir;
		}

		// Check if it's close enough to attack
		if (this.attackTimer == null && this.currentAnim != this.anims.attack && (this.flip && this.pos.x < ig.game.player.pos.x || !this.flip && this.pos.x > ig.game.player.pos.x) && this.distanceTo(ig.game.player) < this.attackRange) {
			this.currentAnim = this.anims.attack.rewind();
			this.hasAttacked = false;
			this.attackTimer = new ig.Timer(5);
		}

		// If attacking, create the melee attack on the correct frame
		if (this.currentAnim == this.anims.attack && !this.hasAttacked && this.currentAnim.tile == 8) {
			this.meleeAttack();
		}

		this.currentAnim.flip.x = !this.flip;
		
		this.parent();
	}
});

});
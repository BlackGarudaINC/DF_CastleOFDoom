ig.module(
	'game.entities.boss.skeletonchain'
)
.requires(
	'game.entities.enemy.enemychain',
	'impact.entity'
)
.defines(function(){
	

EntitySkeletonchain = EntityEnemychain.extend({

	size: {x: 10, y: 10},
	offset: {x: 11, y: 11},

	animSheet: new ig.AnimationSheet( 'media/sprites/SkeletonGeneral.png', 32, 32 ),

	damageMaster: false,	// Hitting the chain doesn't hurt the general
	invincible: true,		// The chains feel no pain
	killWhenDead: true,
	rotates: false,
	informChildReverse: false,

	// gravityFactor: 1,

	maceBall: false,		// The end of the chain is a mace ball

	debugDraw: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Check if it's part of the chain or the mace ball at the end
		if (settings.numNodes == 0) {
			this.addAnim( 'idle', 1, [8] );
			this.maceBall = true;
			this.size.x = 24;
			this.size.y = 24;
			this.offset.x = 4;
			this.offset.y = 4;
		} else {
			this.addAnim( 'idle', 1, [9] );
		}

		this.vel.y = 0;
		this.accel.y = 0;

	},

	// The actual logic for how the ball and chain works
	followLogic: function() {
		var target = {x: 0, y: 0};
		target.x  = this.parentNode.pos.x;
		target.y  = this.parentNode.pos.y;
		if (this.parentNode == this.master) {
			target.x += this.master.chainOrigin.x;
			target.y += this.master.chainOrigin.y;
		}

		// The ball at the end needs additional offset when flipped
		if (this.maceBall && this.master.flip) {
			target.x -= 12; 
		}

		// The y pos is just the target plus the offset to account for gravity
		this.pos.y = target.y + this.highRange.y;

		// Check if the master is attacking or idle
		var attacking = (this.master.currentAnim == this.master.anims.attack);

		// Follow the target without using any kinds of physics if not currently attacking
		if (!attacking) {
			this.vel.x = 0;
			this.accel.x = 0;

			// The x pos is the target plus the offset in the direction the master is facing
			this.pos.x = target.x + (this.master.flip ? this.lowRange.x : this.highRange.x);



		} else {



		// 	// Check if the x pos is out of range
		// 	// First, we check if there is supposed to be any movement in the X-direction.
		// 	// If there is no x-range, we check if the velocity is 0 in the x-direction.
		// 	// If it's not, then something knocked it out of place so it's trying to move back into place.
		// 	// Once it gets close to the position it's supposed to be in, we put it in that position and turn off
		// 	// the x velocity.
		// 	if (this.highRange.x == this.lowRange.x && this.vel.x != 0 && this.pos.x > target.x + this.highRange.x - 4 && this.pos.x < target.x + this.highRange.x + 4) {
		// 		this.vel.x = 0;
		// 		this.accel.x = 0;
		// 		this.pos.x = target.x + this.highRange.x;
		// 		this.behindLeft = false;
		// 		this.behindRight = false;
		// 	}
		// 	// If, as far as we know, the object isn't out of range to the left of where it should be,
		// 	// we check to see if it is now behind and to the left.
		// 	// However, if we already know it's behind to the left, we don't bother checking again since
		// 	// all of the proper variables are already set here.
		// 	if (!this.behindLeft) {
		// 		if (target.x + this.lowRange.x > this.pos.x + 0.5) {
		// 			this.accel.x = this.maxVel.x * 20;
		// 			if (!this.smoothAccel.x) {
		// 				this.vel.x = this.maxVel.x;
		// 			}
		// 			this.behindLeft = true;
		// 			this.behindRight = false;
		// 		}
		// 	} 
		// 	// Now we do the same check but to the right.
		// 	if (!this.behindRight) {
		// 		if (target.x + this.highRange.x < this.pos.x - 0.5) {
		// 			this.accel.x = -this.maxVel.x * 20;
		// 			if (!this.smoothAccel.x) {
		// 				this.vel.x = -this.maxVel.x;
		// 			}
		// 			this.behindRight = true;
		// 			this.behindLeft = false;
		// 		}
		// 	}

		// 	// Now check the y pos in the same way we checked X.
		// 	if (this.highRange.y == this.lowRange.y && this.vel.y != 0 && this.pos.y > target.y + this.highRange.y - 4 && this.pos.y < target.y + this.highRange.y + 4) {
		// 		this.vel.y = 0;
		// 		this.accel.y = 0;
		// 		this.pos.y = target.y + this.highRange.y;
		// 		this.behindAbove = false;
		// 		this.behindBelow = false;
		// 	} 
		// 	if (!this.behindAbove) {
		// 		if (target.y + this.lowRange.y > this.pos.y + 0.5) {
		// 			this.accel.y = this.maxVel.y * 20;
		// 			if (!this.smoothAccel.y) {
		// 				this.vel.y = this.maxVel.y;
		// 			}
		// 			this.behindAbove = true;
		// 			this.behindBelow = false;
		// 		} 
		// 	}
		// 	if (!this.behindBelow) {
		// 		if (target.y + this.highRange.y < this.pos.y - 0.5) {
		// 			this.accel.y = -this.maxVel.y * 20;
		// 			if (!this.smoothAccel.y) {
		// 				this.vel.y = -this.maxVel.y;
		// 			}
		// 			this.behindBelow = true;
		// 			this.behindAbove = false;
		// 		}
		// 	}

		}
	}
	
});

});
ig.module(
	'game.entities.boss.skeletonarm'
)
.requires(
	'game.entities.enemy.enemypart',
	'game.entities.boss.skeletonchain'
)
.defines(function(){
	

EntitySkeletonarm = EntityEnemypart.extend({

	size: {x: 16, y: 44},
	offset: {x: 4, y: 4},

	animSheet: new ig.AnimationSheet( 'media/sprites/SkeletonGeneral.png', 32, 64 ),
	myImage: new ig.Image( 'media/sprites/SkeletonGeneral.png' ),

	damageMaster: true,
	damageMultiplier: 1,
	invincible: true,
	killWhenDead: true,
	gravityFactor: 0,

	chainOrigin: {x: 6, y: -16},	// Where the root of the chain starts from, relative to the arm's position

	// debugDraw: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [5] );
		this.addAnim( 'attack', 0.1, [5, 4, 3, 3, 3, 3, 3, 4] );

		this.zIndex = this.master.zIndex - 1;

		// Let the body know that this is the arm
		this.master.registerArm(this);

		if (ig.system.running) {
			// Spawn the chain parts
			ig.game.spawnEntity( EntitySkeletonchain, this.pos.x, this.pos.y, {master: this, parentNode: this, numNodes: 9, nodeEntity: EntitySkeletonchain, initOffset: {x: 2, y: 2}} );
		}
	},

	startUpdate: function() {
		this.parent();

		// Configure the chain
		if (this.childNode) {
			this.childNode.configure({ lowRange: {x: -4, y: -4}, highRange: {x: 4, y: 4}, maxVel: {x: this.master.speed, y: 0} });
		}
	},

	defaultAnimation: function() {
		return this.anims.idle;
	},

	handleAnimations: function() {

		// After laughing a few times, stop
		if (this.currentAnim == this.anims.attack && this.currentAnim.loopCount > 0) {
			this.currentAnim = this.anims.idle;
		}

		this.parent();
	},

	// Play the attack animation
	attack: function() {
		this.currentAnim = this.anims.attack.rewind();
	},

	myUpdate: function () {
		this.flip = this.master.flip;

		this.pos.x = this.master.pos.x + (this.flip ? 38 : -24);
		this.pos.y = this.master.pos.y - 22;

		this.currentAnim.flip.x = this.flip;
		this.offset.x = (this.flip ? 12 : 4);
		this.chainOrigin.x = (this.flip ? 1 : 6);

		// Change the chain origin's x-position if the arm is moving from an attack
		if (this.currentAnim.tile == 4) {
			this.chainOrigin.x += (this.flip ? 4 : -4);
		} else if (this.currentAnim.tile == 3) {
			this.chainOrigin.x += (this.flip ? 8 : -8);
		}

		this.parent();
	},

	draw: function () {
		this.parent();

		if (this.visible) {
			// Draw the first chain of the mace
			this.myImage.drawTile(this.pos.x + this.chainOrigin.x - ig.game.screen.x - 11, this.pos.y + this.chainOrigin.y - ig.game.screen.y - 8, 9, 32, 32);
		}

	}
	
	
});

});
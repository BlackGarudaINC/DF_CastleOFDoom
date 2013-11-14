ig.module(
	'game.entities.level.monstercloset'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy',
	'game.entities.enemy.zombie',
	'game.entities.enemy.zombiewalker',
	'game.entities.enemy.gravewraith',
	'game.entities.enemy.phantasm',
	'game.entities.enemy.mummy',
	'game.entities.enemy.skeleton',
	'game.entities.enemy.skeletonpower',
	'game.entities.enemy.spidereye'
)
.defines(function(){
	
// Normal chests have standard items, defined in weltmeister.
EntityMonstercloset = EntityEnemy.extend({

	size: {x: 16, y: 32},
	offset: {x: 0, y: 0},

	awake: false,
	knockback: false,
	damageFlash: true,
	dropsItems: false,
	dealsDamage: false,
	drawHealthBar: false,
	killWhenDead: false,

	zIndex: -10,

	health: 8,

	doorType: 0,
	spawnTimer: null,
	frequency: 1,
	monster: 'Zombie',
	minBossDefeated: 0,
	maxBossDefeated: 99,

	animSheet: new ig.AnimationSheet( 'media/sprites/ClosetDoors.png', 16, 32 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [this.doorType] );
		this.addAnim( 'open', 0.1, [this.doorType, this.doorType + 1, this.doorType + 2, this.doorType + 2, this.doorType + 1, this.doorType], true );
		this.addAnim( 'death', 1, [this.doorType + 3], true );

		if( ig.game.oneTimeEvents.bosses.length < this.minBossDefeated || ig.game.oneTimeEvents.bosses.length > this.maxBossDefeated ){
			this.kill();
		}
	},

	startUpdate: function() {
		// Get the proper entity name for the monster to spawn
		this.monster = 'Entity' + this.monster;

		// Figure out the name
		this.name = ig.game.currentLevelName + this.monster;

	},

	// Spawn the item set in weltmeister
	spawnMonster: function() {
		ig.game.spawnEntity( this.monster, this.pos.x, this.pos.y );
	},

	handleTimers: function() {
		
		// Check if it's time to attack again
		if (this.awake && this.spawnTimer.delta() > 0 && this.currentAnim != this.anims.open) {
			this.currentAnim = this.anims.open.rewind();
			
			this.spawnTimer.reset();
		}

		this.parent();
	},

	handleAnimations: function() {
		
		// Check if done opening
		if (this.currentAnim == this.anims.open && this.currentAnim.loopCount > 0) {
			this.spawnMonster();
			this.currentAnim = this.anims.idle;
		}

		this.parent();
	},

	myUpdate: function() {

		// If not awake yet, check if close enough to start waking up
		if (!this.awake && this.distanceTo(ig.game.player) < 100) {
			this.awake = true;
			this.spawnTimer = new ig.Timer( this.frequency );

		}

		this.parent();
	},

	die: function() {
		this.parent();

		this.spawnTimer.pause();
	}

});

});
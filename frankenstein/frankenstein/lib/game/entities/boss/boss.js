ig.module(
	'game.entities.boss.boss'
)
.requires(
	'game.entities.base',
	'game.entities.enemy.enemy',
	'game.entities.item.heartitem',
	'game.entities.item.golditem',
	'game.entities.level.eventdoor'
)
.defines(function(){
	
EntityBoss = EntityEnemy.extend({
	
	health: 100,
	speed: 26,

	killWhenDead: false, 	// automatically kill when health is 0 (if false, play death anim instead) 
	
	edgeReverse: false,		// Reverse at the edge of a platform

	dropsItems: false, 		// Special item drop for bosses
	goldDropValue: 100,		// Value of gold that this enemy drops

	drawHealthBar: false, 	// Bosses have a special health bar at the top of the screen
	
	phase: 0, 				// Bosses have multiple attack phases at every 25% mark of their health

	alreadyDead: false,		// If you revisit a room with a defeated boss, it's already dead
	waitToStart: false,		// If the boss is waiting for a cutscene before starting

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.quarterHealth = this.startHealth / 4;

		if (ig.system.running) {
			// Check if this boss was already defeated
			if (ig.game.oneTimeEvents.bosses.indexOf(ig.game.currentLevelName) != -1) {
				this.alreadyDead = true;
			}
		}
	},

	startUpdate: function() {

		// If you're already dead, this is the time to kill yourself
		if (this.alreadyDead) {
			this.kill();
		}

		// Check if you're in a cutscene or if you can just start battling
		if (!ig.game.cutsceneRunning) {
			this.startBattle();
		} else {
			this.waitToStart = true;
		}
	},

	// When the boss actually starts doing things (this could be delayed if there's a cutscene)
	startBattle: function() {

	},

	draw: function() {

		// Draw the boss health bar
		if (ig.system.running){
			ig.system.context.fillStyle = "rgb(0,0,0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
			                (ig.system.width/2 - 60) * ig.system.scale, 
			                2 * ig.system.scale, 
			                120 * ig.system.scale, 
			                10 * ig.system.scale
			            );
			ig.system.context.closePath();
			ig.system.context.fill();

			// health bar
			ig.system.context.fillStyle = "rgb(255,0,0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
			                (ig.system.width/2 - 58) * ig.system.scale,  
			                4 * ig.system.scale, 
			                (116 * (this.health / this.startHealth)) * ig.system.scale, 
			                6 * ig.system.scale
			            );
			ig.system.context.closePath();
			ig.system.context.fill();
		}


		this.parent();
	},

	myUpdate: function() {

		// If you're waiting for a cutscene, check if it's over yet
		if (this.waitToStart && !ig.game.cutsceneRunning) {
			this.waitToStart = false;
			this.startBattle();
		}

		// Check if you're entering a new phase of battle
		switch(this.phase) {
		case 0:
			if (this.health < 3*this.quarterHealth) { this.phase = 1; }
			break;
		case 1:
			if (this.health < 2*this.quarterHealth) { this.phase = 2; }
			break;
		case 2:
			if (this.health < this.quarterHealth) { this.phase = 3; }
			break;
		}

		this.parent();
	},
	
	kill: function() {
		this.parent();

		// If it wasn't already defeated
		if (!this.alreadyDead) {

			// Drop money and a lot of hearts
			ig.game.spawnEntity( EntityGolditem, this.pos.x + 10, this.pos.y, {dropped: true, direction: 0, value: this.goldDropValue} );
			for (var xoffset = -10; xoffset <= 50; xoffset += 10) {
				ig.game.spawnEntity( EntityHeartitem, this.pos.x + xoffset, this.pos.y, {dropped: true, direction: 0} );
			}

			// Mark this room as having a defeated boss
			ig.game.oneTimeEvents.bosses.push(ig.game.currentLevelName);

			// Reset the silver treasure chests so you can find new spoils
			ig.game.resetSilverChests();
		}

		// Open all event doors in the room with a delayed open
		var doors = ig.game.getEntitiesByType(EntityEventdoor);
		for (var i in doors) {
			if (!isNaN(i)) {
				if (this.alreadyDead) {
					doors[i].open();
				} else {
					doors[i].delayedOpen();
				}
			}
		}
		
	}
});

});
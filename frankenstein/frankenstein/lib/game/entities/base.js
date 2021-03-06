ig.module(
	'game.entities.base'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityBase = ig.Entity.extend({
	
	debugDraw: false, 		// Draw various debug things for this entity
	visible: true,			// Whether or not this is visible
	flashKillTimer: null, 	// If flashing before killing, this is the timer
	flashKillCount: 0, 		// Number of times this flashed so far for the flash kill
	instantDeath: false, 	// Flash before disappearing by default (if true, you disappear on death without flashing)
	ignorePhysics: false,	// True if the object just floats there
	ignoreCollisions: false,// True if we want to go through solid walls
	originalSize: {x:0, y:0},
	originalOffset: {x:0, y:0},
	tileImage: false,		// Whether or not to repeat the current image for the entire height/width

	firstLoop: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.originalSize.x = this.size.x;
		this.originalSize.y = this.size.y;
		this.originalOffset.x = this.offset.x;
		this.originalOffset.y = this.offset.y;
	},
	
	// Check every active timer
	handleTimers: function() {

		// Toggle visibility frequently before killing for a flash kill
		if (this.flashKillTimer != null && this.flashKillTimer.delta() > 0) {
			this.visible = !this.visible;
			this.flashKillTimer.set(0.05);
			this.flashKillCount++;
			if (this.flashKillCount > 20) {
				this.kill();
			}
		}
	},


	// Check on animations
	handleAnimations: function() {

	},

	handleMovementTrace: function( res ) {
		if (this.ignoreCollisions) {
		    // This completely ignores the trace result (res) and always
		    // moves the entity according to its velocity
		    this.pos.x += this.vel.x * ig.system.tick;
		    this.pos.y += this.vel.y * ig.system.tick;
		} else {
			this.parent(res);
		}
	},

	// Called after init, on the first update loop
	startUpdate: function() {

		// Make sure all the z-indexes line up right for everything that was spawned
		ig.game.sortEntitiesDeferred(); 
		
	},

	// Update function to override in children
	myUpdate: function() {

		this.handleAnimations();
		this.handleTimers();
	},
	
	// DO NOT OVERRIDE THIS FUNCTION
	// Override myUpdate to add anything to the update function.
	// Otherwise, pausing will break.
	update: function() {
		
		// Don't do anything if the game is paused
		if (!ig.game.paused) {
			if (this.firstLoop) {
				this.startUpdate();
				this.firstLoop = false;
			}
			this.myUpdate();
			if (!this.ignorePhysics) {
				this.parent();
			} else if( this.currentAnim ) {
				this.currentAnim.update();
			}
		}
	},

	draw: function() {

		// Draw edges around entity
		if (this.debugDraw) {
			ig.system.context.fillStyle = "rgb(255,255,0)";
			ig.system.context.beginPath();
			ig.system.context.rect(
			                (this.pos.x - ig.game.screen.x) * ig.system.scale, 
			                (this.pos.y - ig.game.screen.y) * ig.system.scale, 
			                this.size.x * ig.system.scale, 
			                this.size.y * ig.system.scale
			            );
			ig.system.context.closePath();
			ig.system.context.fill();
		}

		if (this.tileImage && this.visible) {
			if (this.size.y > this.animSheet.height) {
				var remaining = this.size.y;
				var offset = 0;
				while (remaining > 0) {
					this.drawHorizontalTiles(offset);
					remaining -= this.animSheet.height;
					offset += this.animSheet.height;
				}
			} else {
				this.drawHorizontalTiles(0);
			}
			
		}

		if (this.visible) {
			this.parent();
		}
	},

	// Draw a row of horizontal tiles
	drawHorizontalTiles: function( yoffset ) {
		var remaining = this.size.x;
		var offset = 0;
		while (remaining > 0) {
			this.currentAnim.draw(
				this.pos.x - this.offset.x - ig.game._rscreen.x + offset,
				this.pos.y - this.offset.y - ig.game._rscreen.y + yoffset
			);
			remaining -= this.animSheet.width;
			offset += this.animSheet.width;
		}
	},

	// Override if this entity has special properties when an electric item becomes energized
	// first is true if this is the first time it becomes energized and false otherwise
	electrify: function(first) {

	},

	// Use this to kill an entity after flashing a few times rather than instantly disappearing
	flashKill: function() {
		if (this.instantDeath) {
			this.kill();
		} else if (this.flashKillTimer == null) {
			this.flashKillTimer = new ig.Timer(0.05);
		}
	},
	
	kill: function() {
		this.parent();	
	}


});

});
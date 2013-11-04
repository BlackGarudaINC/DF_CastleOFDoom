ig.module(
	'game.entities.npc.npc'
)
.requires(
	'impact.entity',
	'game.entities.base'
)
.defines(function(){
	
EntityNpc = EntityBase.extend({
	size: {x: 20, y: 24},
	offset: {x: 6, y: 8},
	maxVel: {x: 0, y: 0},

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A, // Check against player
	collides: ig.Entity.COLLIDES.PASSIVE,

	resetTimer: null, 		// time before the npc can be triggered again
	dialogFlashTimer: null, // dialog flashes gold/white when selected
	dialogFlashGold: true, 	// whether or not the flashing dialog is currently gold or white
	active: false, 			// an npc becomes active once the player interacts with them
	activatePlayerTimer: null, // Minor delay in making the player active again just so the button you press for "ok" doesn't do anything else
	choice: 0, 				// which choice the user selects on the given screen

	zIndex: 110,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.8, [0,1] );
	},

	myUpdate: function() {
		
		// Flip to look at the player
		this.flip = (ig.game.player.pos.x > this.pos.x);

		this.currentAnim.flip.x = !this.flip;
		
		if (this.active) {
			this.handleInput();
		}

		this.parent();
	},

	handleTimers: function() {
		if (this.resetTimer != null && this.resetTimer.delta() > 0) {
			this.resetTimer = null;
		}

		if (this.activatePlayerTimer != null && this.activatePlayerTimer.delta() > 0) {
			this.activatePlayerTimer = null;
			ig.game.player.enableInput = true;
		}

		if (this.dialogFlashTimer != null && this.dialogFlashTimer.delta() > 0) {
			this.dialogFlashGold = !this.dialogFlashGold;
			if (this.dialogFlashGold) {
				this.dialogFlashTimer.set(0.8);
			} else {
				this.dialogFlashTimer.set(0.2);
			}
		}

		this.parent();
	},

	// Returns true if the user pressed any button that counts as an OK/enter button
	ok: function() {
		return (ig.input.pressed('attack') || ig.input.pressed('shoot') || ig.input.pressed('pause'));
	},

	// Go through choices via the arrow keys, based on how many choices are in each row
	arrowInput: function(choiceArr) {

		// Left / Right always go to the next choice
		if (ig.input.pressed('left')) {
			this.choice--;
		} else if (ig.input.pressed('right')) {
			this.choice++;
		}

		// Calculate which row you're currently in, based on the array passed in
		var row = 0;
		var total = 0;
		for (var c in choiceArr) {
			total += choiceArr[c];
			// If this row contains the current choice
			if (total > this.choice) {
				total -= choiceArr[c];
				break;
			}
			row++;
		}

		// Find your position in the row
		var rowPos = this.choice - total;

		// Up arrow  - go to the previous row
		if (ig.input.pressed('up')) {
			
			// If you're in the first row, just go to the previous entry
			if (row == 0) {
				this.choice--;
			} else { 
				// Go to the same position in the prev row if it's available in the prev row
				if (choiceArr[row-1] >= rowPos) {
					this.choice -= choiceArr[row-1];
				} else {
					this.choice = total - 1;
				}
			}

		} else if (ig.input.pressed('down')) { // go to the next row

			// If you're in the last row, just go to the next entry
			if (row == choiceArr.length - 1) {
				this.choice++;
			} else { 
				// Go to the same position in the next row if it's available in the new row
				if (choiceArr[row+1] >= rowPos) {
					this.choice += choiceArr[row];
				} else {
					this.choice = total + choiceArr[row] + choiceArr[row + 1] - 1;
				}
			}
		}
	},

	// Keep the choice in the correct range
	clampChoice: function( numChoices ) {
		if (this.choice < 0) {
			this.choice = 0;
		} else if (this.choice >= numChoices) {
			this.choice = numChoices - 1;
		}
	},

	// Get the correct font, based on which choice you're looking at and which is selected
	getFont: function( myChoice ) {
		if (this.choice == myChoice && this.dialogFlashGold) {
			return ig.game.goldFont;
		}

		return ig.game.whiteFont;
	},

	handleInput: function() {

		// Always leave if you hit escape
		if (this.active && ig.input.pressed('escape')) {
			this.leave();
		}
	},

	// Start flashing whatever is selected in the dialog
	startDialogFlash: function() {
		if (this.dialogFlashTimer == null) {
			this.dialogFlashTimer = new ig.Timer(0.8);
		} else {
			this.dialogFlashTimer.set(0.8);
		}
	},

	// Called when colliding with the player
	interact: function() {
		ig.game.player.enableInput = false;
		this.choice = 0;
	},

	// Called when the player is done interacting with the npc
	leave: function() {
		this.resetTimer = new ig.Timer(5);
		this.active = false;
		this.activatePlayerTimer = new ig.Timer(0.05);
		this.currentAnim = this.anims.idle;
	},

	check: function( other ) {
		// The instanceof should always be true, since the player is
		// the only entity with TYPE.A - and we only check against A.
		if(other instanceof EntityPlayer && this.resetTimer == null && !this.active) {
			this.interact();
			this.active = true;
		}
	}
});

});
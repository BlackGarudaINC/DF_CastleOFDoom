ig.module(
	'game.entities.npc.igor'
)
.requires(
	'impact.entity',
	'game.entities.item.item',
	'game.entities.npc.npc'
)
.defines(function(){
	
EntityIgor = EntityNpc.extend({
	size: {x: 20, y: 24},
	offset: {x: 6, y: 8},
	
	animSheet: new ig.AnimationSheet( 'media/sprites/Igor_Sprites.png', 32, 32 ),
	shopImage: new ig.Image( 'media/sprites/ShopUI.png' ),
	curserImage: new ig.Image( 'media/sprites/ShopCurser.png' ),

	storePurchase: new ig.Sound( 'media/sounds/Store/Purchase.*' ),

	// The various states of Igor's dialog
	// 0: Save / Shop / Cancel
	// 1: Leave
	// 2: Post-save menu
	// 3: Shop
	// 4: Thank after shopping
	dialogState: 0,

	// Index of the random goodbye message
	randomMessage: -1,

	buyMessage: "",		// Message displayed when buying things
	needMoreMoneyToggle: true, // Switches between two "not enough cash" messages
	shopSize: 0,		// Number of items in the shop, depending on what is set in weltmeister
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'talk', 0.4, [2,3] );

		if (ig.system.running) {
			// Turn the item names into entity names and find out how many are in the shop
			for (var i=1; i<=6; i++) {
				if (i in this.item) {
					this.item[i] = 'Entity' + this.item[i] + 'item';
					this.shopSize += 1;
				}
			}
		}
	},


	handleInput: function() {
		this.parent();

		// What do you want to do
		if (this.dialogState == 0) {

			// Allow any arrows to make a selection, with 3 possible choices
			this.arrowInput([2, 1]);
			this.clampChoice(3);

			if (this.ok()) {
				switch (this.choice) {
				case 0: // Save
					ig.game.save();
					this.dialogState = 2;
					this.choice = 1;
					break;
				case 1: // Shop
					this.startShopping();
					break;
				default: // Cancel
					this.dialogState = 1;
					break;
				}
			}			

		} else if (this.dialogState == 2) { // Post-save
			this.arrowInput([2]);
			this.clampChoice(2);

			if (this.ok()) {
				switch (this.choice) {
				case 0: // Shop
					this.startShopping();
					break;
				default: // Leave
					this.dialogState = 1;
					break;
				}
			}
			
		} else if (this.dialogState == 3) { // Shop
			if (this.shopSize <= 3) {
				this.arrowInput([1, this.shopSize]);
			} else {
				this.arrowInput([1, 3, this.shopSize - 3]);
			}
			this.clampChoice(this.shopSize + 1);

			if (this.ok()) {
				if (this.choice > 0 && this.choice <= this.shopSize) { // Buy something
					this.buyItem(this.choice);
				} else { // Leave
					this.stopShopping();
					this.dialogState = 1;
				}
			}
			
		} else if (this.dialogState == 1 || this.dialogState == 4) { // Leave
			if (this.ok()) {
				this.leave();
			}
		} 
	},

	// Attempt to buy an item
	buyItem: function( item ) {

		// Make sure you can afford it
		if (this.cost[item] > ig.game.playerState.gold) {
			if (this.needMoreMoneyToggle) {
				this.buyMessage = "You'll need more gold for that.";
			} else {
				this.buyMessage = "Not enough gold!";
			}
			this.needMoreMoneyToggle = !this.needMoreMoneyToggle;
		} else {

			// Play buy sound
			this.storePurchase.play();

			// Buy the item
			ig.game.playerState.gold -= this.cost[item];
			this.dialogState = 4;
			this.stopShopping();
			var xoffset = (this.flip ? -20 : 40);
			ig.game.spawnEntity( this.item[item], this.pos.x + xoffset, this.pos.y - 10, {} );
		}
	},

	// Setup the store
	startShopping: function() {
		this.dialogState = 3;
		this.choice = 0; // Default to buying nothing to prevent accidental buys
		this.buyMessage = "What are you buying?";

		// Create the various items for sale in "store mode"
		var xoffset = 0;
		var yoffset = 90;
		for (var i=1; i<=this.shopSize; i++) {
			ig.game.spawnEntity( this.item[i], 30 + xoffset, yoffset, {inStore: true} );
			xoffset += 60;
			if (i == 3) {
				xoffset = 0;
				yoffset += 60;
			}
		}
	},

	// Tear down the store
	stopShopping: function() {
		// Destroy all store items
		var items = ig.game.getEntitiesByType(EntityItem);
		for (var i in items) {
			if (!isNaN(i)) {
				items[i].storeDestroy();
			}
		}
	},

	// Handle interaction with the player
	interact: function() {
		this.parent();

		// Reset the dialog
		this.dialogState = 0;
		this.startDialogFlash();
		this.currentAnim = this.anims.talk;
		this.randomMessage = -1;
	},

	// Get a random goodbye message
	goodbyeDialog: function() {
		if (this.randomMessage == -1) {
			this.randomMessage = Math.random();
		}

		if (this.randomMessage < 0.15) {
			return "At least try not to die again.";
		} else if (this.randomMessage < 0.3) {
			return "That's it? OK, fine.";
		} else if (this.randomMessage < 0.45) {
			return "I'll be here if you need me. Forever.";
		} else if (this.randomMessage < 0.6) {
			return "I miss you already.";
		} else if (this.randomMessage < 0.75) {
			return "Please don't leave, I'm so lonely.";
		} else {
			return "Whatever.";
		}
	},

	draw: function() {
		this.parent();

		if (this.active) {

			// Draw the dialog depending on the current dialog state
			if (this.dialogState == 0) {
				ig.game.whiteFont.draw("What do you want?", ig.system.width/2, ig.system.height/2-40, ig.Font.ALIGN.CENTER);

				this.getFont(0).draw("Save", ig.system.width/2 - 60, ig.system.height/2, ig.Font.ALIGN.CENTER);
				this.getFont(1).draw("Shop", ig.system.width/2 + 60, ig.system.height/2, ig.Font.ALIGN.CENTER);
				this.getFont(2).draw("Nothing", ig.system.width/2, ig.system.height/2 + 40, ig.Font.ALIGN.CENTER);
			} else if (this.dialogState == 1) {
				ig.game.whiteFont.draw(this.goodbyeDialog(), ig.system.width/2, ig.system.height/2-40, ig.Font.ALIGN.CENTER);
			} else if (this.dialogState == 2) {
				ig.game.whiteFont.draw("Done. Want to buy something?", ig.system.width/2, ig.system.height/2-40, ig.Font.ALIGN.CENTER);

				this.getFont(0).draw("Yes", ig.system.width/2 - 60, ig.system.height/2, ig.Font.ALIGN.CENTER);
				this.getFont(1).draw("No", ig.system.width/2 + 60, ig.system.height/2, ig.Font.ALIGN.CENTER);
			} else if (this.dialogState == 3) { // shop
				this.shopImage.drawTile( 0, 0, 0, 320, 240 );

				ig.game.whiteFont.draw(this.buyMessage, 10, 18, ig.Font.ALIGN.LEFT);

				this.getFont(0).draw("Leave Shop", 10, 45, ig.Font.ALIGN.LEFT);

				var xoffset = 0;
				var yoffset = 114;
				for (var i=1; i<=this.shopSize; i++) {
					this.getFont(i).draw(this.cost[i] + '$', 26 + xoffset, yoffset, ig.Font.ALIGN.LEFT);
					xoffset += 60;
					if (i == 3) {
						xoffset = 0;
						yoffset += 60;
					}
				}

				// Draw the cursor if necessary
				if (this.choice > 0 && this.choice <= 3) {
					this.curserImage.drawTile( this.choice*60 - 34, 86, 0, 24, 24 );
				} else if (this.choice > 3 && this.choice <= 6) {
					this.curserImage.drawTile( (this.choice-3)*60 - 34, 146, 0, 24, 24 );
				}

				
			} else if (this.dialogState == 4) {
				ig.game.whiteFont.draw("Enjoy...whatever this is.", ig.system.width/2, ig.system.height/2-40, ig.Font.ALIGN.CENTER);
			}


		}
	}


});

});
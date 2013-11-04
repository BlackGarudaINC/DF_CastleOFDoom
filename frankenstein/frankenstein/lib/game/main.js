ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'plugins.camera',
	'plugins.touch-button',
	'plugins.impact-splash-loader',
	
	'game.entities.player.player',

	'game.levels.title',
	'game.levels.test',
	'game.levels.test2',
	'game.levels.testsave',
	'game.levels.testbosssmall',
	'game.levels.testboss'
)
.defines(function(){
	

// Our Main Game class. This will load levels, host all entities and
// run the game.

MyGame = ig.Game.extend({
	
	clearColor: "#d0f4f7",
	gravity: 800, // All entities are affected by this
	
	// Load the fonts
	goldFont: new ig.Font( 'media/sprites/GothicFont_GoldMetal_Size_16.png' ),
	whiteFont: new ig.Font( 'media/sprites/GothicFont_White_Size_16.png' ),

	// HUD icons
	// heartFull: new ig.Image( 'media/heart-full.png' ),
	// heartEmpty: new ig.Image( 'media/heart-empty.png' ),
	// coinIcon: new ig.Image( 'media/coin.png' ),
	
	// Player vars that are global across levels
	playerState: {
		meleeWeapon: 4,
		throwWeapon: 1,
		maxHealth: 6,
		health: 6,
		maxStamina: 60, // Keep as a multiple of 16 plus 12 for drawing
		stamina: 60,
		gold: 20,
		doubleJump: true,
		run: true
	},

	/* Weapon indexes:
     * Melee:
     * 1: Club
     * 2: Pitchfork
     * 3: Ball and Chain
     * 4: Scythe
     * 5: Hammer
     *
     * Throw:
     * 1: Hatchet
     * 2: Stone
     * 3: Acid
     * 4: Bomb
	 */

	// Which treasure chests have been open, and other global treasure information
	treasure: {
		silverGroup: 1, // Current group of silver chests available
		silverOpen: []
	},

	// Permanent one-time events
	oneTimeEvents: {
		bosses: []		// Room names of defeated bosses
	},

	// Default save slot
	currentSaveSlot: '1',

	// Calculate Pi stuff upfront to save on the overhead
	HALFPI: Math.PI / 2,
	TWOPI: Math.PI * 2,

	paused: false, // Whether or not the game is currently paused

	// Where to spawn when going from one room to another
	spawnLoc: null, 
	
	init: function() {
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.S, 'down' );
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.I, 'jump' );
		ig.input.bind( ig.KEY.Y, 'shoot' );
		ig.input.bind( ig.KEY.U, 'attack');
		ig.input.bind( ig.KEY.Z, 'shoot' );
		ig.input.bind( ig.KEY.X, 'attack');
		ig.input.bind( ig.KEY.SPACE, 'jump');
		ig.input.bind( ig.KEY.SHIFT, 'jump');
		ig.input.bind( ig.KEY.ENTER, 'pause');
		ig.input.bind( ig.KEY.ESC, 'escape');

		// Load up the music
		ig.music.volume = 0.5;
		ig.music.loop = true;
		ig.music.add( 'media/music/Castle01.*', 'Castle01' );
		// ig.music.play();

		// Put this back in to clear save data upfront for testing
		// localStorage.clear();

		// We want the font's chars to slightly touch each other,
		// so set the letter spacing to -2px.
		// this.font.letterSpacing = -2;		
		
		// Load the first level
		this.currentLevelName = 'Test';
		this.loadLevel( LevelTest );

		// Reset the silver chests
		this.resetSilverChests();

		// If we have no default save data, save the game now
		if (localStorage['DFCOD.' + this.currentSaveSlot] === undefined) {
			this.save();
		}
	},

	loadLevel: function( data ) {
		// Remember the currently loaded level, so we can reload when
		// the player dies.
		this.currentLevel = data;

		// Call the parent implemenation; this creates the background
		// maps and entities.
		this.parent( data );
		
		this.setupCamera();

		// Calculate this level's size
		var myMap = ig.game.backgroundMaps[1];
		var tilesize = myMap.tilesize;
		this.levelWidth  = myMap.width * tilesize;
		this.levelHeight = myMap.height * tilesize;
	},

	// Randomly select a new group of silver chests and close them
	resetSilverChests: function() {
		this.treasure.silverGroup = Math.floor((Math.random() * 4) + 1)
		this.treasure.silverOpen = [];
	},

	// Save the game into the given save slot
	// Save slots are simply strings of integers, i.e. '1'
	// For simplicity, we'll just say the game supports 3 save slots.
	save: function( slot ) {
		if (slot === undefined) {
			slot = this.currentSaveSlot;
		}
		var saveData = this.prepareSaveData();
		localStorage['DFCOD.' + slot] = saveData;
	},

	// Puts everything that needs to be saved into a giant string-ified block
	prepareSaveData: function() {
		var saveData = {
			playerState: this.playerState,
			level: this.currentLevelName,
			treasure: this.treasure,
			oneTimeEvents: this.oneTimeEvents
		};
		return JSON.stringify(saveData);
	},

	// Load the data from the given save slot
	load: function( slot ) {
		if (slot === undefined) {
			slot = this.currentSaveSlot;
		}
		this.loadSaveData(localStorage['DFCOD.' + slot]);
	},

	// Puts everything from some string-ified save data back into game variables
	loadSaveData: function( data ) {
		parsedData = JSON.parse(data);
		this.playerState = parsedData.playerState;
		this.currentLevelName = parsedData.level;
		this.treasure = parsedData.treasure;
		this.oneTimeEvents = parsedData.oneTimeEvents;

		// Load the level where the player saved
		this.loadLevelDeferred( ig.global['Level' + this.currentLevelName] );
	},
	
	setupCamera: function() {
		// Set up the camera. The camera's center is at a third of the screen
		// size, i.e. somewhat shift left and up. Damping is set to 3px.		
		this.camera = new ig.Camera( ig.system.width/2, ig.system.height/3, 3 );
		
		// The camera's trap (the deadzone in which the player can move with the
		// camera staying fixed) is set to according to the screen size as well.
    	this.camera.trap.size.x = ig.system.width/10;
    	this.camera.trap.size.y = ig.system.height/3;
		
		// The lookahead always shifts the camera in walking position; you can 
		// set it to 0 to disable.
    	this.camera.lookAhead.x = ig.system.width/6;
    	// this.camera.lookAhead.x = 0;
		
		// Set camera's screen bounds and reposition the trap on the player
    	this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
    	this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
    	this.camera.set( this.player );
	},

	reloadLevel: function() {
		this.loadLevelDeferred( this.currentLevel );
	},
	
	update: function() {		
		// Update all entities and BackgroundMaps
		this.parent();

		// Check if the user paused or unpaused the game
		if ( ig.input.pressed('pause') && this.player.enableInput ) {
			this.togglePause();
		}
		
		// Camera follows the player
		this.camera.follow( this.player );
		
		// Instead of using the camera plugin, we could also just center
		// the screen on the player directly, like this:
		// this.screen.x = this.player.pos.x - ig.system.width/2;
		// this.screen.y = this.player.pos.y - ig.system.height/2;
	},

	// Pause / unpause the game
	togglePause: function() {
		this.paused = !this.paused;
		ig.Timer.timeScale = (this.paused == 0 ? 1 : 0);
	},
	
	draw: function() {
		// Call the parent implementation to draw all Entities and BackgroundMaps
		this.parent();
		
		return;

		// Draw the heart and number of coins in the upper left corner.
		// 'this.player' is set by the player's init method
		if( this.player ) {
			var x = 16, 
				y = 16;

			for( var i = 0; i < this.player.maxHealth; i++ ) {
				// Full or empty heart?
				if( this.player.health > i ) {
					this.heartFull.draw( x, y );
				}
				else {
					this.heartEmpty.draw( x, y );	
				}

				x += this.heartEmpty.width + 8;
			}

			// We only want to draw the 0th tile of coin sprite-sheet
			x += 48;
			this.coinIcon.drawTile( x, y+6, 0, 36 );

			x += 42;
			this.font.draw( 'x ' + this.player.coins, x, y+10 )
		}
		
		// Draw touch buttons, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.draw(); 
		}
	}
});



// The title screen is simply a Game Class itself; it loads the LevelTitle
// runs it and draws the title image on top.

MyTitle = ig.Game.extend({
	clearColor: "#d0f4f7",
	gravity: 800,

	// The title image
	title: new ig.Image( 'media/title.png' ),

	// Load a font
	font: new ig.Font( 'media/fredoka-one.font.png' ),

	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.W, 'jump' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );
		
		// Align touch buttons to the screen size, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.align(); 
		}

		// We want the font's chars to slightly touch each other,
		// so set the letter spacing to -2px.
		this.font.letterSpacing = -2;

		this.loadLevel( LevelTitle );
		this.maxY = this.backgroundMaps[0].pxHeight - ig.system.height;
	},

	update: function() {
		// Check for buttons; start the game if pressed
		if( ig.input.pressed('jump') || ig.input.pressed('shoot') ) {
			ig.system.setGame( MyGame );
			return;
		}
		
		
		this.parent();

		// Scroll the screen down; apply some damping.
		var move = this.maxY - this.screen.y;
		if( move > 5 ) {
			this.screen.y += move * ig.system.tick;
			this.titleAlpha = this.screen.y / this.maxY;
		}
		this.screen.x = (this.backgroundMaps[0].pxWidth - ig.system.width)/2;
	},

	draw: function() {
		this.parent();

		var cx = ig.system.width/2;
		this.title.draw( cx - this.title.width/2, 60 );
		
		var startText = ig.ua.mobile
			? 'Press Button to Play!'
			: 'Press X or C to Play!';
		
		this.font.draw( startText, cx, 420, ig.Font.ALIGN.CENTER);

		// Draw touch buttons, if we have any
		if( window.myTouchButtons ) {
			window.myTouchButtons.draw(); 
		}
	}
});


if( ig.ua.mobile ) {
	// If we're running on a mobile device and not within Ejecta, disable 
	// sound completely :(
	if( !window.ejecta ) {
		ig.Sound.enabled = false;
	}

	// Use the TouchButton Plugin to create a TouchButtonCollection that we
	// can draw in our game classes.
	
	// Touch buttons are anchored to either the left or right and top or bottom
	// screen edge.
	var buttonImage = new ig.Image( 'media/touch-buttons.png' );
	myTouchButtons = new ig.TouchButtonCollection([
		new ig.TouchButton( 'left', {left: 0, bottom: 0}, 128, 128, buttonImage, 0 ),
		new ig.TouchButton( 'right', {left: 128, bottom: 0}, 128, 128, buttonImage, 1 ),
		new ig.TouchButton( 'shoot', {right: 128, bottom: 0}, 128, 128, buttonImage, 2 ),
		new ig.TouchButton( 'jump', {right: 0, bottom: 96}, 128, 128, buttonImage, 3 )
	]);
}

// If our screen is smaller than 640px in width (that's CSS pixels), we scale the 
// internal resolution of the canvas by 2. This gives us a larger viewport and
// also essentially enables retina resolution on the iPhone and other devices 
// with small screens.
var scale = (window.innerWidth < 640) ? 2 : 1;

var mywidth = 320;
var myheight = 240;


// We want to run the game in "fullscreen", so let's use the window's size
// directly as the canvas' style size.
var canvas = document.getElementById('canvas');
// canvas.style.width = window.innerWidth + 'px';
// canvas.style.height = window.innerHeight + 'px';
canvas.style.width = mywidth * 3;
canvas.style.height = myheight * 3;


// Listen to the window's 'resize' event and set the canvas' size each time
// it changes.
window.addEventListener('resize', function(){
	return;
	// If the game hasn't started yet, there's nothing to do here
	if( !ig.system ) { return; }
	
	// Resize the canvas style and tell Impact to resize the canvas itself;
	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height = window.innerHeight + 'px';
	ig.system.resize( window.innerWidth * scale, window.innerHeight * scale );
	
	// Re-center the camera - it's dependend on the screen size.
	if( ig.game && ig.game.setupCamera ) {
		ig.game.setupCamera();
	}
	
	// Also repositon the touch buttons, if we have any
	if( window.myTouchButtons ) {
		window.myTouchButtons.align(); 
	}
}, false);


// Finally, start the game into MyTitle and use the ImpactSplashLoader plugin 
// as our loading screen
var width = window.innerWidth * scale,
	height = window.innerHeight * scale;
// ig.main( '#canvas', MyTitle, 60, width, height, 1, ig.ImpactSplashLoader );
ig.System.scaleMode = ig.System.SCALE.CRISP;
ig.main( '#canvas', MyGame, 60, mywidth, myheight, 3, ig.ImpactSplashLoader );

});

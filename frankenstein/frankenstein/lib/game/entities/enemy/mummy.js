ig.module(
	'game.entities.enemy.mummy'
)
.requires(
	'impact.entity',
	'game.entities.skeleton'
)
.defines(function(){

EntityMummy = EntitySkeleton.extend({

	size: {x: 32, y: 32},
	offset: {x: 0, y: 0},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},

	animSheet: new ig.AnimationSheet( 'media/sprites/Mummy.png' , 32, 32 ),

	health: 10,

	init: function( x, y, settings ){
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [0, 1] );
		this.addAnim( 'walk', 0.1, [0, 2, 0, 3] );
		this.addAnim( 'pain', 0.3, [6] );
		this.addAnim( 'attack', 0.1, [0, 4, 5] );

		// It attacks every 4-8 seconds
		this.attackTimer = new ig.Timer(Math.floor((Math.random() * 4) + 4));
	},

	handleTimers: function() {

		// Check if it's time to attack again
		if (this.attackTimer.delta() > 0 && this.currentAnim != this.anims.attack && this.currentAnim != this.anims.death) {
			this.currentAnim = this.anims.attack.rewind();
			this.attackTimer.reset();
		}

		this.parent();
	},

	createParticles: function(){
		
		// Generate a bunch of bones as particles
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-15, {image: 3} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-5, {image: 2} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-5, {image: 1} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-5, {image: 1} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-5, {image: 2} );

	}

});

});
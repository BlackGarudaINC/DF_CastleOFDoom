ig.module(
	'game.entities.enemy.sarcophagus'
)
.requires(
	'impact.entity',
	'game.entities.enemy.mummy',
	'game.entities.enemy.coffin'
)
.defines(function(){

EntitySarcophagus = EntityCoffin.extend({

	size: {x: 32, y: 10},
	offset: {x: 0, y: 22},

	animSheet: new ig.AnimationSheet( 'media/sprites/Mummy.png', 32, 32),
	sarcophagusCover: new ig.Image( 'media/sprites/Mummy.png' ),

	init: function( x, y, settings ){
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [15] );
		this.currentAnim = this.anims.idle;

	},

	draw: function(){
		this.sarcophagusCover.drawTile( this.pos.x - this.offset.x, this.pos.y - 22, 14, 32, 32 );
	},

	spawnSkeleton: function(){
		ig.game.spawnEntity( EntityMummy, this.pos.x, this.pos.y );
	},

	createParticles: function(){

		// Generate a bunch of bones as particles
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-5, {image: 5} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-5, {image: 4} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-5, {image: 5} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-5, {image: 4} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x, this.pos.y-5, {image: 5} );

	}

});

});
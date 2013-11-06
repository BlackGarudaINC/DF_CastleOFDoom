ig.module(
	'game.entities.enemy.sarcophagus'
)
.requires(
	'impact.entity',
	'impact.entity.mummy'
	'game.entities.enemy.coffin'
)
.defines(function(){

EntitySarcophagus = EntityCoffin.extend({

	size: {x: 30, y: 15},
	offset: {x: 6, y: 8},

	animSheet: new ig.AnimationSheet( 'media/sprites/Mummy.png', 32, 32),

	init: function( x, y, settings ){
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [15] );

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
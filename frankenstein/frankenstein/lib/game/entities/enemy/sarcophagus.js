ig.module(
	'game.entities.enemy.sarcophagus'
)
.requires(
	'impact.entity',
	'game.entities.enemy.mummy',
	'game.entities.enemy.coffin',
	'game.entities.enemy.mummywrap'
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
		
		if(this.visible){
			this.sarcophagusCover.drawTile( this.pos.x - this.offset.x, this.pos.y - 22, 14, 32, 32 );	
		}
		
		this.parent();
	},

	spawnSkeleton: function(){
		ig.game.spawnEntity( EntityMummy, this.pos.x, this.pos.y - 20 );
	},

	handleTimers: function() {
		
		// Check if it's time to attack again
		if (this.awake && this.shakeTimer.delta() > 0 && this.currentAnim != this.anims.open) {
			if (this.shakeCounter < 10) {
				this.vel.y = -40;
				this.shakeTimer.set(0.1);
				this.shakeCounter += 1;
			} else {
				this.currentAnim = this.anims.open.rewind();
			}
		}

		this.parent();
	},

	createParticles: function(){

		// Generate stone debris as particles
		ig.game.spawnEntity( EntityMummywrap, this.pos.x-10, this.pos.y-10, {image: 4} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x+10, this.pos.y-10, {image: 4} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x-10, this.pos.y-20, {image: 5} );
		ig.game.spawnEntity( EntityMummywrap, this.pos.x+10, this.pos.y-20, {image: 5} );
	}

});

});
ig.module(
	'game.entities.enemy.evilhand'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){

EntityEvilhand = EntityEnemy.extend({
	size: {x: 16, y: 20},
	offset: {x: 7, y: 12},

	attackTimer: null,		// countdown to when it attacks

	damageFlash: true,		// flash when damaged
	knockback: false,
	killWhenDead: false,	// use death animation

	wallReverse: false,		// Don't reverse when you hit a wall
	edgeReverse: false,		// Reverse at the edge of a platform

	gravityFactor: 0,

	goldDropValue: 5,

	animSheet: new ig.AnimationSheet( 'media/sprites/EvilHand.png', 32, 32),

	health: 2,

	init: function( x, y, settings ){
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [0,1] );
		this.addAnim( 'attack', 0.05, [2,3,4,5,6,6,5,5,6,6,5,5,6,6], true );
		this.addAnim( 'attackDone', 0.05, [6,5,4,3,2,1], true );
		this.addAnim( 'death', 0.1, [5] );

		this.attackTimer = new ig.Timer(2);

		if(ig.system.running){
			this.size.y = -20;
		}

	},

	handleTimers: function(){
		if( this.attackTimer.delta() > 0 ){
			if ( this.currentAnim == this.anims.idle ){
				this.currentAnim = this.anims.attack.rewind();
			} else if(this.currentAnim == this.anims.attack){
				this.currentAnim = this.anims.attackDone.rewind();
			} else{
				this.currentAnim = this.anims.idle.rewind();
			}

			this.attackTimer.reset();
		}

		this.parent();
	},

	handleAnimations: function(){
		if(this.currentAnim == this.anims.attack && this.currentAnim.frame == 13){
			this.size.y = 20;
		}
		if(this.currentAnim == this.anims.attackDone && this.currentAnim.frame == 5){
			this.size.y = -20;
		}

		this.parent();
	}


});

});
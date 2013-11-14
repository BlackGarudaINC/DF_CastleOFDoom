ig.module(
	'game.entities.boss.serpenttongue'
)
.requires(
	'game.entities.enemy.enemypart',
	'impact.entity'
)
.defines(function(){
	

EntitySerpenttongue = EntityEnemypart.extend({

	size: {x: 10, y: 8},
	offset: {x: 22, y: 24},

	animSheet: new ig.AnimationSheet( 'media/sprites/SerpentKing.png', 32, 32 ),

	damageMaster: true,
	damageMultiplier: 1,
	invincible: true,
	killWhenDead: true,
	gravityFactor: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [23, 12, 13, 14, 15, 14, 13, 12, 23], true );

		this.zIndex = this.master.zIndex - 5;
	},

	// As soon as the tongue goes back in the mouth, destroy it
	handleAnimations: function() {

		if (this.currentAnim.loopCount > 0) {
			this.kill();
		}

		this.parent();
	},

	myUpdate: function () {
		this.pos.x = this.master.pos.x + 10;
		this.pos.y = this.master.pos.y + 16;
		this.parent();
	}
	
	
});

});
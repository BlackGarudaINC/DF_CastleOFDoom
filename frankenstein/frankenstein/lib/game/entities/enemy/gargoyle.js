ig.module(
	'game.entities.enemy.gargoyle'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){
	
EntityGargoyle = EntityEnemy.extend({
	
	health: 3,
	speed: 30,

	size: {x: 32, y: 28},
	offset: {x: 0, y: 2},
	maxVel: {x: 200, y: 200},

	knockback: false,
	damageFlash: true,
	killWhenDead: false,
	showsPain: false,

	attackSpeed: 100,	// Attack speed
	attackRange: 350,

	goldDropValue: 15,	 // Value of gold that this enemy drops

	animSheet: new ig.AnimationSheet( 'media/sprites/Gargoyle.png', 64, 64 ),

	//debugDraw: true,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 0.1, [0,1] );
		this.addAnim( 'fly', 0.1, [2,3] );
		this.addAnim( 'attack', 1, [2] );
		this.addAnim( 'death', 0.1, [4,5,6,7] );
	},

});

});
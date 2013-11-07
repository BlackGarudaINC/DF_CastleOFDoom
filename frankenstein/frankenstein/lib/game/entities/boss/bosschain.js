ig.module(
	'game.entities.boss.bosschain'
)
.requires(
	'game.entities.boss.bosspart',
	'impact.entity'
)
.defines(function(){
	
// A part of a boss that chains with a bunch of copies of itself, such as the serpent king's body
EntityBosschain = EntityBosspart.extend({
	
	gravityFactor: 0,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

	}
	
	
});

});
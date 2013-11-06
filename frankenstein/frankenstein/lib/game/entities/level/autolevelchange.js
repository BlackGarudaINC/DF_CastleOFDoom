ig.module(
	'game.entities.level.autolevelchange'
)
.requires(
	'game.entities.levelchange'
)
.defines(function(){
	
EntityAutolevelchange = EntityLevelchange.extend({
	_wmBoxColor: 'rgba(155, 0, 155, 0.7)',

	requireUp: false	// Automatically go to the next level when the player touches it

});

});
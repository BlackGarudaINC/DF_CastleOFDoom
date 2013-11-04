/*
This entity defines a specific place where the player will start in a new room.


Keys for Weltmeister:

name
	Name of this spawn point, pointed to by a level change object

*/

ig.module(
	'game.entities.spawn'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntitySpawn = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(0, 180, 255, 0.7)',
	
	size: {x: 16, y: 26},
	
	update: function(){}
});

});
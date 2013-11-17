ig.module( 'game.levels.testwater' )
.requires( 'impact.image','game.entities.level.water','game.entities.level.torch','game.entities.item.goldchest','game.entities.level.movingplatform','game.entities.level.destructiblewall','game.entities.enemy.skullserpent','game.entities.spawn','game.entities.levelchange','game.entities.trigger','game.entities.player.player' )
.defines(function(){
LevelTestwater=/*JSON[*/{"entities":[{"type":"EntityWater","x":16,"y":144,"settings":{"size":{"x":288,"y":8}}},{"type":"EntityTorch","x":72,"y":64},{"type":"EntityTorch","x":60,"y":80},{"type":"EntityGoldchest","x":116,"y":416,"settings":{"item":"Heartcontainer"}},{"type":"EntityMovingplatform","x":84,"y":160,"settings":{"size":{"x":48,"y":8},"waitTime":0,"xMove":1,"xMin":64,"xMax":192,"name":"platform1","active":0}},{"type":"EntityDestructiblewall","x":0,"y":352,"settings":{"wallType":1}},{"type":"EntityDestructiblewall","x":0,"y":336,"settings":{"wallType":2}},{"type":"EntitySkullserpent","x":200,"y":252},{"type":"EntityDestructiblewall","x":304,"y":176,"settings":{"faceRight":0}},{"type":"EntityDestructiblewall","x":304,"y":192,"settings":{"faceRight":0}},{"type":"EntitySpawn","x":52,"y":84,"settings":{"name":"L1"}},{"type":"EntityLevelchange","x":24,"y":92,"settings":{"level":"testsave","spawn":"R2","song":"Castle01"}},{"type":"EntityTrigger","x":92,"y":144,"settings":{"size":{"x":32,"y":16},"target":{"1":"platform1"}}},{"type":"EntityPlayer","x":72,"y":86}],"layer":[{"name":"background","width":20,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[324,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,0],[0,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,0],[0,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,0],[0,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,0],[0,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,0],[0,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,0],[0,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,0],[0,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,0],[0,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0],[0,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,0]]},{"name":"collision","width":20,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,12,12,12,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,12,12,12,12,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,12,12,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"main","width":20,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[69,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,451,452,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,483,484,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[101,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,103],[101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[101,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,103],[101,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,103],[101,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,103],[101,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,103]]}]}/*]JSON*/;
LevelTestwaterResources=[new ig.Image('media/sprites/GameTiles01.png'), new ig.Image('media/sprites/GameTiles01.png')];
});
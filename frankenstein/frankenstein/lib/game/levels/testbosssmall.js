ig.module( 'game.levels.testbosssmall' )
.requires( 'impact.image','game.entities.level.eventdoor','game.entities.spawn','game.entities.boss.freak','game.entities.npc.cutscene','game.entities.npc.testfrankenstein','game.entities.player.player' )
.defines(function(){
LevelTestbosssmall=/*JSON[*/{"entities":[{"type":"EntityEventdoor","x":60,"y":184,"settings":{"level":"test","spawn":"L2"}},{"type":"EntitySpawn","x":88,"y":180,"settings":{"name":"L1"}},{"type":"EntityFreak","x":254,"y":176},{"type":"EntityCutscene","x":136,"y":32,"settings":{"events":{"1":0.5,"2":3,"3":1}}},{"type":"EntityTestfrankenstein","x":204,"y":176},{"type":"EntityPlayer","x":124,"y":182}],"layer":[{"name":"background","width":20,"height":15,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":true,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324],[324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324,324]]},{"name":"collision","width":20,"height":15,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"main","width":20,"height":15,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[69,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,70],[69,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,70],[69,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,70]]}]}/*]JSON*/;
LevelTestbosssmallResources=[new ig.Image('media/sprites/GameTiles01.png'), new ig.Image('media/sprites/GameTiles01.png')];
});
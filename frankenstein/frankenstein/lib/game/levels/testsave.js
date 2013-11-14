ig.module( 'game.levels.testsave' )
.requires( 'impact.image','game.entities.level.bigdoor','game.entities.item.silverchest','game.entities.item.goldchest','game.entities.level.chandelier','game.entities.spawn','game.entities.level.autolevelchange','game.entities.levelchange','game.entities.item.book','game.entities.player.player','game.entities.npc.igor' )
.defines(function(){
LevelTestsave=/*JSON[*/{"entities":[{"type":"EntityBigdoor","x":304,"y":48},{"type":"EntitySilverchest","x":236,"y":168,"settings":{"group":2}},{"type":"EntityGoldchest","x":116,"y":208,"settings":{"item":"Key"}},{"type":"EntityGoldchest","x":24,"y":72,"settings":{"item":"Heartcontainer"}},{"type":"EntitySilverchest","x":204,"y":168,"settings":{"group":3}},{"type":"EntitySilverchest","x":224,"y":128,"settings":{"group":1}},{"type":"EntitySilverchest","x":220,"y":168,"settings":{"group":4}},{"type":"EntityChandelier","x":180,"y":16},{"type":"EntitySpawn","x":256,"y":156,"settings":{"name":"R2"}},{"type":"EntityAutolevelchange","x":312,"y":48,"settings":{"size":{"x":8,"y":48},"level":"test","spawn":"L1"}},{"type":"EntitySpawn","x":276,"y":68,"settings":{"name":"R1"}},{"type":"EntityLevelchange","x":280,"y":164,"settings":{"level":"testwater","spawn":"L1","song":"Castle02"}},{"type":"EntityBook","x":32,"y":200,"settings":{"move":"run"}},{"type":"EntityPlayer","x":108,"y":62},{"type":"EntityIgor","x":74,"y":64,"settings":{"item":{"1":"Hatchet","2":"Stone","3":"Heart","4":"Club","5":"Potion"},"cost":{"1":30,"2":15,"3":8,"4":35,"5":50}}}],"layer":[{"name":"background","width":40,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":false,"preRender":false,"distance":"1","tilesize":8,"foreground":false,"data":[[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208]]},{"name":"shadows_1","width":40,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":false,"preRender":false,"distance":"1","tilesize":8,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,81,19,19,19,19,19,0,0],[0,0,19,19,19,19,19,19,0,0,0,0,0,0,19,19,19,0,0,0,0,81,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,81,19,19,19,19,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,81,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"collision","width":40,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":8,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,12,12,12,12,12,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,12,12,12,12,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"main","width":40,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":false,"preRender":false,"distance":"1","tilesize":8,"foreground":false,"data":[[7,8,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,9,10],[71,72,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,73,74],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[67,68,1,2,1,2,1,2,1,2,1,2,1,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,2530,0,0,0,0,0,0,0,0,0,0,0],[3,4,65,66,65,66,65,66,65,66,65,66,65,66,65,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,2,1,2,5,6],[67,68,1,2,1,2,1,2,1,2,1,2,1,2,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,65,66,65,66,65,66,69,70],[3,4,65,66,65,66,65,66,65,66,65,66,65,66,65,66,0,0,0,0,0,967,968,967,968,967,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,777,0,0,0,0,778,395,396,395,396,395,396,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,841,0,0,0,0,842,459,460,459,460,459,460,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,905,0,0,0,0,906,395,396,395,396,395,396,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,969,0,1112,1113,0,970,459,460,459,460,459,460,0,0,0,0,0,0,0,0,0,0,0,0,0,967,968,967,968,0,0,0,0,0,0,0,5,6],[67,68,0,0,1176,1177,0,0,395,396,395,396,395,396,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1733,1734,1735,1736,69,70],[3,4,0,0,1240,1241,0,0,459,460,459,460,459,460,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1797,1798,1799,1800,5,6],[67,68,0,0,521,522,0,0,395,396,395,396,395,396,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1861,1862,1863,1864,69,70],[3,4,0,0,585,586,0,0,459,460,459,460,459,460,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1925,1926,1927,1928,5,6],[67,68,0,0,649,650,0,0,395,396,395,396,395,396,0,0,0,0,0,0,0,0,0,0,130,2,65,66,65,66,65,66,65,66,65,66,65,66,5,6],[3,4,0,0,713,714,0,0,395,396,395,396,395,396,0,0,0,0,0,0,0,0,0,130,1,2,1,2,1,2,1,2,1,2,1,2,1,2,69,70],[67,68,0,915,916,917,918,0,459,460,459,460,459,460,0,0,0,0,0,0,0,0,130,65,65,66,65,66,65,66,65,66,65,66,65,66,65,66,5,6],[3,4,0,979,980,981,982,0,0,0,0,0,0,0,0,0,0,0,0,0,0,130,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,69,70],[67,68,515,1043,1044,1045,1046,0,0,0,0,0,0,0,0,0,0,0,0,0,130,65,65,66,65,66,65,66,65,66,65,66,65,66,65,66,65,66,5,6],[135,136,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,137,138],[199,200,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,201,202]]}]}/*]JSON*/;
LevelTestsaveResources=[new ig.Image('media/sprites/GameTiles01.png'), new ig.Image('media/sprites/GameTiles01.png'), new ig.Image('media/sprites/GameTiles01.png')];
});
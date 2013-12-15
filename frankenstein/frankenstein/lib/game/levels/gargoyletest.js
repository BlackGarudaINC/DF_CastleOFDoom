ig.module( 'game.levels.gargoyletest' )
.requires( 'impact.image','game.entities.enemy.gargoyle','game.entities.player.player' )
.defines(function(){
LevelGargoyletest=/*JSON[*/{"entities":[{"type":"EntityGargoyle","x":274,"y":94,"settings":{"position2":{"x":22,"y":54}}},{"type":"EntityPlayer","x":100,"y":142}],"layer":[{"name":"background","width":40,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":false,"preRender":false,"distance":"1","tilesize":8,"foreground":false,"data":[[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208],[143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144,143,144],[207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208,207,208]]},{"name":"collision","width":40,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":8,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"main","width":40,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":false,"preRender":false,"distance":"1","tilesize":8,"foreground":false,"data":[[7,8,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,133,134,9,10],[71,72,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,197,198,73,74],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,257,257,257,257,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2530,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,257,257,257,257,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,257,257,257,257,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[67,68,0,0,0,0,0,0,0,0,0,0,3436,3436,3436,3436,3436,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,70],[67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6],[3,4,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,69,70],[67,68,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,132,5,6],[135,136,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,131,132,137,138],[199,200,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,195,196,201,202]]},{"name":"shadows_1","width":40,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"media/sprites/GameTiles01.png","repeat":false,"preRender":false,"distance":"1","tilesize":8,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelGargoyletestResources=[new ig.Image('media/sprites/GameTiles01.png'), new ig.Image('media/sprites/GameTiles01.png'), new ig.Image('media/sprites/GameTiles01.png')];
});
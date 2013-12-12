ig.module(
	'game.entities.enemy.sludge'
)
.requires(
	'impact.entity',
	'game.entities.enemy.enemy'
)
.defines(function(){

EntitySludge = EntityEnemy.extend({

	size: {x: 24, y: 4},
	offset: {x: 0, y: 20},

	health: 2,
	damage: 1,
	speed: 20,

	knockback: false,
	killWhenDead: false,

	wallReverse: true,
	edgeReverse: true,
	levelReverse: true,

	goldDropValue: 5,

	isPuddle: true,
	activeTimer: null,

	debugDraw: true,

	animSheet: new ig.AnimationSheet( 'media/sprites/Sludge.png', 24, 24 ),

	init: function( x, y, settings ){
		this.parent( x, y, settings );

		this.addAnim( 'puddle', 0.1, [0] );
		this.addAnim( 'puddleIdle', 0.3, [0,1] );
		this.addAnim( 'fromPuddle', 0.2, [0,1,2,3,4], true );
		this.addAnim( 'toPuddle', 0.2, [4,3,2,1,0], true );
		this.addAnim( 'idle', 0.6, [4,5] );
		this.addAnim( 'walk', 0.2, [6,7,8,5] );
		this.addAnim( 'death', 0.1, [4,5,8,9,10,11,12,13,14,15], true );

		this.currentAnim = this.anims.puddle.rewind();

		this.activeTimer = new ig.Timer(Math.floor((Math.random()*10) + 15));

	},

	handleTimers: function(){
		
		if( !this.dead && this.activeTimer.delta() > 0 && !this.isPuddle && this.distanceTo(ig.game.player) > 70 ){

			this.currentAnim = this.anims.toPuddle.rewind();
			this.isPuddle = true;

			this.vel.x = 0;

			this.activeTimer.reset();

		} else if ( !this.dead && this.activeTimer.delta() > 0 ){

			this.activeTimer.reset();

		}

		this.parent();
	},

	handleAnimations: function(){

		// Transform from puddle to walking form if player is near
		if( !this.dead && this.isPuddle && this.distanceTo(ig.game.player) < 70 ) {
			
			this.currentAnim = this.anims.fromPuddle.rewind();
			this.isPuddle = false;

		}

		if( !this.dead && this.currentAnim == this.anims.fromPuddle && !this.isPuddle && this.currentAnim.loopCount > 0 ) {
			
			this.currentAnim = this.anims.walk;

		}

		if( this.currentAnim == this.anims.idle && this.currentAnim.loopCount > 1 ) {

			this.currentAnim = this.anims.walk.rewind();

		}

		this.parent();
	},

	update: function(){

		if (this.currentAnim == this.anims.walk && this.currentAnim.tile == 8) {
			var xdir = this.flip ? 1 : -1;
			//this.vel.x = this.speed * xdir;
			this.pos.x = this.pos.x + 7 * xdir;
			this.currentAnim = this.anims.idle.rewind();
			
		}

		this.currentAnim.flip.x = !this.flip;

		this.parent();
	}

})
})
PhaserGame.Entity = function( game, x, y, key, frame ) {
	Phaser.Sprite.call( this, game, x, y, key, frame );
};

PhaserGame.Entity.prototype = Object.create( Phaser.Sprite.prototype );
PhaserGame.Entity.prototype.constructor = PhaserGame.Entity;
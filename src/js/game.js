var game = new Phaser.Game( 600, 400, Phaser.AUTO, 'phaser-game', null, false, false );

game.state.add( 'Boot', PhaserGame.Boot );
game.state.add( 'Preload', PhaserGame.Preload );
game.state.add( 'Menu', PhaserGame.Menu );
game.state.add( 'Play', PhaserGame.Play );
game.state.add( 'Gameover', PhaserGame.Gameover );

game.state.start( 'Boot' );
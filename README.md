# Phaser Boilerplate

This is my personal [gulp](https://github.com/gulpjs/gulp/) based boilerplate for getting started with the [Phaser](https://github.com/photonstorm/phaser) game framework. This is a very general starting point and won't work for all games. Included here are all the things I find myself doing at the beginning of each project.

- Create common states, all attached to a singe object called `PhaserGame`
  - Boot
  - Preload
  - Menu
  - Play
  - Gameover
- Create a sample entity
- Create a basic game definition, load states, and start the Boot state
- Setup basic HTML meta tags for mobile compatibility
- Run useful processes with gulp
  - Process and minify SCSS
  - JSHint, minify, and concatenate JS
  - Minify HTML
  - Optimize images
import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  public speed = 200;

  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private image: Phaser.Physics.Arcade.Sprite;

	private platforms;

  constructor() {
    super(sceneConfig);
  }

  public preload(): void{
	
	this.load.image('bkground', 'assets/background.jpg');
	this.load.image('tiles', 'assets/tiles.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
  
  }

  public create(): void {
	
	var map = this.make.tilemap({ key: 'map' });
	var tiles = map.addTilesetImage('tiles', 'tiles');
	var layer = map.createLayer('Tile Layer 1', tiles, 0, 0);
	/*
	
	// add background as image
	this.add.image(400, 300, 'bkground');
	
	
	
	// add static elements
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');	
	this.platforms = this.physics.add.staticGroup();
*/	
    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    this.image = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this) / 2, 'man');

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  public update(): void {
    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);

    if (this.cursorKeys.left.isDown) {
      velocity.x -= 1;
    }
    if (this.cursorKeys.right.isDown) {
      velocity.x += 1;
    }
    if (this.cursorKeys.up.isDown) {
      velocity.y -= 1;
    }
    if (this.cursorKeys.down.isDown) {
      velocity.y += 1;
    }

    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    this.image.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  
  }
  
}

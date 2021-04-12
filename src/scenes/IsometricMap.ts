
import Skeleton from './Skeleton'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'GameISO',
};

export class IsometricMap extends Phaser.Scene
{
	private skeletons: Phaser.GameObjects.GameObject[] = []
	private d = 0

	constructor() {
		super(sceneConfig);
	}
	
	preload()
	{
		this.load.json('map', '/assets/isometric-grass-and-water.json')
		this.load.spritesheet('tiles', '/assets/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('skeleton', '/assets/skeleton8.png', { frameWidth: 128, frameHeight: 128 })
		this.load.image('house', '/assets/rem_0002.png')
	}
	
	create(){
		this.buildMap();
		this.placeHouses();
		this.skeletons.push(this.add.existing(new Skeleton(this, 240, 290, 'walk', 'southEast', 100)));
		this.skeletons.push(this.add.existing(new Skeleton(this, 100, 380, 'walk', 'southEast', 230)));

		this.skeletons.push(this.add.existing(new Skeleton(this, 760, 100, 'attack', 'southEast', 0)))
		this.skeletons.push(this.add.existing(new Skeleton(this, 800, 140, 'attack', 'northWest', 0)))
		
		this.cameraAdd();
	}

	private cameraAdd(){
		console.log("camera add");
		var cameraZoom = 1.0;
		this.cameras.main.setBounds(0, 0, 1024, 2048);
		this.cameras.main.setZoom(1.0);
        //this.cameras.main.centerOn(0, 0);
		this.input.on('wheel', function (pointer, deltaX, deltaY, deltaZ) {
			if (deltaZ == 100){
				cameraZoom -= 0.1;
			}else if(deltaZ == -100){
				cameraZoom += 0.1;
			}else{
				cameraZoom += 0.0;
			}
			this.cameras.main.setZoom(cameraZoom);
			this.cameras.main.centerOn(pointer.x, pointer.y);
			//this.cameras.main.scale += deltaY * -0.001;
		});
	}
	
	private buildMap()
	{
		//  Parse the data out of the map
		const data = this.cache.json.get('map')

		const tilewidth = data.tilewidth
		const tileheight = data.tileheight

		const tileWidthHalf = tilewidth / 2
		const tileHeightHalf = tileheight / 2

		const layer = data.layers[0].data

		const mapwidth = data.layers[0].width
		const mapheight = data.layers[0].height

		const centerX = mapwidth * tileWidthHalf
		const centerY = 16

		let i = 0

		for (let y = 0; y < mapheight; y++)
		{
			for (let x = 0; x < mapwidth; x++)
			{
				const id = layer[i] - 1

				const tx = (x - y) * tileWidthHalf
				const ty = (x + y) * tileHeightHalf

				const tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id).setInteractive();

				//tile.on('wheel', function (pointer, deltaX, deltaY, deltaZ) {
				//	this.scale += deltaY * -0.001;
				//});

				tile.depth = centerY + ty

				i++
			}
		}

	}

	placeHouses()
	{
		let house = this.add.image(240, 370, 'house')

		house.depth = house.y + 86

		house = this.add.image(1300, 290, 'house')

		house.depth = house.y + 86
	}
	
	update()
	{
		this.skeletons.forEach((skeleton) => {
			skeleton.update()
		})
	/*
	
		if (this.d)
		{
			this.cameras.main.scrollX -= 0.5
	
			if (this.cameras.main.scrollX <= 0)
			{
				this.d = 0
			}
		}
		else
		{
			this.cameras.main.scrollX += 0.5
	
			if (this.cameras.main.scrollX >= 200)
			{
				this.d = 1
			}
		}*/
	}
}

declare var Phaser;

export class Game {

    private core:any;
    private spriteA:any;
    private spriteB:any;

    public constructor(private socket:any) {
        this.core = new Phaser.Game(800, 600, Phaser.AUTO, 'app', {
            preload: () => {
                this.preload();
            },
            create: () => {
                this.create();
            },
            update: () => {
                let passedTime:number = this.core.time.elapsed;
                this.update(passedTime);
            }
        });
    }

    private preload():void {
        this.core.load.image('asteroid', 'rsc/images/asteroid.png');
        this.core.load.image('elephant', 'rsc/images/elephant.png');
        this.core.load.image('fish', 'rsc/images/fish.png');
        this.core.load.image('jungle-bg', 'rsc/images/jungle-bg.png');
        this.core.load.image('laser', 'rsc/images/laser.png');
        this.core.load.image('monkey', 'rsc/images/monkey.png');
        this.core.load.image('shark', 'rsc/images/shark.png');
        this.core.load.image('ship', 'rsc/images/ship.png');
        this.core.load.image('space-bg', 'rsc/images/space-bg.png');
        this.core.load.image('underwater-bg', 'rsc/images/underwater-bg.png');
    }

    private create():void {
        this.buildPiece(5);
        this.buildPiece(1);
    }


    private update(passedTime:number):void {
        console.log(passedTime);
    }

    private buildGame(snippetIds:number[], result:number):void {

    }

    private buildPiece(snippetId:number):void {
        if (snippetId === 0) this.buildSprites("monkey", "elephant", 480);
        else if (snippetId === 1) this.buildSprites("ship", "asteroid");
        else if (snippetId === 2) this.buildSprites("shark", "fish");
        else if (snippetId === 3) this.buildSetting("jungle-bg", "jungle-bgm");
        else if (snippetId === 4) this.buildSetting("space-bg", "space-bgm");
        else if (snippetId === 5) this.buildSetting("underwater-bg", "underwater-bgm");
    }

    private buildSprites(spriteAName:string, spriteBName:string, x:number = 300):void {
        this.spriteA = this.core.add.sprite(150, x, spriteAName);
        this.spriteB = this.core.add.sprite(650, x, spriteBName);
        this.spriteA.anchor.setTo(0.5, 0.5);
        this.spriteB.anchor.setTo(0.5, 0.5);
        this.spriteA.width = this.spriteB.width = 150;
        this.spriteA.scale.y = this.spriteA.scale.x;
        this.spriteB.scale.y = this.spriteB.scale.x;
    }

    private buildSetting(bgName:string, bgmName:string):void {
        this.core.add.sprite(0, 0, bgName);

    }
}
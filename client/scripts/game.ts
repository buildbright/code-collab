declare var Phaser;

export class Game {

    private core;

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

    }

    private create():void {

    }



    private update(passedTime:number):void {
        console.log(passedTime);
    }
}
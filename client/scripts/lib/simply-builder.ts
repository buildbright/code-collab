import {Simply} from "./simply";
declare var Phaser;

export class SimplyBuilder {

    private game:any;

    private loadedImages:any;
    private loadedSounds:any;

    public constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'app', {
            preload: () => {

            },
            create: () => {

            },
            update: () => {

            }
        });
    }

    public loadImage(name:string, path:string):SimplyBuilder {
        return this;
    }

    public loadSound(name:string, path:string):SimplyBuilder {
        return this;
    }

    public build(createHandler:() => void, updateHandler:(passedTime:number) => void):Simply {
        //TODO
        return null;
    }
}
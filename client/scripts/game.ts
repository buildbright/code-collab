import {Snippet} from "./snippet";
import {WaitScreen} from "./screens/wait-screen";
import {SelectScreen} from "./screens/select-screen";
import {PlayScreen} from "./screens/play-screen";
import {ResultScreen} from "./screens/result-screen";
declare var Phaser;

export class Game {

    public core:any;

    public waitScreen:WaitScreen;
    public selectScreen:SelectScreen;
    public playScreen:PlayScreen;
    public resultScreen:ResultScreen;

    public sounds:any;

    public constructor(public socket:any) {
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
        this.core.stage.disableVisibilityChange = true;

        this.core.load.image('select-bg', 'rsc/images/select-bg.png');
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

        this.core.load.audio('click', 'rsc/sounds/click.ogg');
        this.core.load.audio('eat', 'rsc/sounds/eat.wav');
        this.core.load.audio('elephant', 'rsc/sounds/elephant.wav');
        this.core.load.audio('jump', 'rsc/sounds/jump.ogg');
        this.core.load.audio('jungle-bgm', 'rsc/sounds/jungle-bgm.ogg');
        this.core.load.audio('monkey', 'rsc/sounds/monkey.wav');
        this.core.load.audio('shoot', 'rsc/sounds/shoot.ogg');
        this.core.load.audio('space-bgm', 'rsc/sounds/space-bgm.ogg');
        this.core.load.audio('underwater', 'rsc/sounds/underwater.mp3');
        this.core.load.audio('underwater-bgm', 'rsc/sounds/underwater-bgm.ogg');
    }

    private create():void {
        this.sounds = {};
        this.sounds['click'] = this.core.add.audio('click');
        this.sounds['eat'] = this.core.add.audio('eat');
        this.sounds['elephant'] = this.core.add.audio('elephant');
        this.sounds['jump'] = this.core.add.audio('jump');
        this.sounds['jungle-bgm'] = this.core.add.audio('jungle-bgm');
        this.sounds['monkey'] = this.core.add.audio('monkey');
        this.sounds['shoot'] = this.core.add.audio('shoot');
        this.sounds['space-bgm'] = this.core.add.audio('space-bgm');
        this.sounds['underwater'] = this.core.add.audio('underwater');
        this.sounds['underwater-bgm'] = this.core.add.audio('underwater-bgm');

        this.waitScreen = new WaitScreen(this);
        this.selectScreen = new SelectScreen(this);
        this.playScreen = new PlayScreen(this);
        this.resultScreen = new ResultScreen(this);

        this.hideAll();
        this.playScreen.show([0, 5, 7], "okay");
    }

    private hideAll():void {
        this.waitScreen.hide();
        this.selectScreen.hide();
        this.playScreen.hide();
        this.resultScreen.hide();
    }

    private update(passedTime:number):void {
        this.playScreen.update(passedTime);
    }

    //private checkSnippets(snippetIds:number[]):void {
    //    snippetIds.sort();
    //    if (snippetIds[0] < 0 || snippetIds[0] > 2) {
    //        this.buildGame(snippetIds, "Missing background and music.");
    //    } else if (snippetIds[1] < 3 || snippetIds[1] > 5) {
    //        this.buildGame(snippetIds, "No objects created.");
    //    } else if (snippetIds[2] < 6 || snippetIds[2] > 8) {
    //        this.buildGame(snippetIds, "Missing actions.");
    //    } else {
    //        if ((snippetIds[0] === 0 && snippetIds[1] === 3 && snippetIds[2] === 6)
    //            ||(snippetIds[0] === 1 && snippetIds[1] === 4 && snippetIds[2] === 7)
    //            ||(snippetIds[0] === 2 && snippetIds[1] === 5 && snippetIds[2] === 8)) {
    //            this.buildGame(snippetIds, null);
    //        } else {
    //            this.buildGame(snippetIds, "okay");
    //        }
    //    }
    //}
}
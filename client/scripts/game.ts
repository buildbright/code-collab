declare var Phaser;

export class Game {

    private core:any;
    private spriteA:any;
    private spriteB:any;
    private sounds:any;

    private selectGroup:any;
    private runGroup:any;

    private updateAction:(passedTime:number) => void;
    private delayFns:any[];

    private snippetLab1:any;
    private snippetLab2:any;
    private snippetLab3:any;

    public constructor(private socket:any) {
        this.snippetLab1 = null;
        this.snippetLab2 = null;
        this.snippetLab3 = null;

        this.delayFns = [];
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
        this.updateAction = null;
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

        this.selectGroup = this.core.add.group();
        this.runGroup = this.core.add.group();
        this.core.add.sprite(0, 0, "select-bg", null, this.selectGroup);

        this.buildGame([0,3,6], "okay");
    }

    private update(passedTime:number):void {
        if (this.updateAction != null) this.updateAction(passedTime);
        for (let delayFn of this.delayFns) {
            delayFn.delay -= passedTime;
            if (delayFn.delay <= 0) {
                this.delayFns.splice(this.delayFns.indexOf(delayFn), 1);
                delayFn.fn();
            }
        }
    }

    private showChoices(choices:number):void {
        this.runGroup.removeAll(true);
        this.runGroup.visible = false;
        this.core.sound.stopAll();

        this.selectGroup.visible = true;
        //TODO
    }

    private buildGame(snippetIds:number[], result:string):void {
        this.selectGroup.visible = false;
        this.runGroup.visible = true;
        this.onDelay(() => {
            if(result == null || result == "okay") {
                this.sounds['click'].play();
                this.buildPiece(snippetIds[0]);
                this.buildPiece(snippetIds[1]);
                this.onDelay(() => {
                    this.sounds['click'].play();
                    this.buildPiece(snippetIds[2]);
                    this.onDelay(() => {
                        if (result == null) {
                            let style:any = {
                                fontSize:80+"px",
                                fill:"#00FF00"
                            };
                            let lab:any = this.core.add.text(0, 0, "Nice Job!", style, this.runGroup);
                            lab.stroke = '#000000';
                            lab.strokeThickness = 6;
                            lab.anchor.setTo(0.5, 0.5);
                            lab.x = 400;
                            lab.y = 300;
                        } else {
                            let style:any = {
                                fontSize:80+"px",
                                fill:"#ffff00"
                            };
                            let lab:any = this.core.add.text(0, 0, "Not Bad!", style, this.runGroup);
                            lab.stroke = '#000000';
                            lab.strokeThickness = 6;
                            lab.anchor.setTo(0.5, 0.5);
                            lab.x = 400;
                            lab.y = 300;
                        }
                        this.onDelay(() => {
                            this.showChoices(null);
                        }, 5000);
                    }, 7000);
                }, 3000);
            } else {
                //TODO
            }
        }, 1000);
    }

    private onDelay(fn:() => void, delay:number):void {
        this.delayFns.push({
            delay : delay,
            fn: fn
        });
    }

    private buildPiece(snippetId:number):void {
        if (snippetId === 0) this.buildSetting("jungle-bg", "jungle-bgm");
        else if (snippetId === 1) this.buildSetting("space-bg", "space-bgm");
        else if (snippetId === 2) this.buildSetting("underwater-bg", "underwater-bgm");
        else if (snippetId === 3) this.buildSprites("monkey", "elephant");
        else if (snippetId === 4) this.buildSprites("ship", "asteroid", 100, 100);
        else if (snippetId === 5) this.buildSprites("shark", "fish", 300);
        else if (snippetId === 6) { // jungle action
            this.spriteA.y = 480;
            this.spriteB.y = 480;

            this.spriteA.visible = true;
            this.spriteB.visible = true;

            this.onDelay(() => {
                this.sounds['click'].play();
                this.sounds['monkey'].play();
                this.sounds['elephant'].play('', 0, 0.3);
                let jumpTween:any = this.core.add.tween(this.spriteA).to({y:this.spriteA.y-100}, 350, Phaser.Easing.Quadratic.Out, false, 0, -1, true);

                this.spriteB.angle = 45;
                let rotateTween:any = this.core.add.tween(this.spriteB).to({angle:-45}, 500, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);

                jumpTween.start();
                rotateTween.start();
            }, 3000)

        } else if (snippetId === 7) { // space action
            this.spriteA.y = 300;
            this.spriteB.y = 300;
            this.spriteA.y -= 200;

            this.spriteA.visible = true;
            this.spriteB.visible = true;

            this.onDelay(() => {
                this.sounds['click'].play();
                this.updateAction = ((passedTime:number) => {
                    this.spriteB.angle += 0.1 * passedTime;
                });

                let flyTween:any = this.core.add.tween(this.spriteA).to({y:this.spriteA.y+400}, 1000, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
                flyTween.onLoop.add(() => {
                    let laser:any = this.core.add.sprite(this.spriteA.x, this.spriteA.y, "laser", null, this.runGroup);
                    laser.width = this.spriteA.width*.75;
                    laser.scale.y = laser.scale.x;
                    let laserTween:any = this.runGroup.add.tween(laser).to({x:1000}, 1000);
                    this.sounds['shoot'].play();
                    laserTween.start();
                });
                flyTween.start();
            }, 3000);

        } else if (snippetId === 8) { // underwater action
            this.spriteA.x = 150;
            this.spriteA.y = 150;
            this.spriteA.angle = 5;

            this.spriteB.x = 400;
            this.spriteB.y = 400;
            this.spriteB.angle = 5;

            this.spriteA.visible = true;
            this.spriteB.visible = true;

            this.onDelay(() => {
                this.sounds['click'].play();
                let fishSwimTween:any = this.core.add.tween(this.spriteB).to({x:700, y:550}, 2000);
                let fishFlopTween:any = this.core.add.tween(this.spriteB).to({angle:-5}, 300, null, false, 0, -1, true);
                let sharkSwimTween:any = this.core.add.tween(this.spriteA).to({x:600, y:550}, 2000);
                let sharkFlopTween:any = this.core.add.tween(this.spriteA).to({angle:-5}, 300, null, false, 0, -1, true);
                sharkSwimTween.onComplete.add(() => {
                    this.sounds['eat'].play('', 0, 10);
                    this.spriteB.visible = false;
                });
                sharkFlopTween.start();
                sharkSwimTween.start();

                fishFlopTween.start();
                fishSwimTween.start();
            }, 3000);
        }
    }

    private buildSprites(spriteAName:string, spriteBName:string, widthA:number = 150, widthB:number = 150):void {
        this.spriteB = this.core.add.sprite(650, 0, spriteBName, null, this.runGroup);
        this.spriteA = this.core.add.sprite(150, 0, spriteAName, null, this.runGroup);
        this.spriteA.anchor.setTo(0.5, 0.5);
        this.spriteB.anchor.setTo(0.5, 0.5);
        this.spriteA.width = widthA;
        this.spriteB.width = widthB;
        this.spriteA.scale.y = this.spriteA.scale.x;
        this.spriteB.scale.y = this.spriteB.scale.x;

        this.spriteA.visible = false;
        this.spriteB.visible = false;
    }

    private buildSetting(bgName:string, bgmName:string):void {
        this.core.add.sprite(0, 0, bgName, null, this.runGroup);
        this.sounds[bgmName].play("", 0, 0.1, true);
    }
}
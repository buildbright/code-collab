import {Game} from "../game";
import {Snippet} from "../snippet";

declare var Phaser;

export class PlayScreen {
    private spriteA:any;
    private spriteB:any;

    private updateAction:(passedTime:number) => void;
    private delayFns:any[];

    private group:any;

    public constructor(private game:Game) {
        this.group = game.core.add.group();
        this.delayFns = [];
        this.updateAction = null;
    }

    public show(snippetIds:number[], result:string):void {
        this.group.visible = true;
        this.onDelay(() => {
            if(result == null || result == "okay") {
                this.game.sounds['click'].play();
                this.buildPiece(snippetIds[0]);
                this.buildPiece(snippetIds[1]);
                this.onDelay(() => {
                    this.game.sounds['click'].play();
                    this.buildPiece(snippetIds[2]);
                    this.onDelay(() => {
                        if (result == null) {
                            let style:any = {
                                fontSize:80+"px",
                                fill:"#00FF00"
                            };
                            let lab:any = this.game.core.add.text(0, 0, "Nice Job!", style, this.group);
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
                            let lab:any = this.game.core.add.text(0, 0, "Not Bad!", style, this.group);
                            lab.stroke = '#000000';
                            lab.strokeThickness = 6;
                            lab.anchor.setTo(0.5, 0.5);
                            lab.x = 400;
                            lab.y = 300;
                        }
                    }, 7000);
                }, 3000);
            } else {
                let style:any = {
                    fill:"#00ff00"
                };
                let lab:any = this.game.core.add.text(25, 300, `Error has occurred:\n${result}`, style, this.group);
                lab.cssFont = "36pt monospace";
                lab.anchor.setTo(0, 0.5);
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
                this.game.sounds['click'].play();
                this.game.sounds['monkey'].play();
                this.game.sounds['elephant'].play('', 0, 0.3);
                let jumpTween:any = this.game.core.add.tween(this.spriteA).to({y:this.spriteA.y-100}, 350, Phaser.Easing.Quadratic.Out, false, 0, -1, true);

                this.spriteB.angle = 45;
                let rotateTween:any = this.game.core.add.tween(this.spriteB).to({angle:-45}, 500, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);

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
                this.game.sounds['click'].play();
                this.updateAction = ((passedTime:number) => {
                    this.spriteB.angle += 0.1 * passedTime;
                });

                let flyTween:any = this.game.core.add.tween(this.spriteA).to({y:this.spriteA.y+400}, 1000, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
                flyTween.onLoop.add(() => {
                    let laser:any = this.game.core.add.sprite(this.spriteA.x, this.spriteA.y, "laser", null, this.group);
                    laser.width = this.spriteA.width*.75;
                    laser.scale.y = laser.scale.x;
                    let laserTween:any = this.game.core.add.tween(laser).to({x:1000}, 1000);
                    this.game.sounds['shoot'].play();
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
                this.game.sounds['click'].play();
                let fishSwimTween:any = this.game.core.add.tween(this.spriteB).to({x:700, y:550}, 2000);
                let fishFlopTween:any = this.game.core.add.tween(this.spriteB).to({angle:-5}, 300, null, false, 0, -1, true);
                let sharkSwimTween:any = this.game.core.add.tween(this.spriteA).to({x:600, y:550}, 2000);
                let sharkFlopTween:any = this.game.core.add.tween(this.spriteA).to({angle:-5}, 300, null, false, 0, -1, true);
                sharkSwimTween.onComplete.add(() => {
                    this.game.sounds['eat'].play('', 0, 10);
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
        this.spriteB = this.game.core.add.sprite(650, 0, spriteBName, null, this.group);
        this.spriteA = this.game.core.add.sprite(150, 0, spriteAName, null, this.group);
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
        this.game.core.add.sprite(0, 0, bgName, null, this.group);
        this.game.sounds[bgmName].play("", 0, 0.1, true);
    }

    public update(passedTime:number):void {
        if (this.updateAction != null) this.updateAction(passedTime);
        for (let delayFn of this.delayFns) {
            delayFn.delay -= passedTime;
            if (delayFn.delay <= 0) {
                this.delayFns.splice(this.delayFns.indexOf(delayFn), 1);
                delayFn.fn();
            }
        }
    }

    public hide():void {
        this.updateAction = null;
        this.game.core.sound.stopAll();
        this.group.removeAll(true);
        this.group.visible = false;
    }
}
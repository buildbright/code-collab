System.register([], function(exports_1) {
    var Game;
    return {
        setters:[],
        execute: function() {
            Game = (function () {
                function Game(socket) {
                    var _this = this;
                    this.socket = socket;
                    this.core = new Phaser.Game(800, 600, Phaser.AUTO, 'app', {
                        preload: function () {
                            _this.preload();
                        },
                        create: function () {
                            _this.create();
                        },
                        update: function () {
                            var passedTime = _this.core.time.elapsed;
                            _this.update(passedTime);
                        }
                    });
                    this.updateAction = null;
                }
                Game.prototype.preload = function () {
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
                    this.core.load.audio('eat', 'rsc/sounds/eat.wav');
                    this.core.load.audio('elephant', 'rsc/sounds/elephant.wav');
                    this.core.load.audio('jump', 'rsc/sounds/jump.ogg');
                    this.core.load.audio('jungle-bgm', 'rsc/sounds/jungle-bgm.ogg');
                    this.core.load.audio('monkey', 'rsc/sounds/monkey.wav');
                    this.core.load.audio('shoot', 'rsc/sounds/shoot.ogg');
                    this.core.load.audio('space-bgm', 'rsc/sounds/space-bgm.ogg');
                    this.core.load.audio('underwater', 'rsc/sounds/underwater.mp3');
                    this.core.load.audio('underwater-bgm', 'rsc/sounds/underwater-bgm.ogg');
                };
                Game.prototype.create = function () {
                    this.sounds = {};
                    this.sounds['eat'] = this.core.add.audio('eat');
                    this.sounds['elephant'] = this.core.add.audio('elephant');
                    this.sounds['jump'] = this.core.add.audio('jump');
                    this.sounds['jungle-bgm'] = this.core.add.audio('jungle-bgm');
                    this.sounds['monkey'] = this.core.add.audio('monkey');
                    this.sounds['shoot'] = this.core.add.audio('shoot');
                    this.sounds['space-bgm'] = this.core.add.audio('space-bgm');
                    this.sounds['underwater'] = this.core.add.audio('underwater');
                    this.sounds['underwater-bgm'] = this.core.add.audio('underwater-bgm');
                    this.bgGroup = this.core.add.group();
                    this.buildPiece(1);
                    this.buildPiece(5);
                    this.buildPiece(8);
                };
                Game.prototype.update = function (passedTime) {
                    if (this.updateAction != null)
                        this.updateAction(passedTime);
                };
                Game.prototype.buildGame = function (snippetIds, result) {
                };
                Game.prototype.buildPiece = function (snippetId) {
                    var _this = this;
                    if (snippetId === 0)
                        this.buildSprites("monkey", "elephant");
                    else if (snippetId === 1)
                        this.buildSprites("ship", "asteroid", 100, 100);
                    else if (snippetId === 2)
                        this.buildSprites("shark", "fish", 300);
                    else if (snippetId === 3)
                        this.buildSetting("jungle-bg", "jungle-bgm");
                    else if (snippetId === 4)
                        this.buildSetting("space-bg", "space-bgm");
                    else if (snippetId === 5)
                        this.buildSetting("underwater-bg", "underwater-bgm");
                    else if (snippetId === 6) {
                        this.spriteA.y = 480;
                        this.spriteB.y = 480;
                        this.sounds['monkey'].play();
                        this.sounds['elephant'].play('', 0, 0.3);
                        var jumpTween = this.core.add.tween(this.spriteA).to({ y: this.spriteA.y - 100 }, 350, Phaser.Easing.Quadratic.Out, false, 0, -1, true);
                        this.spriteB.angle = 45;
                        var rotateTween = this.core.add.tween(this.spriteB).to({ angle: -45 }, 500, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
                        jumpTween.start();
                        rotateTween.start();
                    }
                    else if (snippetId === 7) {
                        this.spriteA.y = 300;
                        this.spriteB.y = 300;
                        this.spriteA.y -= 200;
                        this.updateAction = (function (passedTime) {
                            _this.spriteB.angle += 0.1 * passedTime;
                        });
                        var flyTween = this.core.add.tween(this.spriteA).to({ y: this.spriteA.y + 400 }, 1000, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
                        flyTween.onLoop.add(function () {
                            var laser = _this.core.add.sprite(_this.spriteA.x, _this.spriteA.y, "laser");
                            laser.width = _this.spriteA.width * .75;
                            laser.scale.y = laser.scale.x;
                            var laserTween = _this.core.add.tween(laser).to({ x: 1000 }, 1000);
                            _this.sounds['shoot'].play();
                            laserTween.start();
                        });
                        flyTween.start();
                    }
                    else if (snippetId === 8) {
                        this.spriteA.x = 150;
                        this.spriteA.y = 150;
                        this.spriteA.angle = 5;
                        this.spriteB.x = 400;
                        this.spriteB.y = 400;
                        this.spriteB.angle = 5;
                        var fishSwimTween = this.core.add.tween(this.spriteB).to({ x: 700, y: 550 }, 2000);
                        var fishFlopTween = this.core.add.tween(this.spriteB).to({ angle: -5 }, 300, null, false, 0, -1, true);
                        var sharkSwimTween = this.core.add.tween(this.spriteA).to({ x: 600, y: 550 }, 2000);
                        var sharkFlopTween = this.core.add.tween(this.spriteA).to({ angle: -5 }, 300, null, false, 0, -1, true);
                        sharkSwimTween.onComplete.add(function () {
                            _this.sounds['eat'].play('', 0, 10);
                            _this.spriteB.visible = false;
                        });
                        sharkFlopTween.start();
                        sharkSwimTween.start();
                        fishFlopTween.start();
                        fishSwimTween.start();
                    }
                };
                Game.prototype.buildSprites = function (spriteAName, spriteBName, widthA, widthB) {
                    if (widthA === void 0) { widthA = 150; }
                    if (widthB === void 0) { widthB = 150; }
                    this.spriteB = this.core.add.sprite(650, 0, spriteBName);
                    this.spriteA = this.core.add.sprite(150, 0, spriteAName);
                    this.spriteA.anchor.setTo(0.5, 0.5);
                    this.spriteB.anchor.setTo(0.5, 0.5);
                    this.spriteA.width = widthA;
                    this.spriteB.width = widthB;
                    this.spriteA.scale.y = this.spriteA.scale.x;
                    this.spriteB.scale.y = this.spriteB.scale.x;
                };
                Game.prototype.buildSetting = function (bgName, bgmName) {
                    this.bgGroup.create(0, 0, bgName);
                    this.sounds[bgmName].play("", 0, 0.1);
                };
                return Game;
            })();
            exports_1("Game", Game);
        }
    }
});
//# sourceMappingURL=game.js.map
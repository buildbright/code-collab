System.register(["./snippet"], function(exports_1) {
    var snippet_1;
    var Game;
    return {
        setters:[
            function (snippet_1_1) {
                snippet_1 = snippet_1_1;
            }],
        execute: function() {
            Game = (function () {
                function Game(socket) {
                    var _this = this;
                    this.socket = socket;
                    this.goodCount = 0;
                    this.mehCount = 0;
                    this.badCount = 0;
                    this.choiceLabs = [];
                    this.snippetLab1 = null;
                    this.snippetLab2 = null;
                    this.snippetLab3 = null;
                    this.delayFns = [];
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
                };
                Game.prototype.create = function () {
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
                    this.snippets = [
                        snippet_1.Snippet.SETTING_JUNGLE,
                        snippet_1.Snippet.SETTING_SPACE,
                        snippet_1.Snippet.SETTING_SEA,
                        snippet_1.Snippet.CREATE_JUNGLE,
                        snippet_1.Snippet.CREATE_SPACE,
                        snippet_1.Snippet.CREATE_SEA,
                        snippet_1.Snippet.ACTION_JUNGLE,
                        snippet_1.Snippet.ACTION_SPACE,
                        snippet_1.Snippet.ACTION_SEA
                    ];
                    this.showChoices([Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]);
                };
                Game.prototype.update = function (passedTime) {
                    if (this.updateAction != null)
                        this.updateAction(passedTime);
                    for (var _i = 0, _a = this.delayFns; _i < _a.length; _i++) {
                        var delayFn = _a[_i];
                        delayFn.delay -= passedTime;
                        if (delayFn.delay <= 0) {
                            this.delayFns.splice(this.delayFns.indexOf(delayFn), 1);
                            delayFn.fn();
                        }
                    }
                };
                Game.prototype.checkSnippets = function (snippetIds) {
                    snippetIds.sort();
                    if (snippetIds[0] < 0 || snippetIds[0] > 2) {
                        this.buildGame(snippetIds, "Missing background and music.");
                    }
                    else if (snippetIds[1] < 3 || snippetIds[1] > 5) {
                        this.buildGame(snippetIds, "No objects created.");
                    }
                    else if (snippetIds[2] < 6 || snippetIds[2] > 8) {
                        this.buildGame(snippetIds, "Missing actions.");
                    }
                    else {
                        if ((snippetIds[0] === 0 && snippetIds[1] === 3 && snippetIds[2] === 6)
                            || (snippetIds[0] === 1 && snippetIds[1] === 4 && snippetIds[2] === 7)
                            || (snippetIds[0] === 2 && snippetIds[1] === 5 && snippetIds[2] === 8)) {
                            this.buildGame(snippetIds, null);
                        }
                        else {
                            this.buildGame(snippetIds, "okay");
                        }
                    }
                };
                Game.prototype.showChoices = function (choices) {
                    this.updateAction = null;
                    this.runGroup.removeAll(true);
                    this.runGroup.visible = false;
                    this.core.sound.stopAll();
                    var lab1 = this.createChoiceLab(choices[0], 35);
                    var lab2 = this.createChoiceLab(choices[1], 435);
                    this.selectGroup.visible = true;
                };
                Game.prototype.createChoiceLab = function (snippetId, x) {
                    var _this = this;
                    var style = {
                        fill: "#00ff00",
                        font: "16pt monospace"
                    };
                    var lab = this.core.add.text(x, 330, this.snippets[snippetId], style, this.selectGroup);
                    lab.anchor.setTo(0, 0.5);
                    lab.inputEnabled = true;
                    lab.events.onInputOver.add(function () {
                        lab.fill = "#FFFF00";
                    }, this);
                    lab.events.onInputOut.add(function () {
                        lab.fill = "#00FF00";
                    }, this);
                    lab.events.onInputDown.add(function () {
                        console.log(snippetId);
                        _this.choiceLabs[0].destroy();
                        _this.choiceLabs[1].destroy();
                        _this.choiceLabs.length = 0;
                        _this.selectGroup.visible = false;
                        var style = {
                            fill: "#00ff00",
                            font: "64pt monospace"
                        };
                        var lab = _this.core.add.text(400, 300, "Please wait...", style);
                        lab.anchor.setTo(0.5, 0.5);
                    }, this);
                    this.choiceLabs.push(lab);
                };
                Game.prototype.buildGame = function (snippetIds, result) {
                    var _this = this;
                    this.selectGroup.visible = false;
                    this.runGroup.visible = true;
                    this.onDelay(function () {
                        if (result == null || result == "okay") {
                            _this.sounds['click'].play();
                            _this.buildPiece(snippetIds[0]);
                            _this.buildPiece(snippetIds[1]);
                            _this.onDelay(function () {
                                _this.sounds['click'].play();
                                _this.buildPiece(snippetIds[2]);
                                _this.onDelay(function () {
                                    if (result == null) {
                                        _this.goodCount++;
                                        var style = {
                                            fontSize: 80 + "px",
                                            fill: "#00FF00"
                                        };
                                        var lab = _this.core.add.text(0, 0, "Nice Job!", style, _this.runGroup);
                                        lab.stroke = '#000000';
                                        lab.strokeThickness = 6;
                                        lab.anchor.setTo(0.5, 0.5);
                                        lab.x = 400;
                                        lab.y = 300;
                                    }
                                    else {
                                        _this.mehCount++;
                                        var style = {
                                            fontSize: 80 + "px",
                                            fill: "#ffff00"
                                        };
                                        var lab = _this.core.add.text(0, 0, "Not Bad!", style, _this.runGroup);
                                        lab.stroke = '#000000';
                                        lab.strokeThickness = 6;
                                        lab.anchor.setTo(0.5, 0.5);
                                        lab.x = 400;
                                        lab.y = 300;
                                    }
                                    _this.onDelay(function () {
                                        _this.showChoices(null);
                                    }, 5000);
                                }, 7000);
                            }, 3000);
                        }
                        else {
                            _this.badCount++;
                            var style = {
                                fill: "#00ff00"
                            };
                            var lab = _this.core.add.text(25, 300, "Error has occurred:\n" + result, style, _this.runGroup);
                            lab.cssFont = "36pt monospace";
                            lab.anchor.setTo(0, 0.5);
                            _this.onDelay(function () {
                                _this.showChoices(null);
                            }, 7000);
                        }
                    }, 1000);
                };
                Game.prototype.onDelay = function (fn, delay) {
                    this.delayFns.push({
                        delay: delay,
                        fn: fn
                    });
                };
                Game.prototype.buildPiece = function (snippetId) {
                    var _this = this;
                    if (snippetId === 0)
                        this.buildSetting("jungle-bg", "jungle-bgm");
                    else if (snippetId === 1)
                        this.buildSetting("space-bg", "space-bgm");
                    else if (snippetId === 2)
                        this.buildSetting("underwater-bg", "underwater-bgm");
                    else if (snippetId === 3)
                        this.buildSprites("monkey", "elephant");
                    else if (snippetId === 4)
                        this.buildSprites("ship", "asteroid", 100, 100);
                    else if (snippetId === 5)
                        this.buildSprites("shark", "fish", 300);
                    else if (snippetId === 6) {
                        this.spriteA.y = 480;
                        this.spriteB.y = 480;
                        this.spriteA.visible = true;
                        this.spriteB.visible = true;
                        this.onDelay(function () {
                            _this.sounds['click'].play();
                            _this.sounds['monkey'].play();
                            _this.sounds['elephant'].play('', 0, 0.3);
                            var jumpTween = _this.core.add.tween(_this.spriteA).to({ y: _this.spriteA.y - 100 }, 350, Phaser.Easing.Quadratic.Out, false, 0, -1, true);
                            _this.spriteB.angle = 45;
                            var rotateTween = _this.core.add.tween(_this.spriteB).to({ angle: -45 }, 500, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
                            jumpTween.start();
                            rotateTween.start();
                        }, 3000);
                    }
                    else if (snippetId === 7) {
                        this.spriteA.y = 300;
                        this.spriteB.y = 300;
                        this.spriteA.y -= 200;
                        this.spriteA.visible = true;
                        this.spriteB.visible = true;
                        this.onDelay(function () {
                            _this.sounds['click'].play();
                            _this.updateAction = (function (passedTime) {
                                _this.spriteB.angle += 0.1 * passedTime;
                            });
                            var flyTween = _this.core.add.tween(_this.spriteA).to({ y: _this.spriteA.y + 400 }, 1000, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
                            flyTween.onLoop.add(function () {
                                var laser = _this.core.add.sprite(_this.spriteA.x, _this.spriteA.y, "laser", null, _this.runGroup);
                                laser.width = _this.spriteA.width * .75;
                                laser.scale.y = laser.scale.x;
                                var laserTween = _this.core.add.tween(laser).to({ x: 1000 }, 1000);
                                _this.sounds['shoot'].play();
                                laserTween.start();
                            });
                            flyTween.start();
                        }, 3000);
                    }
                    else if (snippetId === 8) {
                        this.spriteA.x = 150;
                        this.spriteA.y = 150;
                        this.spriteA.angle = 5;
                        this.spriteB.x = 400;
                        this.spriteB.y = 400;
                        this.spriteB.angle = 5;
                        this.spriteA.visible = true;
                        this.spriteB.visible = true;
                        this.onDelay(function () {
                            _this.sounds['click'].play();
                            var fishSwimTween = _this.core.add.tween(_this.spriteB).to({ x: 700, y: 550 }, 2000);
                            var fishFlopTween = _this.core.add.tween(_this.spriteB).to({ angle: -5 }, 300, null, false, 0, -1, true);
                            var sharkSwimTween = _this.core.add.tween(_this.spriteA).to({ x: 600, y: 550 }, 2000);
                            var sharkFlopTween = _this.core.add.tween(_this.spriteA).to({ angle: -5 }, 300, null, false, 0, -1, true);
                            sharkSwimTween.onComplete.add(function () {
                                _this.sounds['eat'].play('', 0, 10);
                                _this.spriteB.visible = false;
                            });
                            sharkFlopTween.start();
                            sharkSwimTween.start();
                            fishFlopTween.start();
                            fishSwimTween.start();
                        }, 3000);
                    }
                };
                Game.prototype.buildSprites = function (spriteAName, spriteBName, widthA, widthB) {
                    if (widthA === void 0) { widthA = 150; }
                    if (widthB === void 0) { widthB = 150; }
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
                };
                Game.prototype.buildSetting = function (bgName, bgmName) {
                    this.core.add.sprite(0, 0, bgName, null, this.runGroup);
                    this.sounds[bgmName].play("", 0, 0.1, true);
                };
                return Game;
            })();
            exports_1("Game", Game);
        }
    }
});
//# sourceMappingURL=game.js.map
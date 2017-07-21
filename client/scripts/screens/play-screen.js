System.register([], function(exports_1) {
    var PlayScreen;
    return {
        setters:[],
        execute: function() {
            PlayScreen = (function () {
                function PlayScreen(game) {
                    this.game = game;
                    this.group = game.core.add.group();
                    this.delayFns = [];
                    this.updateAction = null;
                }
                PlayScreen.prototype.show = function (snippetIds, result) {
                    var _this = this;
                    this.group.visible = true;
                    this.onDelay(function () {
                        if (result == null || result == "okay") {
                            _this.game.sounds['click'].play();
                            _this.buildPiece(snippetIds[0]);
                            _this.buildPiece(snippetIds[1]);
                            _this.onDelay(function () {
                                _this.game.sounds['click'].play();
                                _this.buildPiece(snippetIds[2]);
                                _this.onDelay(function () {
                                    if (result == null) {
                                        var style = {
                                            fontSize: 80 + "px",
                                            fill: "#00FF00"
                                        };
                                        var lab = _this.game.core.add.text(0, 0, "Nice Job!", style, _this.group);
                                        lab.stroke = '#000000';
                                        lab.strokeThickness = 6;
                                        lab.anchor.setTo(0.5, 0.5);
                                        lab.x = 400;
                                        lab.y = 300;
                                    }
                                    else {
                                        var style = {
                                            fontSize: 80 + "px",
                                            fill: "#ffff00"
                                        };
                                        var lab = _this.game.core.add.text(0, 0, "Not Bad!", style, _this.group);
                                        lab.stroke = '#000000';
                                        lab.strokeThickness = 6;
                                        lab.anchor.setTo(0.5, 0.5);
                                        lab.x = 400;
                                        lab.y = 300;
                                    }
                                }, 7000);
                            }, 3000);
                        }
                        else {
                            var style = {
                                fill: "#00ff00"
                            };
                            var lab = _this.game.core.add.text(25, 300, "Error has occurred:\n" + result, style, _this.group);
                            lab.cssFont = "36pt monospace";
                            lab.anchor.setTo(0, 0.5);
                        }
                    }, 1000);
                };
                PlayScreen.prototype.onDelay = function (fn, delay) {
                    this.delayFns.push({
                        delay: delay,
                        fn: fn
                    });
                };
                PlayScreen.prototype.buildPiece = function (snippetId) {
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
                            _this.game.sounds['click'].play();
                            _this.game.sounds['monkey'].play();
                            _this.game.sounds['elephant'].play('', 0, 0.3);
                            var jumpTween = _this.game.core.add.tween(_this.spriteA).to({ y: _this.spriteA.y - 100 }, 350, Phaser.Easing.Quadratic.Out, false, 0, -1, true);
                            _this.spriteB.angle = 45;
                            var rotateTween = _this.game.core.add.tween(_this.spriteB).to({ angle: -45 }, 500, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
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
                            _this.game.sounds['click'].play();
                            _this.updateAction = (function (passedTime) {
                                _this.spriteB.angle += 0.1 * passedTime;
                            });
                            var flyTween = _this.game.core.add.tween(_this.spriteA).to({ y: _this.spriteA.y + 400 }, 1000, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
                            flyTween.onLoop.add(function () {
                                var laser = _this.game.core.add.sprite(_this.spriteA.x, _this.spriteA.y, "laser", null, _this.group);
                                laser.width = _this.spriteA.width * .75;
                                laser.scale.y = laser.scale.x;
                                var laserTween = _this.game.core.add.tween(laser).to({ x: 1000 }, 1000);
                                _this.game.sounds['shoot'].play();
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
                            _this.game.sounds['click'].play();
                            var fishSwimTween = _this.game.core.add.tween(_this.spriteB).to({ x: 700, y: 550 }, 2000);
                            var fishFlopTween = _this.game.core.add.tween(_this.spriteB).to({ angle: -5 }, 300, null, false, 0, -1, true);
                            var sharkSwimTween = _this.game.core.add.tween(_this.spriteA).to({ x: 600, y: 550 }, 2000);
                            var sharkFlopTween = _this.game.core.add.tween(_this.spriteA).to({ angle: -5 }, 300, null, false, 0, -1, true);
                            sharkSwimTween.onComplete.add(function () {
                                _this.game.sounds['eat'].play('', 0, 10);
                                _this.spriteB.visible = false;
                            });
                            sharkFlopTween.start();
                            sharkSwimTween.start();
                            fishFlopTween.start();
                            fishSwimTween.start();
                        }, 3000);
                    }
                };
                PlayScreen.prototype.buildSprites = function (spriteAName, spriteBName, widthA, widthB) {
                    if (widthA === void 0) { widthA = 150; }
                    if (widthB === void 0) { widthB = 150; }
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
                };
                PlayScreen.prototype.buildSetting = function (bgName, bgmName) {
                    this.game.core.add.sprite(0, 0, bgName, null, this.group);
                    this.game.sounds[bgmName].play("", 0, 0.1, true);
                };
                PlayScreen.prototype.update = function (passedTime) {
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
                PlayScreen.prototype.hide = function () {
                    this.updateAction = null;
                    this.game.core.sound.stopAll();
                    this.group.removeAll(true);
                    this.group.visible = false;
                };
                return PlayScreen;
            })();
            exports_1("PlayScreen", PlayScreen);
        }
    }
});
//# sourceMappingURL=play-screen.js.map
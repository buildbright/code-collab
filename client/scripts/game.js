System.register(["./screens/wait-screen", "./screens/select-screen", "./screens/play-screen", "./screens/result-screen"], function(exports_1) {
    var wait_screen_1, select_screen_1, play_screen_1, result_screen_1;
    var Game;
    return {
        setters:[
            function (wait_screen_1_1) {
                wait_screen_1 = wait_screen_1_1;
            },
            function (select_screen_1_1) {
                select_screen_1 = select_screen_1_1;
            },
            function (play_screen_1_1) {
                play_screen_1 = play_screen_1_1;
            },
            function (result_screen_1_1) {
                result_screen_1 = result_screen_1_1;
            }],
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
                    this.waitScreen = new wait_screen_1.WaitScreen(this);
                    this.selectScreen = new select_screen_1.SelectScreen(this);
                    this.playScreen = new play_screen_1.PlayScreen(this);
                    this.resultScreen = new result_screen_1.ResultScreen(this);
                    this.hideAll();
                    this.playScreen.show([0, 5, 7], "okay");
                };
                Game.prototype.hideAll = function () {
                    this.waitScreen.hide();
                    this.selectScreen.hide();
                    this.playScreen.hide();
                    this.resultScreen.hide();
                };
                Game.prototype.update = function (passedTime) {
                    this.playScreen.update(passedTime);
                };
                return Game;
            })();
            exports_1("Game", Game);
        }
    }
});
//# sourceMappingURL=game.js.map
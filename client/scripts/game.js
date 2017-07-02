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
                };
                Game.prototype.create = function () {
                    this.buildPiece(5);
                    this.buildPiece(1);
                };
                Game.prototype.update = function (passedTime) {
                    console.log(passedTime);
                };
                Game.prototype.buildGame = function (snippetIds, result) {
                };
                Game.prototype.buildPiece = function (snippetId) {
                    if (snippetId === 0)
                        this.buildSprites("monkey", "elephant", 480);
                    else if (snippetId === 1)
                        this.buildSprites("ship", "asteroid");
                    else if (snippetId === 2)
                        this.buildSprites("shark", "fish");
                    else if (snippetId === 3)
                        this.buildSetting("jungle-bg", "jungle-bgm");
                    else if (snippetId === 4)
                        this.buildSetting("space-bg", "space-bgm");
                    else if (snippetId === 5)
                        this.buildSetting("underwater-bg", "underwater-bgm");
                };
                Game.prototype.buildSprites = function (spriteAName, spriteBName, x) {
                    if (x === void 0) { x = 300; }
                    this.spriteA = this.core.add.sprite(150, x, spriteAName);
                    this.spriteB = this.core.add.sprite(650, x, spriteBName);
                    this.spriteA.anchor.setTo(0.5, 0.5);
                    this.spriteB.anchor.setTo(0.5, 0.5);
                    this.spriteA.width = this.spriteB.width = 150;
                    this.spriteA.scale.y = this.spriteA.scale.x;
                    this.spriteB.scale.y = this.spriteB.scale.x;
                };
                Game.prototype.buildSetting = function (bgName, bgmName) {
                    this.core.add.sprite(0, 0, bgName);
                };
                return Game;
            })();
            exports_1("Game", Game);
        }
    }
});
//# sourceMappingURL=game.js.map
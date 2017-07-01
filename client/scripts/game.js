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
                };
                Game.prototype.create = function () {
                };
                Game.prototype.update = function (passedTime) {
                    console.log(passedTime);
                };
                return Game;
            })();
            exports_1("Game", Game);
        }
    }
});
//# sourceMappingURL=game.js.map
System.register([], function(exports_1) {
    var SimplyBuilder;
    return {
        setters:[],
        execute: function() {
            SimplyBuilder = (function () {
                function SimplyBuilder() {
                    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'app', {
                        preload: function () {
                        },
                        create: function () {
                        },
                        update: function () {
                        }
                    });
                }
                SimplyBuilder.prototype.loadImage = function (name, path) {
                    return this;
                };
                SimplyBuilder.prototype.loadSound = function (name, path) {
                    return this;
                };
                SimplyBuilder.prototype.build = function (createHandler, updateHandler) {
                    //TODO
                    return null;
                };
                return SimplyBuilder;
            })();
            exports_1("SimplyBuilder", SimplyBuilder);
        }
    }
});
//# sourceMappingURL=simply-builder.js.map
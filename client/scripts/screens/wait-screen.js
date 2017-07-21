System.register([], function(exports_1) {
    var WaitScreen;
    return {
        setters:[],
        execute: function() {
            WaitScreen = (function () {
                function WaitScreen(game) {
                    this.game = game;
                    this.group = game.core.add.group();
                    var style = {
                        fill: "#00ff00"
                    };
                    this.lab = game.core.add.text(400, 300, "Please wait...", style, this.group);
                    this.lab.cssFont = "36pt monospace";
                    this.lab.anchor.setTo(0.5, 0.5);
                }
                WaitScreen.prototype.show = function (message) {
                    if (message === void 0) { message = "Please wait..."; }
                    this.lab.text = message;
                    this.group.visible = true;
                };
                WaitScreen.prototype.hide = function () {
                    this.group.visible = false;
                };
                return WaitScreen;
            })();
            exports_1("WaitScreen", WaitScreen);
        }
    }
});
//# sourceMappingURL=wait-screen.js.map
System.register([], function(exports_1) {
    var ResultScreen;
    return {
        setters:[],
        execute: function() {
            ResultScreen = (function () {
                function ResultScreen(game) {
                    this.game = game;
                    this.group = game.core.add.group();
                }
                ResultScreen.prototype.show = function () {
                    this.group.visible = true;
                };
                ResultScreen.prototype.hide = function () {
                    this.group.visible = false;
                };
                return ResultScreen;
            })();
            exports_1("ResultScreen", ResultScreen);
        }
    }
});
//# sourceMappingURL=result-screen.js.map
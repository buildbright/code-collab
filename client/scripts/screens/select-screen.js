System.register([], function(exports_1) {
    var SelectScreen;
    return {
        setters:[],
        execute: function() {
            SelectScreen = (function () {
                function SelectScreen(game) {
                    this.group = game.core.add.group();
                    this.group.add.sprite(0, 0, "select-bg", null, this.group);
                    this.choiceALab = this.createChoiceLab(game, 35);
                    this.choiceBLab = this.createChoiceLab(game, 435);
                }
                SelectScreen.prototype.show = function (choiceA, choiceB) {
                    this.group.visible = true;
                };
                SelectScreen.prototype.hide = function () {
                    this.group.visible = false;
                };
                SelectScreen.prototype.createChoiceLab = function (game, x) {
                    var style = {
                        fill: "#00ff00",
                        font: "16pt monospace"
                    };
                    var lab = game.core.add.text(x, 330, "", style, this.group);
                    lab.anchor.setTo(0, 0.5);
                    lab.inputEnabled = true;
                    lab.events.onInputOver.add(function () {
                        lab.fill = "#FFFF00";
                    }, this);
                    lab.events.onInputOut.add(function () {
                        lab.fill = "#00FF00";
                    }, this);
                    lab.events.onInputDown.add(function () {
                        //TODO
                    }, this);
                };
                return SelectScreen;
            })();
            exports_1("SelectScreen", SelectScreen);
        }
    }
});
//# sourceMappingURL=select-screen.js.map
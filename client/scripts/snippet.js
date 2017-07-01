System.register([], function(exports_1) {
    var Snippet;
    return {
        setters:[],
        execute: function() {
            Snippet = (function () {
                function Snippet() {
                }
                Snippet.CREATE_JUNGLE = "var a = makeMonkey();\nvar b = makeElephant();";
                Snippet.CREATE_SPACE = "var a = makeSpaceShip();\nvar b = makeAsteroid();";
                Snippet.CREATE_SEA = "var a = makeShark();\nvar b = makeFish();";
                Snippet.SETTING_JUNGLE = "setBackground(\"jungle\");\nplayMusic(\"jungle\");";
                Snippet.SETTING_SPACE = "setBackground(\"space\");\nplayMusic(\"space\");";
                Snippet.SETTING_SEA = "setBackground(\"underwater\");\nplayMusic(\"underwater\");";
                Snippet.ACTION_JUNGLE = "a.jump();\nb.trumpet();";
                Snippet.ACTION_SPACE = "a.shoot();\nb.float();";
                Snippet.ACTION_SEA = "a.eat();\nb.swim();";
                return Snippet;
            })();
            exports_1("Snippet", Snippet);
        }
    }
});
//# sourceMappingURL=snippet.js.map
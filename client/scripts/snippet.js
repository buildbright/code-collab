System.register([], function(exports_1) {
    var Snippet;
    return {
        setters:[],
        execute: function() {
            Snippet = (function () {
                function Snippet() {
                }
                Snippet.CREATE_JUNGLE = "var a = makeMonkey();\nvar b = makeLion();";
                Snippet.CREATE_SPACE = "var a = makeSpaceShip();\nvar b = makeAsteroid();";
                Snippet.CREATE_SEA = "var a = makeFish();\nvar b = makeShark();";
                Snippet.SETTING_JUNGLE = "setBackground(\"jungle\");\nsetMusic(\"Zulu\");";
                Snippet.SETTING_SPACE = "setBackground(\"space\");\nsetMusic(\"techno\");";
                Snippet.SETTING_SEA = "setBackground(\"underwater\");\nsetMusic(\"chill\");";
                Snippet.ACTION_JUNGLE = "a.jump();\nb.roar();";
                Snippet.ACTION_SPACE = "a.shoot();\nb.float();";
                Snippet.ACTION_SEA = "a.swim();\nb.eat();";
                return Snippet;
            })();
            exports_1("Snippet", Snippet);
        }
    }
});
//# sourceMappingURL=snippet.js.map
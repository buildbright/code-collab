System.register(["./app"], function(exports_1) {
    var app_1;
    return {
        setters:[
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            new app_1.App();
            window["onSignIn"] = function () {
                console.log("Hello World!");
            };
        }
    }
});
//# sourceMappingURL=startup.js.map
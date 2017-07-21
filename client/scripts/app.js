System.register(["./game"], function(exports_1) {
    var game_1;
    var App;
    return {
        setters:[
            function (game_1_1) {
                game_1 = game_1_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                    $("#connecting").hide();
                    $("#login").hide();
                    $("#active").hide();
                    $("#select").hide();
                    this.renderLoginButton();
                    $("#content").show();
                }
                App.prototype.renderLoginButton = function () {
                    var _this = this;
                    $("#login").show();
                    gapi.signin2.render("my-signin2", {
                        scope: "profile email",
                        onsuccess: function (googleUser) {
                            $("#login").hide();
                            var token = googleUser.getAuthResponse().id_token;
                            _this.connectToServer(token);
                        },
                        onfailure: function () {
                            alert("Google sign-in error has occurred.");
                        }
                    });
                };
                App.prototype.connectToServer = function (token) {
                    var _this = this;
                    $("#connecting").show();
                    this.socket = io("http://127.0.0.1:3000");
                    this.socket.once("connect", function () {
                        _this.socket.once("disconnect", function () {
                            window.location.reload(true);
                        });
                        _this.socket.emit("login", { token: token });
                        _this.socket.once("login", function (data) {
                            $("#connecting").hide();
                            if (data.err != null)
                                alert(data.err);
                            else if (data.group != null) {
                                _this.onJoin(data.group);
                            }
                            else {
                                console.log("Welcome, " + data.username + "!");
                                if (data.groupId != null) {
                                    _this.onJoin(null);
                                }
                                else {
                                    $("#joinBtn").on("click", function () {
                                        $("#select").hide();
                                        var groupName = $("#groupSelect").val();
                                        _this.socket.emit("join", { groupName: groupName });
                                        _this.socket.once("join", function (data) {
                                            $("#select").hide();
                                            if (data.err != null) {
                                                $("#select").show();
                                                alert(data.err);
                                            }
                                            else
                                                _this.onJoin(data.group);
                                        });
                                    });
                                    $("#select").show();
                                }
                            }
                        });
                    });
                };
                App.prototype.onJoin = function (group) {
                    $("#active").show();
                    new game_1.Game(this.socket);
                };
                return App;
            })();
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map
System.register(["./snippet"], function(exports_1) {
    var snippet_1;
    var App;
    return {
        setters:[
            function (snippet_1_1) {
                snippet_1 = snippet_1_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                    //this.choices = [];
                    //this.snippets = [
                    //    Snippet.ACTION_JUNGLE,
                    //    Snippet.ACTION_SEA,
                    //    Snippet.ACTION_SPACE,
                    //    Snippet.CREATE_JUNGLE,
                    //    Snippet.CREATE_SEA,
                    //    Snippet.CREATE_SPACE,
                    //    Snippet.SETTING_JUNGLE,
                    //    Snippet.SETTING_SEA,
                    //    Snippet.SETTING_SPACE
                    //];
                    //this.populateChoices();
                    //console.log(this.choices);
                    //this.choices.push(null);
                    //this.build(this.choices);
                    $("#connecting").hide();
                    $("#login").hide();
                    $("#active").hide();
                    $("#content").show();
                    //        this.renderLoginButton();
                    this.connectToServer(null);
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
                                $("#joinBtn").on("click", function () {
                                    var groupName = $("#groupNameInp").val().trim();
                                    _this.socket.emit("join", { groupName: groupName });
                                    _this.socket.once("join", function (data) {
                                        $("#select").hide();
                                        if (data.err != null)
                                            alert(data.err);
                                        else
                                            _this.onJoin(data.group);
                                    });
                                });
                            }
                        });
                    });
                };
                App.prototype.onJoin = function (group) {
                    //$("#active").show();
                    //new Game(this.socket);
                };
                App.prototype.populateChoices = function () {
                    while (this.choices.length < 3) {
                        var index = Math.floor(Math.random() * this.snippets.length);
                        var choice = this.snippets[index];
                        if (this.choices.indexOf(choice) < 0)
                            this.choices.push(choice);
                    }
                };
                App.prototype.build = function (selections) {
                    var actionCount = 0;
                    var createCount = 0;
                    var settingCount = 0;
                    var jungleCount = 0;
                    var seaCount = 0;
                    var spaceCount = 0;
                    for (var _i = 0; _i < selections.length; _i++) {
                        var selection = selections[_i];
                        if (selection == null)
                            continue;
                        if (selection == snippet_1.Snippet.ACTION_JUNGLE) {
                            actionCount++;
                            jungleCount++;
                        }
                        else if (selection == snippet_1.Snippet.ACTION_SEA) {
                            actionCount++;
                            seaCount++;
                        }
                        else if (selection == snippet_1.Snippet.ACTION_SPACE) {
                            actionCount++;
                            spaceCount++;
                        }
                        else if (selection == snippet_1.Snippet.SETTING_JUNGLE) {
                            settingCount++;
                            jungleCount++;
                        }
                        else if (selection == snippet_1.Snippet.SETTING_SEA) {
                            settingCount++;
                            seaCount++;
                        }
                        else if (selection == snippet_1.Snippet.SETTING_SPACE) {
                            settingCount++;
                            spaceCount++;
                        }
                        else if (selection == snippet_1.Snippet.CREATE_JUNGLE) {
                            createCount++;
                            jungleCount++;
                        }
                        else if (selection == snippet_1.Snippet.CREATE_SEA) {
                            createCount++;
                            seaCount++;
                        }
                        else if (selection == snippet_1.Snippet.CREATE_SPACE) {
                            createCount++;
                            spaceCount++;
                        }
                    }
                    if (actionCount == 1 && createCount == 1 && settingCount == 1) {
                        if (jungleCount == 3 || seaCount == 3 || spaceCount == 3) {
                            console.log("Great Job!");
                        }
                        else {
                            console.log("Meh app.");
                        }
                    }
                    else {
                        console.log("This app sucks.");
                    }
                };
                App.prototype.handleActions = function (actions) {
                    for (var _i = 0; _i < actions.length; _i++) {
                        var action = actions[_i];
                        if (action === 0)
                            this.createJungle();
                        else if (action === 1)
                            this.createSea();
                        else if (action === 2)
                            this.createSpace();
                        else if (action === 3)
                            this.setJungle();
                        else if (action === 4)
                            this.setSea();
                        else if (action === 5)
                            this.setSpace();
                        else if (action === 6)
                            this.doJungle();
                        else if (action === 7)
                            this.doSea();
                        else if (action === 8)
                            this.doSpace();
                    }
                };
                App.prototype.createJungle = function () {
                };
                App.prototype.createSea = function () {
                };
                App.prototype.createSpace = function () {
                };
                App.prototype.setJungle = function () {
                };
                App.prototype.setSea = function () {
                };
                App.prototype.setSpace = function () {
                };
                App.prototype.doJungle = function () {
                };
                App.prototype.doSea = function () {
                };
                App.prototype.doSpace = function () {
                };
                return App;
            })();
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map
var group_1 = require("./group");
var user_1 = require("./user");
var teamNames = ["monkey", "elephant", "shark", "fish", "ship", "laser", "asteroid", "ocean", "jungle", "space"];
var groups = {};
var users = {};
var crypto = require("crypto");
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var request = require('request');
for (var _i = 0; _i < teamNames.length; _i++) {
    var teamName = teamNames[_i];
    var group = new group_1.Group(teamName);
    groups[teamName] = group;
}
var fetchGoogleName = function (token, callback) {
    request("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + encodeURIComponent(token), function (error, response, body) {
        if (error == null && response.statusCode == 200) {
            var userFields = JSON.parse(body);
            var email = userFields.email.toLowerCase();
            callback(email.split("@")[0]);
        }
        else {
            callback(null);
        }
    });
};
io.on('connection', function (connection) {
    connection.data = {};
    //connection.on('create', function(data:any) {
    //    let groupName:string = null;
    //    do {
    //        let wordIndex:number = Math.floor(Math.random()*words.length);
    //        groupName = words[wordIndex] + Math.floor(Math.random()*1000);
    //    } while(groups[groupName] != null);
    //    console.log(groupName);
    //});
    connection.on('login', function (data) {
        if (connection.data == null)
            return;
        var token = data.token;
        //fetchGoogleName(token, function(googleName:string){
        //    connection.data.username = googleName;
        //    users[googleName] = connection;
        //    connection.emit("login", {username:googleName});
        //});
        var username = crypto.randomBytes(64).toString('hex').substr(0, 32);
        connection.data.username = username;
        var user = users[username];
        if (user != null) {
            if (user.connection != null) {
                user.connection.disconnect();
                user.connection = null;
            }
        }
        else {
            user = new user_1.User(username, connection);
            users[username] = user;
        }
        if (user.group != null)
            connection.emit("login", { username: username, groupId: user.group.id });
        else
            connection.emit("login", { username: username, groupId: null });
    });
    connection.on('join', function (data) {
        if (connection.data == null)
            return;
        var groupName = data.groupName;
        var user = users[connection.data.username];
        if (user == null)
            return;
        var group = groups[groupName];
        if (group == null) {
            connection.emit("join", { err: "Invalid team name." });
        }
        else if (group.users.length === 4) {
            connection.emit("join", { err: "Team is full." });
        }
        else if (user.group != null) {
            connection.emit("join", { err: "You are already in a group." });
        }
        else {
            group.users.push(user);
            user.group = group;
            connection.emit("join", {});
        }
    });
    connection.on('select', function (selection) {
        if (connection.data == null)
            return;
    });
    connection.on('disconnect', function () {
        if (connection.data == null)
            return;
    });
});
//let startRound = function(groupId:string):void {
//    let group:Group = groups[groupId];
//    if (group == null) return;
//    for (let memberId of group.memberIds) {
//        let user:any = users[memberId];
//        if (user != null) user.emit(eventName, data);
//    }
//};
var onSelect = function (snippetId, userId) {
};
var onQuit = function (userId) {
};
server.listen(3000);
console.log("Code Collab server has started.");
//# sourceMappingURL=index.js.map
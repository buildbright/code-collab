var group_1 = require("./group");
var groups = {};
var users = {};
var crypto = require("crypto");
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function (connection) {
    console.log("Connected!");
    connection.data = { id: crypto.randomBytes(64).toString('hex') };
    users[connection.data.id] = connection;
    connection.on('join', function (groupName) {
        if (connection.data == null)
            return;
        var group = null;
        if (groupName != null && groupName.trim().length > 0) {
            group = groups[groupName];
            if (group == null) {
                connection.emit("join", { err: "Group not found." });
                return;
            }
            else if (group.memberIds.indexOf(connection.data.id) > 0) {
                connection.emit("join", { err: "You are already in the group." });
                return;
            }
            else if (group.memberIds.length === 4) {
                connection.emit("join", { err: "Group is full." });
                return;
            }
        }
        else {
            var groupId = crypto.randomBytes(64).toString('hex').substr(0, 8);
            if (groups[groupId] != null) {
                connection.emit("join", { err: "Server error. Please try again." });
                return;
            }
            connection.data.groupId = groupId;
            groups[groupId] = group;
            group = new group_1.Group();
            connection.emit("join", { groupId: groupId, memberIds: group.memberIds, earnings: group.earnings });
        }
        group.memberIds.push(connection.data.id);
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
var messageGroup = function (groupId, eventName, data) {
    if (data === void 0) { data = null; }
    var group = groups[groupId];
    if (group != null) {
        for (var _i = 0, _a = group.memberIds; _i < _a.length; _i++) {
            var memberId = _a[_i];
            var user = users[memberId];
            if (user != null)
                user.emit(eventName, data);
        }
    }
};
var onJoin = function (groupName, userId) {
    var group = groups[groupName];
    if (group != null) {
        group = new group_1.Group();
    }
};
var onSelect = function (snippetId, userId) {
};
var onQuit = function (userId) {
};
server.listen(3000);
//# sourceMappingURL=index.js.map
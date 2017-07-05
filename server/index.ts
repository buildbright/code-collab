import {Group} from "./group";

declare function require(moduleName:string):any;


let teamNames:string[] = ["Monkey", "Elephant", "Shark", "Fish", "Ship", "Laser", "Asteroid", "Ocean", "Jungle", "Space"];

let groups:any = {};
let users:any = {};

var crypto = require("crypto");
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var request = require('request');

for (let teamName of teamNames) {
    groups[teamName] = new Group();
}

let fetchGoogleName = function(token:string, callback:(googleName:string) => void):void {
    request("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+encodeURIComponent(token), (error, response, body) => {
        if (error == null && response.statusCode == 200) {
            var userFields = JSON.parse(body);
            var email:string = userFields.email.toLowerCase();
            callback(email.split("@")[0]);
        }  else {
            callback(null);
        }
    });
};

io.on('connection', function(connection:any) {
    connection.data = {};

    connection.on('create', function(data:any) {
        let groupName:string = null;
        do {
            let wordIndex:number = Math.floor(Math.random()*words.length);
            groupName = words[wordIndex] + Math.floor(Math.random()*1000);
        } while(groups[groupName] != null);
        console.log(groupName);
    });

    connection.on('login', function(data:any) {
        if (connection.data == null) return;
        let token:string = data.token;
        connection.data.username = "Test";
        users["Test"] = connection;
        connection.emit("login", {username:"Test"});
        //fetchGoogleName(token, function(googleName:string){
        //    connection.data.username = googleName;
        //    users[googleName] = connection;
        //    connection.emit("login", {username:googleName});
        //});
    });

    connection.on('join', function(groupName:string) {
        if (connection.data == null) return;
        let group:Group = null;
        if (groupName != null && groupName.trim().length > 0) {
            group = groups[groupName];
            if (group == null) {
                connection.emit("join", {err:"Group not found."});
                return;
            } else if (group.memberIds.indexOf(connection.data.id) > 0) {
                connection.emit("join", {err:"You are already in the group."});
                return;
            } else if (group.memberIds.length === 4) {
                connection.emit("join", {err:"Group is full."});
                return;
            }
        } else {
            let groupId:string = crypto.randomBytes(64).toString('hex').substr(0, 8);
            if (groups[groupId] != null) {
                connection.emit("join", {err:"Server error. Please try again."});
                return;
            }
            connection.data.groupId = groupId;
            groups[groupId] = group;

            group = new Group();
            connection.emit("join", {groupId:groupId, memberIds:group.memberIds, earnings:group.earnings});
        }
        group.memberIds.push(connection.data.id);
    });

    connection.on('select', function(selection:number) {
        if (connection.data == null) return;
    });

    connection.on('disconnect', function() {
        if (connection.data == null) return;
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

let messageGroup = function(groupId:string, eventName:string, data:any = null):void {
    let group:Group = groups[groupId];
    if (group != null) {
        for (let memberId of group.memberIds) {
            let user:any = users[memberId];
            if (user != null) user.emit(eventName, data);
        }
    }
};

var onJoin = function(groupName:string, userId:string) {
    let group:Group = groups[groupName];
    if (group != null) {
        group = new Group();
    }
};

var onSelect = function(snippetId:number, userId:string) {

};

var onQuit = function(userId:string) {

};

server.listen(3000);
console.log("Code Collab server has started.");



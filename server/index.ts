import {Group} from "./group";
import {User} from "./user";

declare function require(moduleName:string):any;

let teamNames:string[] = ["monkey", "elephant", "shark", "fish", "ship", "laser", "asteroid", "ocean", "jungle", "space"];

let groups:{[groupName:string]:Group;} = {};
let users:{[username:string]:User;} = {};

var crypto = require("crypto");
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var request = require('request');

for (let teamName of teamNames) {
    let group:Group = new Group(teamName);
    groups[teamName] = group;
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

    //connection.on('create', function(data:any) {
    //    let groupName:string = null;
    //    do {
    //        let wordIndex:number = Math.floor(Math.random()*words.length);
    //        groupName = words[wordIndex] + Math.floor(Math.random()*1000);
    //    } while(groups[groupName] != null);
    //    console.log(groupName);
    //});

    connection.on('login', function(data:any) {
        if (connection.data == null) return;
        let token:string = data.token;
        //fetchGoogleName(token, function(googleName:string){
        //    connection.data.username = googleName;
        //    users[googleName] = connection;
        //    connection.emit("login", {username:googleName});
        //});
        let username:string = crypto.randomBytes(64).toString('hex').substr(0, 32);
        connection.data.username = username;
        let user:User = users[username];
        if (user != null) {
            if (user.connection != null) {
                user.connection.disconnect();
                user.connection = null;
            }
        } else {
            user = new User(username, connection);
            users[username] = user;
        }
        if (user.group != null) connection.emit("login", {username:username, groupId:user.group.id});
        else connection.emit("login", {username:username, groupId:null});
    });

    connection.on('join', function(data:any) {
        if (connection.data == null) return;
        let groupName:string = data.groupName;
        let user:User = users[connection.data.username];
        if (user == null) return;
        let group:Group = groups[groupName];

        if (group == null) {
            connection.emit("join", {err:"Invalid team name."});
        } else if (group.users.length === 4) {
            connection.emit("join", {err:"Team is full."});
        } else if (user.group != null) {
            connection.emit("join", {err:"You are already in a group."});
        } else {
            group.users.push(user);
            user.group = group;
            connection.emit("join", {});
        }
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

var onSelect = function(snippetId:number, userId:string) {

};

var onQuit = function(userId:string) {

};

server.listen(3000);
console.log("Code Collab server has started.");



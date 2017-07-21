import {Snippet} from "./snippet";
import {Game} from "./game";

declare var io, Phaser, gapi, $;

export class App {
    private socket:any;

    public constructor() {
        $("#connecting").hide();
        $("#login").hide();
        $("#active").hide();
        $("#select").hide();

        this.renderLoginButton();

        $("#content").show();
    }

    private renderLoginButton():void {
        $("#login").show();
        gapi.signin2.render("my-signin2", {
            scope : "profile email",
            onsuccess : (googleUser:any) => {
                $("#login").hide();
                let token:string = googleUser.getAuthResponse().id_token;
                this.connectToServer(token);
            },
            onfailure : () => {
                alert("Google sign-in error has occurred.");
            }
        });
    }

    private connectToServer(token:string):void {
        $("#connecting").show();
        this.socket = io("http://127.0.0.1:3000");
        this.socket.once("connect", () => {
            this.socket.once("disconnect", () => {
                window.location.reload(true);
            });
            this.socket.emit("login", {token:token});
            this.socket.once("login", (data:any) => {
                $("#connecting").hide();
                if (data.err != null) alert(data.err);
                else if (data.group != null) {
                    this.onJoin(data.group);
                } else {
                    console.log(`Welcome, ${data.username}!`);
                    if (data.groupId != null) {
                        this.onJoin(null);
                    } else {
                        $("#joinBtn").on("click", () => {
                            $("#select").hide();
                            let groupName:string = $("#groupSelect").val();
                            this.socket.emit("join", {groupName:groupName});
                            this.socket.once("join", (data:any) => {
                                $("#select").hide();
                                if (data.err != null) {
                                    $("#select").show();
                                    alert(data.err);
                                } else this.onJoin(data.group);
                            });
                        });
                        $("#select").show();
                    }
                }
            });
        });
    }

    private onJoin(group:any):void {
        $("#active").show();
        new Game(this.socket);
    }
}
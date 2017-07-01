import {Snippet} from "./snippet";
import {Game} from "./game";

declare var io, Phaser, gapi, $;

export class App {
    private snippets:string[];
    private choices:string[];
    private socket:any;
    private phaser:any;

    public constructor() {
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

        this.renderLoginButton();
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
                else {
                    console.log(`Welcome, ${data.username}!`);
                    $("#active").show();
                    new Game(this.socket);
                }
            });
        });
    }

    private populateChoices():void {
        while (this.choices.length < 3) {
            let index:number = Math.floor(Math.random()*this.snippets.length);
            let choice:string = this.snippets[index];
            if (this.choices.indexOf(choice) < 0) this.choices.push(choice);
        }
    }

    private build(selections:string[]):void {
        let actionCount:number = 0;
        let createCount:number = 0;
        let settingCount:number = 0;

        let jungleCount:number = 0;
        let seaCount:number = 0;
        let spaceCount:number = 0;

        for (let selection of selections) {
            if (selection == null) continue;

            if (selection == Snippet.ACTION_JUNGLE) {
                actionCount++;
                jungleCount++;
            } else if (selection == Snippet.ACTION_SEA) {
                actionCount++;
                seaCount++;
            } else if (selection == Snippet.ACTION_SPACE) {
                actionCount++;
                spaceCount++;
            } else if (selection == Snippet.SETTING_JUNGLE) {
                settingCount++;
                jungleCount++;
            } else if (selection == Snippet.SETTING_SEA) {
                settingCount++;
                seaCount++;
            } else if (selection == Snippet.SETTING_SPACE) {
                settingCount++;
                spaceCount++;
            } else if (selection == Snippet.CREATE_JUNGLE) {
                createCount++;
                jungleCount++;
            } else if (selection == Snippet.CREATE_SEA) {
                createCount++;
                seaCount++;
            } else if (selection == Snippet.CREATE_SPACE) {
                createCount++;
                spaceCount++;
            }
        }

        if (actionCount == 1 && createCount == 1 && settingCount == 1) {
            if (jungleCount == 3 || seaCount == 3 || spaceCount == 3) {
                console.log("Great Job!");
            } else {
                console.log("Meh app.");
            }
        } else {
            console.log("This app sucks.");
        }
    }

    private handleActions(actions:number[]):void {
        for (let action of actions) {
            if (action === 0) this.createJungle();
            else if (action === 1) this.createSea();
            else if (action === 2) this.createSpace();
            else if (action === 3) this.setJungle();
            else if (action === 4) this.setSea();
            else if (action === 5) this.setSpace();
            else if (action === 6) this.doJungle();
            else if (action === 7) this.doSea();
            else if (action === 8) this.doSpace();
        }
    }

    public createJungle():void {

    }

    public createSea():void {

    }

    public createSpace():void {

    }

    public setJungle():void {

    }

    public setSea():void {

    }

    public setSpace():void {

    }

    public doJungle():void {

    }

    public doSea():void {

    }

    public doSpace():void {

    }
}
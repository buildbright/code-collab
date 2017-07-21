import {Game} from "../game";
export class WaitScreen {

    private group:any;
    private lab:any;

    public constructor(game:Game) {
        this.group = game.core.add.group();
        let style:any = {
            fill:"#00ff00"
        };
        this.lab = game.core.add.text(400, 300, "Please wait...", style, this.group);
        this.lab.cssFont = "36pt monospace";
        this.lab.anchor.setTo(0.5, 0.5);
    }

    public show(message:string = "Please wait..."):void {
        this.lab.text = message;
        this.group.visible = true;
    }

    public hide():void {
        this.group.visible = false;
    }
}
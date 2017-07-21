import {Game} from "../game";
import {Snippet} from "../snippet";
export class ResultScreen {
    private group:any;

    public constructor(private game:Game) {
        this.group = game.core.add.group();
    }

    public show():void {
        this.group.visible = true;
    }

    public hide():void {
        this.group.visible = false;
    }
}
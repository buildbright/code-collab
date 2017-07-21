import {Game} from "../game";
import {Snippet} from "../snippet";
export class SelectScreen {

    private group:any;

    private choiceALab:any;
    private choiceBLab:any;

    public constructor(private game:Game) {
        this.group = game.core.add.group();
        this.game.core.add.sprite(0, 0, "select-bg", null, this.group);

        this.choiceALab = this.createChoiceLab(game, 35);
        this.choiceBLab = this.createChoiceLab(game, 435);
    }

    public show(choiceA:number, choiceB:number):void {
        this.choiceALab.text = Snippet.LIST[choiceA];
        this.choiceBLab.text = Snippet.LIST[choiceB];

        this.group.visible = true;
    }

    public hide():void {
        this.group.visible = false;
    }

    private createChoiceLab(game:Game, x:number):any {
        let style:any = {
            fill:"#00ff00",
            font:"16pt monospace"
        };

        let lab:any = game.core.add.text(x, 330, "", style, this.group);

        lab.anchor.setTo(0, 0.5);

        lab.inputEnabled = true;

        lab.events.onInputOver.add(() => {
            lab.fill = "#FFFF00";
        }, this);

        lab.events.onInputOut.add(() => {
            lab.fill = "#00FF00";
        }, this);

        lab.events.onInputDown.add(() => {
            //TODO
        }, this);

        return lab;
    }
}
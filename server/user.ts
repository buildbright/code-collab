import {Group} from "./group";

export class User {

    public group:Group;
    public choices:number[];
    public selection:number;

    public constructor(public username:string, public connection:any) {
        this.group = null;
        this.choices = null;
        this.selection = null;
    }
}
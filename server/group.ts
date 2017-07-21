import {User} from "./user";
export class Group {
    public users:User[];
    public earnings:number = 0;
    public goodAppCount:number = 0;
    public mehAppCount:number = 0;
    public badAppCount:number = 0;

    public constructor(public id:string) {
        this.users = []
        this.earnings = 0;
        this.goodAppCount = 0;
        this.mehAppCount = 0;
        this.badAppCount = 0;
    }
}
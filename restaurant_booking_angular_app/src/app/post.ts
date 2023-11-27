import { Data } from "@angular/router";
import { User } from "./user";

export interface Post {

    cId : number;
    userId:number;
    itemId:number;
itemName:String;
quantity:number;
total:number;
user?:User;
orderDate?: Date;

}




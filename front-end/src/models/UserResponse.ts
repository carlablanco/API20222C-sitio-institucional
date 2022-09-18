export class UserResponse{
    id: any;
    name: any;
    picture: any;
    type: any;
    email: any;
    constructor(id: any,name: any,picture: any, type: any, email: any){
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.type = type;
        this.email = email;
    }
}
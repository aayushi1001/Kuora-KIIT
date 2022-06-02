export class userDetails {
    public name: string = "";
    public email: string = "";
    public signupas: string = "";
    public bio: string = "";
    public verified: string = "";
    public pic: string = "";
    public blocked: boolean = false;

    constructor(name: string, email: string, profile: string, bio: string, verified: string, blocked: boolean, pic: string) {
        this.name = name;
        this.email = email;
        this.signupas = profile;
        this.bio = bio;
        this.verified = verified;
        this.pic = pic;
        this.blocked = blocked;
    }
}
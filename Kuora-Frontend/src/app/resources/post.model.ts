export class Post {
    public creator_email: string = "";
    public title: string = "";
    public tag: string = "";
    public article: string = "";
    public postid: string = "";
    public verified: boolean = false;

    constructor(creator_email:string, title:string, tag:string, article:string, postid:string, verified: boolean)
    {
        this.creator_email = creator_email;
        this.title = title;
        this.tag = tag;
        this.article = article;
        this.postid = postid;
        this.verified = verified;
    }
}

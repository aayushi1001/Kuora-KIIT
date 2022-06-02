import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "./post.model";

@Injectable()

export class PostStoreService {

  constructor() { }
   public posts:Post[]=[];
    public postsUpdated =new Subject<Post[]>();
    public postCategory:Post[]=[];

    setEmpty(){
        this.posts=[];
    }
    setPosts(creator_email:string, title:string, tag:string, article:string, postid:string, verified:boolean){
        this.posts.push(new Post(creator_email,title,tag,article,postid,verified));
        this.postsUpdated.next([...this.posts]);
    }
    getPosts():Post[]{
        return this.posts;
    }
    getPostCategory(category:string):Post[]{
        this.getPosts();
        this.postCategory =[];
        for(let post of this.posts){
            if(post.tag===category){
                this.postCategory.push(post);
            }
        }
        return this.postCategory;
    }
    getPostUpdateListner(){
        return this.postsUpdated.asObservable();
    }
    delPost(id:string){
        const updatedposts=[...this.posts];
        const delIndex= this.posts.findIndex(p=>p.postid === id);
        updatedposts.splice(delIndex, 1);
        this.posts = updatedposts;

        this.postsUpdated.next([...this.posts]);
    }
    updatePost(id:string,newPost:Post){
        const updatedposts=[...this.posts];
        const delIndex= this.posts.findIndex(p=>p.postid === id);
        updatedposts[delIndex] = newPost;
        this.posts = updatedposts;
        this.postsUpdated.next([...this.posts]);
    }

    updateImg(id:string,newPost:Post){
        const updatedposts=[...this.posts];
        const delIndex= this.posts.findIndex(p=>p.postid === id);
        updatedposts[delIndex] = newPost;
        this.posts = updatedposts;
        this.postsUpdated.next([...this.posts]);
    }

    addPost(newPost:Post) {
        const updatedposts=[...this.posts];
        updatedposts.push(newPost);
        this.posts = updatedposts;
        this.postsUpdated.next([...this.posts]);
    }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/resources/login.service';
import { PostQuestion } from 'src/app/resources/post-question.service';
import { TagsService } from 'src/app/resources/tags.service';
import {PostStoreService} from "../../../resources/post-store.service";
import {Post} from "../../../resources/post.model";

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit {

  postQuestionForm!: FormGroup;
  Tags:  {label:string , icon:string} [] | undefined;
  constructor(private loginService: LoginService,
              private postQuestion: PostQuestion,
              private tags: TagsService,
              private poststoreService:PostStoreService) { }

  ngOnInit(): void {
    this.postQuestionForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'category': new FormControl(null, [Validators.required]),
      'question': new FormControl(null, [Validators.required])
    });
    this.Tags = this.tags.getTagNames();
  }

  onSubmit(){
    const postData = {
      creator_email: this.loginService.getActiveUserDetails().email,
      title: this.postQuestionForm.controls['title'].value,
      tag: this.postQuestionForm.controls['category'].value,
      article: this.postQuestionForm.controls['question'].value,
      verified: this.loginService.getActiveUserDetails().verified
    }
    this.postQuestion.postQuestion(postData).subscribe(responseData => {
      if(responseData.code === 200){
        this.postQuestionForm.reset();
        if(responseData.Post)
          this.poststoreService.addPost(responseData.Post);
      }
    });

  }
}

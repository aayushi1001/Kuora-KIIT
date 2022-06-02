import { Component, OnInit } from '@angular/core';
import { ReportGetServiceService } from 'src/app/resources/report-get-service.service';
import { DeletePostService } from 'src/app/resources/delete-post.service';
import { DeleteReportService } from 'src/app/resources/delete-report.service';

@Component({
  selector: 'app-reported-posts',
  templateUrl: './reported-posts.component.html',
  styleUrls: ['./reported-posts.component.css']
})
export class ReportedPostsComponent implements OnInit {

  constructor(private getReports : ReportGetServiceService, private deletePost:DeletePostService, private deleteReport : DeleteReportService) { }

  ReportsList:any[]=[];
  ReportedByList:any[]=[];


  ngOnInit(): void {
    this.getReports.GetReportedPostsList().subscribe(responseData => {this.ReportsList=responseData.user});
  }

  OpenReportedByModal(reportedbylist:any){
    this.ReportedByList=reportedbylist;

  }

  IgnorePost(postId:any){
      this.deleteReport.DeleteReport(postId).subscribe(responseData => {
        this.ReportsList = this.ReportsList.filter(function( obj ) {
          return obj.postid !== postId;
        });
      });
  }

  DeletePost(postId:any ){

    this.deletePost.DeletePost(postId).subscribe((responseData:any) => {
      });
      this.deleteReport.DeleteReport(postId).subscribe((responseData:any) => {

        if(responseData.ok===1){
          this.ReportsList = this.ReportsList.filter(function( obj ) {
            return obj.postid !== postId;
          });;
    }
    else{
      console.log("Error in api");
    }
      console.log("Unblocked : "+responseData)
    });
    //this.getUsersService.GetList().subscribe(responseData => {this.UsersList=responseData.user});
  }

}

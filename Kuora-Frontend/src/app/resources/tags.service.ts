import { Injectable } from "@angular/core";

@Injectable()
export class TagsService {
    private tagNames: {label:string , icon:string} [] = [
      {
        label: 'Academic',
        icon: 'bi bi-journal-bookmark',
      },
      {
        label: 'KIIT Campus',
        icon: 'bi bi-bank',
      },
      {
        label: 'Sports',
        icon: 'bi bi-controller',
      },
      {
        label: 'Internship',
        icon: 'bi bi-pc-display',
      },
      {
        label: 'Job Opportunity',
        icon: 'bi bi-tools',
      },
      {
        label: 'Higher Education',
        icon: 'bi bi-mortarboard-fill',
      },
      {
        label: 'Student Society',
        icon: 'bi bi-music-note-list',
      },
      {
        label: 'Hackathons',
        icon: 'bi bi-laptop-fill',
      },
      {
        label: 'Hostel',
        icon: 'bi bi-building',
      },
      {
        label: 'Training & Placement',
        icon: 'bi bi-briefcase-fill',
      },
      {
        label: 'Others',
        icon: 'bi bi-boxes',
      },
    ];

    getTagNames(){
        return this.tagNames;
    }
}

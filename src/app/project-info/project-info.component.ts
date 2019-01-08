import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../project';
import { Credit } from '../credit';
import { ProjectService } from '../project.service';


@Component({
  selector: '[app-project-info]',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  @Input() credit: Credit;

  project: Project = {
    id: null,
    titulo: null,
    organismo: null,
    estado: null,
  }

  display = false;
  found = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {  }

  getProject(id: string) {
    this.projectService.getProject(id)
      .subscribe((project) => {
        if (!project){
          console.log("Project not found")
          this.found = false;
        } else {
          this.project = project;
          this.found = true;
        }
      });
  }

  displayInfo() {
    this.getProject(this.credit.projectId);
    this.display = ! this.display;
  }

}

import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  name: string = '';
  description: string = '';
  isSaving: boolean = false;

  constructor(public projectService: ProjectService) {}

  handleSave() {
    this.isSaving = true;
    this.projectService
      .create({ name: this.name, description: this.description })
      .then(({ data }) => {
        this.isSaving = false;
        Swal.fire({
          icon: 'success',
          title: 'Project saved successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.name = '';
        this.description = '';
        return data;
      })
      .catch((error) => {
        this.isSaving = false;
        Swal.fire({
          icon: 'error',
          title: 'An Error Occured!',
          showConfirmButton: false,
          timer: 1500,
        });
        return error;
      });
  }
}

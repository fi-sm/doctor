import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.scss']
})
export class EditEntryComponent implements OnInit {

  user= {
    patientFirstname: '',
    patientLastName: '',
    contactNumber: ''
  };
  title: string;
  btnActionText: string;

  constructor(public dialogRef: MatDialogRef<EditEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = 'Add user';
      this.btnActionText = 'Save';
      if(this.data.model) {
        this.user = JSON.parse(JSON.stringify(this.data.model));
        this.title = 'Edit user';
        this.btnActionText = 'Update';
      }
    }

  ngOnInit() {}

  close(model) {
    this.dialogRef.close({
      model: model
    })
  }

}

import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MdDialogRef<any>) { }

}

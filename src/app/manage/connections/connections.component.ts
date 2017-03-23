import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ConnectionService } from '../../services/connection/connection.service';
import { Connection } from '../../models/connection';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  connections: Connection[] = [];
  key: number;

  constructor(
    private connectionService: ConnectionService,
    private authService: AuthService,
    public router: Router,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) {
    this.populateConnections = this.populateConnections.bind(this);
    this.handleError = this.handleError.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  ngOnInit() {
    this.connectionService.getAll().subscribe(this.populateConnections, this.handleError);
  }

  populateConnections(data): void {
    this.connections.push.apply(this.connections, data.json().data);
  }

  handleError(err): void {
    if (err.status === 401) {
      this.authService.logout();
      this.router.navigate(['/auth']);
    }
  }

  confirmDelete(key) {
    this.key = key;
    const config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(DeleteDialogComponent, config);

    this.dialogRef.afterClosed().subscribe(this.deleteConnection);
  }

  deleteConnection(result) {
    if (result) {
      this.connectionService.remove(this.key).subscribe(this.handleDelete);
    }
  }

  handleDelete() {
    const ix = this.connections.findIndex((usr) => usr.id === this.key);
    this.connections.splice(ix, 1);
    this.key = undefined;
  }
}

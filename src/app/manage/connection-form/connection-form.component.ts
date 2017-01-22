import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection/connection.service';
import { Connection } from '../../models/connection';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent implements OnInit {
  connection: Connection = new Connection('', '', '', '');
  id: number;
  saving: boolean = false;

  constructor(private connectionService: ConnectionService, private route: ActivatedRoute) {
    this.saveComplete = this.saveComplete.bind(this);
    this.populateConnection = this.populateConnection.bind(this);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getConnection();
  }

  getConnection() {
    if (this.id) {
      this.connectionService.getById(this.id).subscribe(this.populateConnection);
    }
  }

  populateConnection(data) {
    if (data.json().data) {
      this.connection = data.json().data as Connection;
    }
  }

  addOrEdit(): string {
    return this.id === undefined ? 'Add' : 'Edit';
  }

  onSubmit(): void {
    this.saving = true;
    if (this.id) {
      this.connectionService.update(this.id, this.connection).subscribe(this.saveComplete);
    } else {
      this.connectionService.save(this.connection).subscribe(this.saveComplete);
    }
  }

  saveComplete(data) {
    let response = data.json();
    this.id = response.data.id;
    this.saving = false;
  }
}

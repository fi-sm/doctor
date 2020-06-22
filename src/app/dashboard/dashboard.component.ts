import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { EditEntryComponent } from './modals/edit-entity/edit-entry.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'contactNumber', 'patientFirstname', 'patientLastName', 'address', 'action'];
  exampleDatabase = null;
  data = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService,
    public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadData();
  }

  private loadData() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataService.getUsers(this.paginator.pageIndex);
        }),
        map(data => {

          this.isLoadingResults = false;
          this.resultsLength = parseInt(data.total);

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  addUser() {
    this.dialog.open(EditEntryComponent, {
      width: '600px',
      data: {
      }
    }).afterClosed()
    .subscribe(res => {
      if (res) {
        this.dataService.addUser(res.model)
        .subscribe((response) => {
          this.loadData();
        });
      }
    });
  }

  openEditModel(row) {
    this.dialog.open(EditEntryComponent, {
      width: '600px',
      data: {
        model: row
      }
    }).afterClosed()
    .subscribe(res => {
      if (res) {
        this.dataService.updateUser(res.model)
        .subscribe((response) => {
          this.loadData();
        });
      }
    });
  }

  delete(row) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        name: row.patientFirstname + ' ' + row.patientLastName
      }
    }).afterClosed()
    .subscribe(action => {
      if (action) {
        this.dataService.deleteUser(row.id, action)
        .subscribe((response) => {
          this.loadData();
        });
      }
    });
  }
}



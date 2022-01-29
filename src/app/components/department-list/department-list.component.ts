import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Sort, MatSort } from '@angular/material/sort'
import { DepartmentService } from '../../services/department.service'
import { Department } from '../../models/department.model'
import { DepartmentDetailComponent } from '../department-detail/department-detail.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit {
    displayedColumns: string[] = ['_id', 'name', 'dep_name']
    dataSource: any
    @ViewChild(MatSort) sort: MatSort

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
        this.dataSource.filter = filterValue.trim().toLowerCase()
    }

    constructor(
        private departmentService: DepartmentService,
        public dialog: MatDialog
    ) {}

    openDialog(data: Department) {
        const dialogRef = this.dialog.open(DepartmentDetailComponent, {
            width: '20rem',
            data,
        })

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`)
        })
    }

    ngOnInit(): void {
        this.departmentService
            .getAllDepartment()
            .subscribe((data: Department[]) => {
                console.log(data)
                this.dataSource = new MatTableDataSource(data)
                this.dataSource.sort = this.sort

                const sortState: Sort = { active: 'name', direction: 'desc' }
                this.sort.active = sortState.active
                this.sort.direction = sortState.direction
                this.sort.sortChange.emit(sortState)
            })
    }

    selectedRow(data: Department) {
        // console.log(ev)
        this.openDialog(data)
    }
}

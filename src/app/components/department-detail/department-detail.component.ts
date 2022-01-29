import { Component, OnInit, Inject } from '@angular/core'
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { Department } from '../../models/department.model'
import { DepartmentService } from '../../services/department.service'

@Component({
    selector: 'app-department-detail',
    templateUrl: './department-detail.component.html',
    styleUrls: ['./department-detail.component.scss'],
})
export class DepartmentDetailComponent implements OnInit {
    dep_data: Department

    constructor(
        public dialogRef: MatDialogRef<DepartmentDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Department,
        private departmentService: DepartmentService
    ) {}

    ngOnInit(): void {
        this.departmentService.getSingleDepartment(this.data._id).subscribe(
            (data: Department) => {
                this.dep_data = data
                console.log(this.dep_data)
            },
            (error: any) => {
                console.log(error)
            }
        )
    }
}

import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Renderer2,
} from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ValidateInputService } from '../../services/validate-input.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    userForm: any
    submitted = false

    @ViewChild('registerBtn', { read: ElementRef })
    registerBtn: ElementRef

    constructor(
        private formBuilder: FormBuilder,
        private validateInputService: ValidateInputService,
        private authService: AuthService,
        private renderer: Renderer2,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
        this.userForm = this.formBuilder.group({
            name: [
                '',
                {
                    validators: [Validators.required],
                    updateOn: 'submit',
                },
            ],
            email: [
                '',
                {
                    validators: [
                        Validators.required,
                        validateInputService.validateEmail(),
                    ],
                    updateOn: 'submit',
                },
            ],
            password: [
                '',
                {
                    validators: [
                        Validators.required,
                        Validators.minLength(8),
                        validateInputService.validatePasswordStrength(),
                    ],
                    updateOn: 'submit',
                },
            ],
        })
    }

    saveUser() {
        this.submitted = true
        console.log(this.userForm)

        const { name, email, password } = this.userForm.value
        const data = {
            name,
            email,
            password,
        }

        this.renderer.setProperty(
            this.registerBtn.nativeElement,
            'disabled',
            true
        )

        this.authService.registerUser(data).subscribe(
            (data: any) => {
                console.log(data)
                this.router.navigate(['/login'])
            },
            (error: any) => {
                console.log(error)
                this.renderer.setProperty(
                    this.registerBtn.nativeElement,
                    'disabled',
                    false
                )
                this._snackBar.open(error.error.msg, 'OK', {
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                })
            }
        )
    }

    ngOnInit(): void {}
}

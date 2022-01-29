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
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    userForm: any
    submitted = false

    @ViewChild('loginBtn', { read: ElementRef })
    loginBtn: ElementRef

    constructor(
        private formBuilder: FormBuilder,
        private validateInputService: ValidateInputService,
        private authService: AuthService,
        private renderer: Renderer2,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
        this.userForm = this.formBuilder.group({
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

        const { email, password } = this.userForm.value
        const data = {
            email,
            password,
        }

        // console.log(this.loginBtn)
        this.renderer.setProperty(this.loginBtn.nativeElement, 'disabled', true)

        this.authService.loginUser(data).subscribe(
            (data: any) => {
                console.log(data)
                this.router.navigate(['/departments'])
            },
            (error: any) => {
                console.log(error)
                this.renderer.setProperty(
                    this.loginBtn.nativeElement,
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

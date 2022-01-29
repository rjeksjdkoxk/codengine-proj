import { Injectable } from '@angular/core'
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

@Injectable({
    providedIn: 'root',
})
export class ValidateInputService {
    constructor() {}

    validatePasswordStrength(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value

            if (!value) {
                return null
            }

            const hasUpperCase = /[A-Z]+/.test(value)

            const hasLowerCase = /[a-z]+/.test(value)

            const hasNumeric = /[0-9]+/.test(value)

            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric

            return !passwordValid ? { passwordInvalid: true } : null
        }
    }

    validateEmail(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value

            if (!value) {
                return null
            }

            const emailValid =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    value
                )

            return !emailValid ? { emailInvalid: true } : null
        }
    }
}

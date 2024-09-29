import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth-service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Notyf } from 'notyf';
import { NOTYF } from '../../shared/utils/notyf.token';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.sass',
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  signUpLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      const signUpData = { email, password };
      this.signUpLoading = true;

      this.authService.signUp(signUpData).subscribe({
        next: (response) => {
          this.signUpLoading = false;
          this.notyf.success('Account created successful.');
          this.router.navigate(['/login']);
        },

        error: (error) => {
          this.signUpLoading = false;
          console.log('error from signup request: ', error);
          this.notyf.error(
            error.error.message
              ? error.error.message
              : 'Error signing up. Please try again'
          );
        },
      });
    } else {
      console.log('signup form invalid');
      this.signUpForm.markAllAsTouched();
    }
  }
}

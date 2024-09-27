import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service/auth.service';
import { LocalStorageService } from '../../core/services/local-storage-service/local-storage.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../shared/utils/notyf.token';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.sass',
})
export class SignInComponent {
  signInForm!: FormGroup;
  loginLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.loginLoading = true;
      this.authService.login(this.signInForm.value).subscribe({
        next: (response) => {
          this.loginLoading = false;
          this.localStorageService.setItem('AUTH_TOKEN', response.token);
          this.notyf.success('Signed in successfully');
          this.router.navigate(['home']);
        },
        error: (error) => {
          this.loginLoading = false;
          this.notyf.error(
            error.error.message
              ? error.error.message
              : 'Error signing in. Please try again'
          );
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}

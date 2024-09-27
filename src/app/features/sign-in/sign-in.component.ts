import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service/auth.service';
import { LocalStorageService } from '../../core/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.sass',
})
export class SignInComponent {
  signInForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value).subscribe((response) => {
        this.localStorageService.setItem('AUTH_TOKEN', response.token);
        this.router.navigate(['home']);
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}

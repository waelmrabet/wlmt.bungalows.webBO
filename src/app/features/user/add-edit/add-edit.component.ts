import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthenticationService,
      private alertService: AlertService,
      private userService: UserService
  ) { }

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];

      // form with validation rules
      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          // password only required in add mode
          password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]]
      });

      this.title = 'Add User';
      if (this.id) {
          // edit mode
          this.title = 'Edit User';
          this.loading = true;
          this.userService.getById(this.id)
              .pipe(first())
              .subscribe(x => {
                  this.form.patchValue(x);
                  this.loading = false;
              });
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.submitting = true;
      this.saveUser()
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('User saved', { keepAfterRouteChange: true });
                  this.router.navigateByUrl('/users');
              },
              error: error => {
                  this.alertService.error(error);
                  this.submitting = false;
              }
          })
  }

  private saveUser() {
      // create or update user based on id param
      return this.id
          ? this.userService.update(this.id!, this.form.value)
          : this.userService.register(this.form.value);
  }
}

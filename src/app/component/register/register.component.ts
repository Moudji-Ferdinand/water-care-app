import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  useremail = '';
  password = '';
  hide = false;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.auth.register(this.useremail, this.password);
    this.useremail = '';
    this.password = '';
  }
}

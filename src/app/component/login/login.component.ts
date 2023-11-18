import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  useremail = '';
  password = '';
  hide = false;


  constructor(private auth: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }
  login() {
    this.submitted = true;
    this.auth.login(this.useremail, this.password);
    this.useremail = '';
    this.password = '';
    this.submitted = false;

  }
}

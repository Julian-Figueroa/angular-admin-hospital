import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";

declare function init_Plugins();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  rememberMe: boolean = false;
  email: string;

  constructor(public router: Router, public _user: UserService) {}

  ngOnInit() {
    init_Plugins();

    this.email = localStorage.getItem("email") || '';

    if (this.email.length > 0) {
      this.rememberMe = true;
    }

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  getIn() {

    let data: any = this.form.value;

    this._user.login(data).subscribe(data => {
      this.form.reset();
      this.router.navigate(["/dashboard"]);
    });
  }
}

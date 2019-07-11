import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import swal from "sweetalert";
import { UserService } from "../services/user.service";

declare function init_Plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(public _user: UserService, public router: Router) {}

  areEquals(field1: string, field2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        areEquals: true
      };
    };
  }

  ngOnInit() {
    init_Plugins();

    this.form = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8)
        ]),
        password2: new FormControl(null, Validators.required),
        conditions: new FormControl(false)
      },
      {
        validators: this.areEquals("password", "password2")
      }
    );
  }

  registerAdmin() {
    if (!this.form.value.conditions) {
      swal({
        title: "Important",
        text: "You should Accept the Terms",
        icon: "warning"
      });

      return;
    }

    let data: any = this.form.value;

    this._user.createUser(data).subscribe(data => {
      this.form.reset();
      this.router.navigate(['/login']);
    });
  }
}

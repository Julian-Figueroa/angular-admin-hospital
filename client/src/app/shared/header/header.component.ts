import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: []
})
export class HeaderComponent implements OnInit {
  constructor(public _user: UserService, private domSanitizer: DomSanitizer) {}

  user: any;
  img: any;

  ngOnInit() {
    this.user = this._user.user;

    this.img = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.user.IMAGE);
  }
}

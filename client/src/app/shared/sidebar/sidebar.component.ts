import { Component, OnInit } from "@angular/core";
import { SidebarService } from "../../services/sidebar.service";
import { DomSanitizer } from "@angular/platform-browser";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit {
  constructor(public _sidebar: SidebarService, public _user: UserService, private domSanitizer: DomSanitizer) {}

  user: any;
  img: any;

  ngOnInit() {
    this.user = this._user.user;

    this.img = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.user.IMAGE);
  }
}

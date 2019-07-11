import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_BACKEND_DEV, URL_BACKEND } from "../common/config";
import { API_KEY } from "../common/config";
import swal from "sweetalert";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  user: any;

  constructor(public http: HttpClient) {
    this.loadStorage();
  }

  isAuthenticated() {
    return this.user !== "" ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.user = "";
    }
  }

  saveStorage(tag, data) {
    localStorage.setItem(tag, JSON.stringify(data));

    this.user = data;
  }

  createUser(user: any) {
    let url = URL_BACKEND_DEV + "register";

    let data = {
      APIKEY: API_KEY,
      AUTH: 1,
      name: user.name,
      email: user.email,
      password: user.password,
      idRole: user.idRole || 2,
      LANG: "EN"
    };

    return this.http.post(url, data).pipe(
      map((res: any) => {
        swal("User Created ", data.email, "success");
        return res;
      })
    );
  }

  login(user: any) {
    let url = URL_BACKEND_DEV + "login";

    if (user.rememberMe) {
      localStorage.setItem("email", user.email);
    } else {
      localStorage.removeItem("email");
    }

    let data = {
      APIKEY: API_KEY,
      email: user.email,
      password: user.password,
      LANG: "EN"
    };

    return this.http.post(url, data).pipe(
      map((res: any) => {
        this.saveStorage("user", res.user);
        swal("Welcome, ", res.user.NAME, "success");
        return res;
      })
    );
  }

  logout() {
    this.user = "";
    localStorage.removeItem("user");
  }
}

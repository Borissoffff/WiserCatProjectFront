import {Component, Input, OnInit} from '@angular/core';
import {IdentityService} from "../../service/identity.service";
import {UserDto} from "../../dto/UserDto";
import {Login} from "../../dto/Login";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() warningText: string  = "";

  public username: string | undefined;
  public password: string | undefined;

  constructor(
    private identityService: IdentityService,
    private router: Router ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username == undefined || this.password == undefined) {
      return;
    }

    const loginInfo: Login = {
      username: this.username,
      password: this.password
    };

    this.identityService.login(loginInfo).subscribe({
      next: (user: UserDto) => {
        this.router.navigate(["Pets", user.id]);
      },
      error: () => {
        this.warningText = "Invalid Credentials";
        this.username = "";
        this.password = "";
      }
    })
  }
}

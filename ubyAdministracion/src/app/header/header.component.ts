import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged:boolean = false
  constructor(private cookie:CookieService) { 
    console.log(cookie.get("tokenAdministrador"));
    this.logged = !(cookie.get("tokenAdministrador")=="")
    console.log(this.logged)
  }

  ngOnInit(): void {
  }

}

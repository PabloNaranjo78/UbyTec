import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged:boolean = false
  id!:string|number;
  constructor(private cookie:CookieService, private rou:ActivatedRoute) { 
    console.log(cookie.get("tokenAfiliado"));
    this.logged = !(cookie.get("tokenAfiliado")=="")
    console.log(this.logged)
    this.id = cookie.get("tokenAfiliado")
    console.log(this.id)
  }

  ngOnInit(): void {
  }

}

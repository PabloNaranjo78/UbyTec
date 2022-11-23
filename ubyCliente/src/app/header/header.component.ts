import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged:boolean = false
  id!:number|string
  constructor(private cookie:CookieService, private router:Router) {
    console.log(cookie.get("tokenCliente"));
    this.logged = !(cookie.get("tokenCliente")=="")
    console.log(this.logged)
    this.id = cookie.get("tokenCliente")
  }

    recargar(Tipo:string){
      this.router.navigate(['gestion/'+Tipo])
      .then(() => {
        window.location.reload();
    });

  }

    reloadComponent(self:boolean,urlToNavigateTo ?:string){
      //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:",this.router.url);
    const url=self ? this.router.url :urlToNavigateTo;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }

  reloadPage(){
    window.location.reload()
  }

  logout(){
    this.cookie.delete("tokenCliente")
    this.reloadPage()
  }

  ngOnInit(): void {
  }

}

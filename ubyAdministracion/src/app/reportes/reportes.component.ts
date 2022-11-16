import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comercio } from '../interfaces/comercio';
import { ComerciosService } from '../services/comercios.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private rou:ActivatedRoute, private comercioService:ComerciosService) { }
  objeto:Comercio = new Comercio()

  ngOnInit(): void {
    this.comercioService.get(this.rou.snapshot.params['comercio']).subscribe({
      next: data => {
        this.objeto=data[0]
        console.log(this.objeto)
      }
    })

  }

}

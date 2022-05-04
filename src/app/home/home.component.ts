import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private refereciasFirebase:AngularFirestore) 
  {
    this.refereciasFirebase.collection("profesores").valueChanges().subscribe(datosRetornado=>{
      console.info(datosRetornado);
      datosRetornado.forEach((element: any) => {
       if(localStorage.getItem("name") == element.email)
       {
          this.item = element;        
       }
      });
     })
     this.refereciasFirebase.collection("materias").valueChanges().subscribe(datosRetornado=>{
       this.materias = []
      console.info(datosRetornado);
      datosRetornado.forEach((element: any) => {
        this.item.materias.forEach((materia: any) => {
         if(element.id == materia)
          {
            this.materias.push(element.nombre);
          }
       });
      });
     })
  }
item:any;
materias:any[] = []
  ngOnInit(): void {
    if(localStorage.getItem("logueado")!="true")
    {
      this.router.navigateByUrl("login",{replaceUrl:true})   
    }
    else
    {
      this.saludo = localStorage.getItem("name");
    }
  }
  cerrarSeccion()
  {
    localStorage.removeItem("name");
    localStorage.removeItem("password");
    localStorage.removeItem("logueado");
    this.router.navigateByUrl("login",{replaceUrl:true})
  }
  

  saludo:any

  @Input() ruta:string = "";



}

import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-notas-finales',
  templateUrl: './notas-finales.component.html',
  styleUrls: ['./notas-finales.component.css']
})
export class NotasFinalesComponent implements OnInit {

  folio:any
  tomo:any 
  fecha:any
  mat:any
  constructor(private router: Router,private refereciasFirebase:AngularFirestore) 
  { 
    this.refereciasFirebase.collection("profesores").valueChanges().subscribe(datosRetornado=>{
      console.info(datosRetornado);
      datosRetornado.forEach((element: any) => {
       if(localStorage.getItem("name") == element.email)
       {
          this.profesor = element;        
       }
      });
     })
    this.refereciasFirebase.collection("Actas").snapshotChanges().subscribe((actas: any[])=>{
      let acta :any[] = [];
      actas.forEach((actas)=>
      {
        let data=actas.payload.doc.data();
        if(data.idProfesor == this.profesor.id )
        {
          acta.push({
            data: data, 
            id: actas.payload.doc.id
          })
        }
      })
      this.actas =acta;
      

      
    })
    /*this.refereciasFirebase.collection("alumnos").valueChanges().subscribe(datosRetornado=>{
      console.info(datosRetornado);
      datosRetornado.forEach((element: any) => {
       if(localStorage.getItem("name") == element.email)
       {
          this.item = element;        
       }
      });
     })*/
     /*this.refereciasFirebase.collection("materias").valueChanges().subscribe(datosRetornado=>{
      console.info(datosRetornado);
      datosRetornado.forEach((element: any) => {
       if(localStorage.getItem("name") == materias.id)
       {
          this.materias = element;        
       }
      });
     })*/
     
  }
materias:any[] = [];
profesor:any;
materia:any;
alumnos:any;
carrera:any;
cantInscriptos:any
act:any
actas:any;
acta:any = [];
con:boolean = false;
can:boolean = false;
env:boolean = false;
pre:any;
aus:any;
apro:any;
desa:any
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
  elijirMateria(materia:any)
  {
    console.log("alumnos",materia);
   
    this.acta = [];
    this.refereciasFirebase.collection("alumnos").valueChanges().subscribe(datosRetornado=>{
      console.info(datosRetornado);
      datosRetornado.forEach((element: any) => {
      materia.forEach((ma: any) => {
        if(element.idlegajo == ma.idlegajo)
       {
        let objecto = {
          nombre:element.nombre,
          apellido:element.apellido,
          nota:ma.nota,
          id:element.idlegajo
          
        }    
          this.acta.push(objecto);       
       }
      });
     })
      });
       
    console.log("acta:",this.acta);
  }
  cerrarSeccion()
  {
    localStorage.removeItem("name");
    localStorage.removeItem("password");
    localStorage.removeItem("logueado");
    this.router.navigateByUrl("login",{replaceUrl:true})
  }
  ausente(id:any)
  {
    this.acta.forEach((element: any) => {
      if(element.id == id)
      {
        element.nota = "ausente";
      }
    });
  }
  confirmar()
  {
    let bool = true;
    this.pre = 0;
    this.aus = 0;
    this.apro = 0;
    this.desa = 0;
    this.acta.forEach((element: any) => {
     
        if(element.nota == "ausente" || (element.nota <=  10 && element.nota >= 0))
        {
          this.act.data.nota.forEach((elements: any) => {
            if(elements.idlegajo == element.id)
            {
              elements.nota =element.nota ;
            }
           
          });
         if(element.nota == "ausente")
          this.aus++;
         else
         {
          this.pre++
          if(element.nota >=  6)
            this.apro++
          else if(element.nota <= 5)
            this.desa++
         }
        }
        else
        {
          alert("tiene que ser ausente o del 0 a 10: " + element.id);
          bool = false;
        }
          
    });
    if(bool)
    {
      this.con = false;
      this.can = true;
      this.env = true;
    }
    
  }
  enviar()
  {
    this.refereciasFirebase.collection("Actas").doc(this.act.id).update({
      nota:  this.act.data.nota,
    }).then(()=>{
      alert("se subio la nota");
      this.fecha = "";
      this.mat = "";
      this.carrera = "";
      this.cantInscriptos = "";
      this.idoriginal = "";
      this.acta = [];
      this.con = false;
      this.can = false;
      this.env = false;
      this.folio = "";
      this.tomo = "";
      this.pre = 0;
      this.aus = 0;
      this.apro = 0;
      this.desa = 0;
    }).catch(()=>{
      console.error();
    })
  }
  cancelar()
  {
    this.con = true;
    this.can = false;
    this.env = false;
    this.pre = 0;
    this.aus = 0;
    this.apro = 0;
    this.desa = 0;
  }
buscadorDinamico()
{
  console.log("actas",this.actas);
  this.actas.forEach((element: any) => {
    if(this.tomo == element.data.idTomo && this.folio == element.data.folio)
    {
      this.fecha = element.data.fechaExamen + " " +element.data.horaExamen ;
      this.mat = element.data.nombreMateria;
      this.carrera = element.data.carrera;
      this.cantInscriptos = element.data.nota.length
      this.idoriginal = element.id;
      this.elijirMateria(element.data.nota);
      this.act = element;
      this.con = true;
      this.can = false;
      this.env = false;
    }
    else
    {
      this.fecha = "";
      this.mat = "";
      this.carrera = "";
      this.cantInscriptos = "";
      this.idoriginal = "";
      this.acta = [];
      this.con = false;
      this.can = false;
      this.env = false;
    }
    
      
  });
}
  idoriginal:any
  saludo:any

  @Input() ruta:string = "";
}

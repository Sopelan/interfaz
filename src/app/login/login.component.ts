import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:any = "";
  loginError:boolean = false;
  loginErrors :string = "";
  password:any = "";
  bool:boolean = false;
  constructor(private router: Router,  private autentificacion: AngularFireAuth,private refereciasFirebase:AngularFirestore) { }

  ngOnInit(): void {
    if(localStorage.getItem("logueado")=="true")
    {
      this.router.navigateByUrl("notasFinales",{replaceUrl:true})   
    }
  }
  async login()
  {
    //this.bool = true;
    let bool = true;
    /*this.ocultar();
    const querySnapshot = await getDocs(this.q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      let especialista :any = doc.data();
      if(especialista.email == this.name)
      {
        bool = false;
        this.imagen1 = especialista.imagen1;
        if(especialista.verificado == true)  
        {
              console.log("entro");
              bool=true;
        }
      }
      
    });*/
    
    if(bool)
      {
        this.autentificacion.signInWithEmailAndPassword(this.name,this.password).then(async usuario=>{
          /*this.Administradores.forEach((element: any) => {
            if(element.email == this.name && this.password== element.password)
            {
             localStorage.setItem("que sos","Administrador")
            }
          });
          this.pacientes.forEach((element: any) => {
            if(element.email == this.name && this.password== element.password)
            {
              localStorage.setItem("que sos","pacientes")
            }

          });
          this.Especialistas.forEach((element: any) => {
            if(element.email == this.name && this.password== element.password)
            {
              localStorage.setItem("que sos","especialistas")
            }
          });*/
          console.log("login");
          console.info("usuario",usuario);
          localStorage.setItem("name",this.name);
          localStorage.setItem("password",this.password);
          localStorage.setItem("logueado","true");
          this.router.navigateByUrl("perfil",{replaceUrl:true}).then()
          this.bool = false;
         /* let usuarioInforme = {usuario:this.name,dia:new Date().getDate().toString().padStart(2,"0")+"/"+ (new Date().getMonth()+1).toString().padStart(2,"0") + "/"+ new Date().getFullYear(),hora: new Date().getHours().toString().padStart(2,"0")+":"+new Date().getMinutes().toString().padStart(2,"0") + ":" + new Date().getSeconds().toString().padStart(2,"0")}
          console.log("informe: " ,usuarioInforme);
          this.refereciasFirebase.collection("loginSistema").add(usuarioInforme)*/
        }).catch((error: { code: any; })=>{
          console.info("el error es: ",error);
          console.info("el error es: ",error.code);
            this.loginError = true;
            switch(error.code){
              case 'auth/wrong-password':
              case 'auth/user-not-found':
                this.loginErrors = "Correo y/o contraseña incorrecta.";
                break;
             case 'auth/invalid-email':
               this.loginErrors = "Email no valido";
               break;
      
              case 'auth/too-many-requests':
                this.loginErrors = "Está realizando demasiadas peticiones, espere un momento";
                break;
              
              case 'auth/quota-exceeded':
                localStorage.setItem("name",this.name);
                localStorage.setItem("password",this.password);
                localStorage.setItem("logueado","true");
                this.router.navigateByUrl("home",{replaceUrl:true}).then()

                break;
              default:
                this.loginErrors = "Algo ha salido mal, espere un momento.";
                break;
            }
        });
        this.bool = false;
      }
      else
      {
        this.loginError = true;
        this.loginErrors ="No fue verificado por el administrador";
        localStorage.removeItem("que sos")
        this.bool = false;
      }
 }
  AccesoRapido(name:any,password:any)
  {
    this.name = name
    this.password = password;
    
  }
  resetLoginError(){
    this.loginError = false;
  }
  
    
}

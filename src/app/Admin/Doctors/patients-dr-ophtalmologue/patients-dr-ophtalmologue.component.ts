import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { DialogDetailsComponent } from './dialog-details/dialog-details.component';



export interface Doctor {
  id: number;
  image:string ;
  nom: string;
  prenom:string;
  email: string;
  numero: string;
  date:string;
}
@Component({
  selector: 'app-patients-dr-ophtalmologue',
  templateUrl: './patients-dr-ophtalmologue.component.html',
  styleUrls: ['./patients-dr-ophtalmologue.component.css']
})

export class PatientsDrOphtalmologueComponent implements OnInit {

  constructor(private ar : ActivatedRoute ,public dialog: MatDialog , private service :AdminService , private userService : UserServiceService ,  private router : Router) 
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
  idExpertAjouterActuellement : number ; 
  test : any ; 
  uploadImageData : any 
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  id : number ;
  admin : any ; 
  expert : any ; 
  imagePath : any ;
  imagePath1 : any ;
  username : string ;  
  role : string ;
  adminDigital:string ="adminDigital";
  adminMedical:string="adminMedical"; 
  bouton : boolean ; 
  ngOnInit(){
        /***********************  checkbox de eye de password 1 ************/
  $(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
   /***********************  checkbox de eye de password  2 ************/
  $(".toggle-password2").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
    this.imagePath1="./assets/imagesD/faces/user.jpg" ;
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
      this.test=res ; 
      console.log(this.test.role);
      if(this.test.role === "Admin Medical Manager"){
        this.bouton= true ;
       this.username = localStorage.getItem("nameAdmin");
       console.log(parseInt(localStorage.getItem('idAdmin')))
       console.log(localStorage.getItem("nameAdmin"))
       this.service.getAdminMedicall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
         this.admin=data
               if(this.admin.image ==null){
                 this.imagePath="./assets/imagesD/faces/user.jpg"
               }
               else{
               this.retrieveResponse = this.admin;
               this.base64Data = this.retrieveResponse.image;
               this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
               console.log(this.imagePath)
               this.role=this.admin.role;  }) ;
      }
      else{
        if(this.test.role === "Admin Digital Manager"){
          this.bouton= false ;
         this.username = localStorage.getItem("nameAdmin");
         console.log(parseInt(localStorage.getItem('idAdmin')))
         console.log(localStorage.getItem("nameAdmin"))
         this.service.getAdminDigitall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
           this.admin=data
                 if(this.admin.image ==null){
                   this.imagePath="./assets/imagesD/faces/user.jpg"
                 }
                 else{
                 this.retrieveResponse = this.admin;
                 this.base64Data = this.retrieveResponse.image;
                 this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
                 console.log(this.imagePath)
                 this.role=this.admin.role;  }) ;
        }
      }
     })
     /****code input image *********************/
 
  }

  images:string[]=[
    './assets/imagesD/faces/face1.jpg',
    './assets/imagesD/faces/face10.jpg',
    './assets/imagesD/faces/face14.jpg',
    './assets/imagesD/faces/face15.jpg',
    './assets/imagesD/faces/face16.jpg',
    './assets/imagesD/faces/face19.jpg',
    './assets/imagesD/faces/face21.jpg',
    './assets/imagesD/faces/face23.jpg',
    './assets/imagesD/faces/face1.jpg',
   ]
    doctors : Doctor[]=[
      {id:1 ,image:this.images[1], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:2 ,image:this.images[2], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:3 ,image:this.images[3], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:4, image:this.images[4], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:5,image:this.images[5], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},
      {id:6,image:this.images[6], nom:'John ',prenom:'smith',email:'test@email.com',numero:'12345678',date:'2021/03/1/29'},

   ]
   delete(){
 
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "de supprimer patient : Rahma Romdhani !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Supprimé !',
            'Patient a été supprimé.',
            'success'
          )
        }
      })
    }
    details(){
      Swal.fire({
        background: '#1A202E',
        title: 'Nombre des consulultations : 3',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
        
      })
  }
  logout() {
    localStorage.removeItem('nameAdmin');
    localStorage.removeItem('role');
    localStorage.removeItem('emailAdmin');
    localStorage.removeItem('idAdmin');
    this.service.islogin = false;
    this.router.navigate(['']);
    window.localStorage.clear();
      //location.reload();
  }  openDialog() {
    this.dialog.open(DialogDetailsComponent
      , {width:'5px' , height:'5px'});
    
  }
}


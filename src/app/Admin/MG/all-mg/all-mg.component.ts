import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { EditMGComponent } from '../edit-mg/edit-mg.component';
export interface Doctor {
  id: number;
  image:string ;
  name: string;
  email: string;
  numero: string;
  adresse:string ;
  date:string;
}

@Component({
  selector: 'app-all-mg',
  templateUrl: './all-mg.component.html',
  styleUrls: ['./all-mg.component.css']
})
export class AllMGComponent implements OnInit {

  test : any ; 
  retrieveResponse: any={};
  base64Data: any;
  id : number ;
  admin : any ; 
  imagePath : string ;
  username : string ;  
  role : string ;
  adminDigital:string ="adminDigital";
  adminMedical:string="adminMedical" ;
  constructor(private ar : ActivatedRoute , private dialog: MatDialog , private service : AdminService , private router : Router) 
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }

  ngOnInit(){
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
     this.test=res ; 
     console.log(this.test.role);
     if(this.test.role === "Admin Medical Manager"){
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

  }


  images:string[]=[
    './assets/doctors/d1.jpg',
    './assets/doctors/d1.png',
    './assets/doctors/d2.jpg',
    './assets/doctors/d2.png',
    './assets/doctors/d3.jpg',
    './assets/doctors/d4.jpg',
    './assets/doctors/d5.jpg',
    './assets/doctors/d6.jpg',
    './assets/doctors/d1.jpg',
   ]
    doctors : Doctor[]=[
      {id:1 ,image:this.images[1], name:'John Dao',email:'test@email.com',numero:'12345678',adresse:'Sousse',date:'2021/03/1/29'},
      {id:2 ,image:this.images[2],  name:'Sarah Smith',email:'test@email.com',numero:'12345678',adresse:'Sousse',date:'2021/03/1/29'},
      {id:3 ,image:this.images[3], name:'Cara Stevens',email:'test@email.com',numero:'12345678',adresse:'Sousse',date:'2021/03/1/29'},
      {id:4 ,image:this.images[4], name:'John Dao',email:'test@email.com',numero:'12345678',adresse:'Sousse',date:'2021/03/1/29'},
     
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
      title: 'Custom animation with Animate.css',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
      /////////***********/ */
    })
}

openDialog() {
  this.dialog.open(EditMGComponent);
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
}
}
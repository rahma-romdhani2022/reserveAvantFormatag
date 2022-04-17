import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
admin : any ; 
imageAdmin : any ; 
retrieveResponse: any={};
base64Data: any;
test : any ; 
username : string ;  
role : any ; 
  constructor(private service : AdminService , private ar : ActivatedRoute )
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }

  ngOnInit() {
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
                 this.imageAdmin="./assets/imagesD/faces/user.jpg"
               }
               else{
               this.retrieveResponse = this.admin;
               this.base64Data = this.retrieveResponse.image;
               this.imageAdmin = 'data:image/jpeg;base64,' + this.base64Data; }
               console.log(this.imageAdmin)
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
                   this.imageAdmin="./assets/imagesD/faces/user.jpg"
                 }
                 else{
                 this.retrieveResponse = this.admin;
                 this.base64Data = this.retrieveResponse.image;
                 this.imageAdmin = 'data:image/jpeg;base64,' + this.base64Data; }
                 console.log(this.imageAdmin)
                 this.role=this.admin.role;  }) ;
        }
      }
     })
   /* $('.containerFlip').on('click', function () {
      $('.cardFlip').toggleClass('flipped');
    });*/
   /* this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
  this.admin= res ; 
  if(this.admin.image ==null){
    this.imageAdmin="./assets/imagesD/faces/user.jpg"
  }
  else{
  this.retrieveResponse = this.admin;
  this.base64Data = this.retrieveResponse.image;
  this.imageAdmin = 'data:image/jpeg;base64,' + this.base64Data; }
  console.log(this.admin)
    }) ; 
  };*/
 
}
clicker(){
  $('.cardFlip').toggleClass('flipped')
}
}
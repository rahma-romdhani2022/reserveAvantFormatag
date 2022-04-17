import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
export interface consultation{
  id: number;
  number:number ;
  date:string ;
}

@Component({
  selector: 'app-dossiers-consultations',
  templateUrl: './dossiers-consultations.component.html',
  styleUrls: ['./dossiers-consultations.component.css']
})
export class DossiersConsultationsComponent implements OnInit {
 dossiers:consultation[] =[
  {id:1 ,number:1, date:"29/11/2021"},
  {id:2 ,number:2, date:"29/11/2021"},
  {id:3 ,number:3, date:"29/11/2021"},
  {id:4 ,number:4, date:"29/11/2021"},
  {id:5 ,number:5, date:"29/11/2021"},
  {id:6 ,number:6, date:"29/11/2021"},
  {id:7 ,number:7, date:"29/11/2021"},
  {id:8,number:8, date:"29/11/2021"},
  {id:9,number:9, date:"29/11/2021"},
  {id:10,number:10, date:"29/11/2021"},

 ] ;
 name  = '';
 imagePath :string=null;
 user :any={};
 expert : any={};
 retrieveResponse: any={};
 base64Data: any;
 test : string = "rahma" ; 
 nom_Expert : string="" ; 
 id : number ; 
   constructor(private service : UserServiceService , private router : Router , private ar : ActivatedRoute)
   {
     ar.params.subscribe(val => {
       this.ngOnInit();
     })
   }
   ngOnInit() {
    this.id=parseInt(localStorage.getItem("id")) ; 
     this.service.getData(parseInt(localStorage.getItem('id'))).subscribe(data=>{
       this.user=data
             if(this.user.image ==null){
               this.imagePath="./assets/imagesD/faces/user1.png"
             }
             else{
               this.imagePath=this.imagePath ; 
             
             this.retrieveResponse = this.user;
             this.base64Data = this.retrieveResponse.image;
             this.imagePath = 'data:image/jpeg;base64,' + this.base64Data; }
     
   }) ;
    $( "#menu" ).on( "click", function()
    {
      $( "#menu23" ).fadeToggle( "fast" );
    });
  }
  logout() {
    localStorage.removeItem('name');
    this.service.islogin = false;
  this.router.navigate(['']);
      ///location.reload();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modele/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-accueil-ophtalmologue',
  templateUrl: './accueil-ophtalmologue.component.html',
  styleUrls: ['./accueil-ophtalmologue.component.css']
})
export class AccueilOphtalmologueComponent implements OnInit {
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
console.log(localStorage.getItem("id"))
console.log(localStorage.getItem("name"))
console.log(localStorage.getItem("email"))
console.log(localStorage.getItem("token"))
this.id=parseInt(localStorage.getItem("id")) ; 




  }
 
  logout() {
    localStorage.removeItem('name');
    this.service.islogin = false;
    this.router.navigate(['']);
    window.localStorage.clear();
      //location.reload();
  }
}

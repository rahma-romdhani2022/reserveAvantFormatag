import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatDialogRef , MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatDialog, MatDialogConfig } from "@angular/material";
@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  doneImage: any ; 
  experts : any ; 
  user : any ; 
fileData: File = null;
 url : FileReader ;
 selectedFile: File;
 imagePath2 : any  ="./assets/imagesD/faces/user.jpg" ;
 uploadImageData : any ;
 expert : any ; 
 idExpertAjouterActuellement : number ; 
 test : any ;
 retrievedImage: any;
 base64Data: any;
 retrieveResponse: any;
 gender : string ; 
 id : number ;
 constructor( private service :AdminService , private userService : UserServiceService ,  private router : Router 
  ,@Inject(MAT_DIALOG_DATA)  public data,
  public dialogRef:MatDialogRef<EditDoctorComponent> ) {}

  ngOnInit() {
    //this.imagePath2 ;
   this.userService.getData(parseInt(localStorage.getItem("idExpertAModifier"))).subscribe(data=>{
      this.user=data
       console.log(this.user)
      console.log(this.user.image)
            if(this.user.image ==null){
              this.imagePath2="./assets/imagesD/faces/user.jpg" ;
            }
            else{
            this.retrieveResponse = this.user;
            this.base64Data = this.retrieveResponse.image;
            this.imagePath2 = 'data:image/jpeg;base64,' + this.base64Data; }
            this.gender = this.user.gender ;
            console.log("gender",this.gender)
  }) ;
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
 
}

onSelectFile(event ) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url
    this.selectedFile = event.target.files[0];
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.imagePath2 = reader.result;
    }
  }
}
  
    
    
modifierProfile(f:NgForm){
  this.userService.updatedata(parseInt(localStorage.getItem("idExpertAModifier")), f.value).subscribe(()=>{
    console.log(f.value)
    console.log(this.selectedFile);
     this.uploadImageData = new FormData();
     if(this.selectedFile== null){
      this.doneImage = this.user.image ;
      console.log(this.doneImage) }
      else{
        this.doneImage=this.selectedFile
      }
     this.uploadImageData.append('imageFile', this.doneImage);
     console.log(this.selectedFile)
     this.userService.updateImage(parseInt(localStorage.getItem("idExpertAModifier")),this.uploadImageData).subscribe();
    this.service.getAllExperts("expert").subscribe(
     response =>{this.service.expertsData = response;} );
    this.dialogRef.close();
    this.router.navigate(['/All-Doctors']);
   }  , err=>{
    alert("Opps il y 'a un Probléme , username  ou email  existent déja ")
  })
}
 getAllDrsExperts(){
      this.service.getAllExperts("expert").subscribe(data=>{
        this.experts=data;
      });
    }
  onClear(){

 /*autre code */

    this.onClose();
 }
 onClose(){
   this.dialogRef.close();
 }
 
 
 
}
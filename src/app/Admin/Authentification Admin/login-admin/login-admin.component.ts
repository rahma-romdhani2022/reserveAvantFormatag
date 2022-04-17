import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/modele/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
admin : any ; 
  constructor(private service : AdminService , private router : Router) { }

  ngOnInit() {
    this.service.islogin = false;
    this.service.admin = false;
    this.service.expert = false;
    $(".toggle-password").click(function() {

      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }
  login1(fl:NgForm){
    this.service.login(fl.value.nom, fl.value.pwd).subscribe(data=>{
      this.admin = data;
     console.log(this.admin)
      localStorage.setItem("nameAdmin", this.admin.username);//kn name
      localStorage.setItem("role", this.admin.role);
      localStorage.setItem("emailAdmin", this.admin.email);
      localStorage.setItem("idAdmin", this.admin.id);
      console.log(this.admin);
      let accessToken = "Bearer " + this.admin.accessToken;
      localStorage.setItem("token", accessToken);
      this.service.islogin = true;
      this.service.admin = true;
      this.router.navigate(['/Admin']);
    
       
     }
      ,err=>{
    
      alert ("email ou mot de passe est invalide !!?");
      //this.invalidLogin = true
      })}
}

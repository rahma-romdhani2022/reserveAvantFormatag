import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-mg',
  templateUrl: './edit-mg.component.html',
  styleUrls: ['./edit-mg.component.css']
})
export class EditMGComponent implements OnInit {


  ngOnInit() {
   
    function readURL(input) {
   if (input.files && input.files[0]) {
       var reader = new FileReader();
       reader.onload = function(event) {
           $('#imagePreview').css('background-image', 'url('+(<FileReader>event.target).result+')');
           $('#imagePreview').hide();
           $('#imagePreview').fadeIn(650);
       }
       reader.readAsDataURL(input.files[0]); } }
$("#imageUpload").change(function() {
   readURL(this);
});
 
}
constructor(private dialog: MatDialog, private dialogRef : MatDialogRef<EditMGComponent> ) {}

onClear(){

/*autre code */

 this.onClose();
}
onClose(){
this.dialogRef.close();
}



}
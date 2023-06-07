import { Component, OnInit } from '@angular/core';
import { Flat } from './flat';
import { FlatService } from './flat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Title} from "@angular/platform-browser";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public flats: Flat[];
  public editFlat: Flat;
  public deleteFlat: Flat;


  constructor(private flatService: FlatService, private titleService:Title ){
    this.titleService.setTitle('Admin Interface');
  }

  ngOnInit() {
    this.getFlatDetails();
  }

  public getFlatDetails(): void {
    this.flatService.getFlatDetails().subscribe(
      (response: Flat[]) => {
        this.flats = response;
        console.log(this.flats);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddFlatDetails(addForm: NgForm): void {
   document.getElementById('add-flatDetails-form').click();
    this.flatService.addFlatDetails(addForm.value).subscribe(
      (response: Flat) => {
        console.log(response);
        this.getFlatDetails();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateFlatDetails(flat: Flat): void {
    this.flatService.updateFlatDetails(flat).subscribe(
      (response: Flat) => {
        console.log(response);
        this.getFlatDetails();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(flatId: number): void {
    this.flatService.deleteFlatDetails(flatId).subscribe(
      (response: void) => {
        console.log(response);
        this.getFlatDetails();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFlatDetails(key: string): void {
    console.log(key);
    const results: Flat[] = [];
    for (const flat of this.flats) {
      if (flat.ownerName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || flat.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || flat.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || flat.flatNumber.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(flat);
      }
    }
    this.flats = results;
    /*  if (results.length === 0 || !key) 
     }this condition is changed because in case of no flats with search condition then it is desplaying all flats it should Not.*/
    
    if (!key) {
      this.getFlatDetails();
    }
  }

  public onOpenModal(flat: Flat, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFlatModal');
    }
    if (mode === 'edit') {
      this.editFlat = flat;
      button.setAttribute('data-target', '#updateFlatModal');
    }
    if (mode === 'delete') {
      this.deleteFlat = flat;
      button.setAttribute('data-target', '#deleteFlatModal');
    }
    container.appendChild(button);
    button.click();
  }



}

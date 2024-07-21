import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotoPokemon } from 'src/app/models/photo-pokemon';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent {

  @Output() 
  eventCloseAddPhoto = new EventEmitter<void>();

  @Input()
  newPhoto : PhotoPokemon = new PhotoPokemon("",new Pokemon);

  closeAddPhoto() : void {
    this.eventCloseAddPhoto.emit();
  }

  addPhoto() : void {
    console.log("bouton ajouter");
  }
}
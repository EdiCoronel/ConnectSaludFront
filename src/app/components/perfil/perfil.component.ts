import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  profile: any = {};  // Inicializa el objeto para evitar errores de undefined
  isLoading: boolean = false;
  updateSuccess: boolean = false;
  updateError: boolean = false;
  editing: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe(
      response => {
        this.profile = response; // Asegúrate de que la estructura de 'response' coincide con el objeto 'profile'
        this.isLoading = false;
      },
      error => {
        console.error("Error loading profile:", error);
        this.isLoading = false;
      }
    );
  }

  saveChanges(): void {
    this.userService.updateProfile(this.profile).subscribe(
      response => {
        this.profile = response;
        this.updateSuccess = true;
        this.editing = false;
        this.isLoading = false;
      },
      error => {
        console.error("Error updating profile:", error);
        this.updateError = true;
        this.isLoading = false;
      }
    );
  }

  startEdit(): void {
    this.editing = true;
  }

  cancelEdit(): void {
    this.editing = false;
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  profileForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  editing: boolean = false;  // Propiedad para controlar el modo de edición

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (response) => {
        this.profileForm.patchValue({
          username: response.username,
          email: response.email
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Failed to load user data";
        this.isLoading = false;
      }
    });
  }

  startEdit(): void {
    this.editing = true;  // Activa el modo de edición
  }

  cancelEdit(): void {
    this.editing = false;  // Desactiva el modo de edición
    // Opcionalmente recarga los datos originales si deseas descartar cambios
    this.loadProfile();  
  }

  saveChanges(): void {
    if (!this.profileForm.valid) {
      this.errorMessage = "Please correct the form errors.";
      return;
    }
    this.isLoading = true;
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.editing = false; // Salir del modo de edición tras guardar los cambios
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = "Failed to update profile";
        this.isLoading = false;
      }
    });
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-guiadealimentacion',
  templateUrl: './guiadealimentacion.component.html',
  styleUrls: ['./guiadealimentacion.component.css']
})
export class GuiadealimentacionComponent {

  constructor(private router: Router) { }

  irARecetas() {
    this.router.navigate(['/recetas']);
  }
}

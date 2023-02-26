import { Component, Input } from '@angular/core';
import { Livro } from 'src/app/models/interfaces/livros';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent {

  @Input() livro: Livro;
  modalAberto: boolean;

  onModalChange(evento: boolean) {
    this.modalAberto = evento;
  }
}

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/classes/livroVolume.info';
import { Item, LivrosResultado } from 'src/app/models/interfaces/livros';
import { LivroService } from 'src/app/services/livro.service';

const pausa = 300
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl()
  mensagemErro = ''
  livrosResultados: LivrosResultado

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(pausa),
    filter((valor) => valor.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map(resultado => this.livrosResultados = resultado),
    map(resultado => resultado.items ?? []),
    map(items => this.livrosResultadoParaLivros(items)),
    catchError((erro) => {
      console.log(erro)
      return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro, tente novamente mais tarde!'))
    })
  )

  // buscarLivros() {
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: (items) => {
  //       this.listaLivros = this.livrosResultadoParaLivros(items)
  //     } ,
  //     error: (err) => {console.error(err)}
  //   })
  // }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
}




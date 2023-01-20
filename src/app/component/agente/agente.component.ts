import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AgenteService } from './../../service/agente.service';
import { Regiao } from './../../models/regiao';
import { ResultadoTabelaRegiaoDto } from 'src/app/models/resultadoTabelaRegiaoDto';

@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css']
})
export class AgenteComponent implements OnInit  {

  selectedFiles?: FileList;
  
  progress = 0;
  spinner = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';

  regioesTabela: ResultadoTabelaRegiaoDto[] = [];

  regiaoProjection: Regiao[] = [];

  displayedColumns: string[] = ['codigo', 'data', 'sigla', 'geracao', 'compra', 'precoMedio'];

  siglaSelecinada = '';

  constructor(private agenteService: AgenteService){}

  ngOnInit() {
    this.consultarSiglasRegioes();
  }

  consultarSiglasRegioes(): void {
    this.regiaoProjection =[];
    this.agenteService.consultarSiglasRegioes().subscribe(data => {
      for (let r of data) {
        this.regiaoProjection?.push({value: r});
      } 
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        // this.currentFile = file;
        this.agenteService.upload(file).subscribe(event => {
          this.mode = 'indeterminate';
          if (event.type === HttpEventType.Response) {
              this.progress = 0;
              this.mode = 'determinate';
              this.selectedFiles = undefined;
              alert("Arquivo processado com sucesso!");
              this.consultarSiglasRegioes();
          }
        }, erro => {
          console.log(erro);
        });
      }
    }
  }

  consultarPorRegiaoEstruturaTabela(sigla: string) {
    this.agenteService.consultarPorRegiaoEstruturaTabela(sigla).subscribe(data => {
      this.regioesTabela = data;
    });
  }
}

import { AgenteDto } from "./agenteDto";

export class ResultadoTabelaRegiaoDto {
    sigla: string = '';
    geracao?: number;
    compra?: number;
    precoMedio?: number;
    agente: AgenteDto = new AgenteDto;
}
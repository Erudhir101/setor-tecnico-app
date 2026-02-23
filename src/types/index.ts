export interface BanhoHistologico {
  id?: string
  date: string
  t1_visor?: string | null
  t2_termometro?: string | null
  observacoes?: string | null
  responsavel?: string | null
}

export interface BateriaHE {
  id?: string
  date: string
  xilol_1?: string | null
  alcool_1?: string | null
  hematoxilina?: string | null
  giemsa?: string | null
  alcool_2?: string | null
  eosina?: string | null
  alcool_3?: string | null
  xilol_2?: string | null
  responsavel?: string | null
}

export interface BateriaPapanicolau {
  id?: string
  date: string
  alcool_1?: string | null
  hematoxilina?: string | null
  alcool_2?: string | null
  orange_g?: string | null
  alcool_3?: string | null
  ea_36?: string | null
  alcool_4?: string | null
  xilol?: string | null
  responsavel?: string | null
}

export interface CentralInclusao {
  id?: string
  date: string
  cubas_visor?: string | null
  dispensador_visor?: string | null
  central_quente_visor?: string | null
  cuba_1_term?: string | null
  cuba_2_term?: string | null
  dispensador_term?: string | null
  quente_term?: string | null
  frio_term?: string | null
  placa_fria?: string | null
  responsavel?: string | null
}

export interface ControleColoracaoPAP {
  id?: string
  date: string
  tempos_coloracao?: string | null
  coloracao_satisfatoria?: boolean | null
  medida_corretiva?: string | null
  responsavel?: string | null
}

export interface ControleColoracaoHE {
  id?: string
  date: string
  tempo_he?: string | null
  tempo_hp?: string | null
  coloracao_satisfatoria?: boolean | null
  medida_corretiva?: string | null
  responsavel?: string | null
}

export interface EstufaGeladeira {
  id?: string
  date: string
  estufa_t1_visor?: string | null
  estufa_t2_term?: string | null
  geladeira_t1_visor?: string | null
  geladeira_t2?: string | null
  geladeira_t2b?: string | null
  observacoes?: string | null
  responsavel?: string | null
}

export interface Parafina {
  id?: string
  date: string
  pt1_t1_visor?: string | null
  pt1_t2_visor?: string | null
  pt1_t1_termometro?: string | null
  pt1_t2_termometro?: string | null
  pt2_t1_visor?: string | null
  pt2_t2_visor?: string | null
  pt2_t1_termometro?: string | null
  pt2_t2_termometro?: string | null
  observacoes?: string | null
  responsavel?: string | null
}

export interface ProcessadorTecidos {
  id?: string
  date: string
  pt1_formol?: string | null
  pt1_alcool?: string | null
  pt1_xilol?: string | null
  pt1_parafina?: string | null
  pt2_formol?: string | null
  pt2_alcool?: string | null
  pt2_xilol?: string | null
  pt2_parafina?: string | null
  responsavel?: string | null
  observacoes?: string | null
}

export interface Produtividade {
  id?: string
  date: string
  semana?: string | null
  laminas_citologia?: number | null
  laminas_biopsia?: number | null
  laminas_novos_cortes?: number | null
  laminas_escaneadas?: number | null
  total_diario?: number | null
  blocos_biopsia?: number | null
  responsavel?: string | null
}

export interface ProgramacaoProcessador {
  id?: string
  date: string
  pt1_data_visor?: string | null
  pt1_hora_visor?: string | null
  pt1_temperatura_estavel?: boolean | null
  pt2_data_visor?: string | null
  pt2_hora_visor?: string | null
  pt2_temperatura_estavel?: boolean | null
  responsavel_antes?: string | null
  programacao_correta?: boolean | null
  horario_registro?: string | null
  observacoes?: string | null
  responsavel_apos?: string | null
}

export interface ArquivoCitologia {
  id?: string
  date: string
  citologias_com_captura?: number | null
  citologias_sem_captura?: number | null
  observacoes?: string | null
  responsavel_1?: string | null
  responsavel_2?: string | null
}

export interface Topografias {
  id?: string
  date: string
  s_digestivo?: number | null
  colo_uterino?: number | null
  utero?: number | null
  mama?: number | null
  pele?: number | null
  endometrio?: number | null
  placenta_restos_ovulares?: number | null
  prostata?: number | null
  vesicula_apendice?: number | null
  tireoide?: number | null
  outros?: number | null
  qtd_exames?: number | null
  responsavel?: string | null
}

export type AllTableData = {
  banhoHistologico: Record<string, BanhoHistologico>
  bateriaHE: Record<string, BateriaHE>
  bateriaPapanicolau: Record<string, BateriaPapanicolau>
  centralInclusao: Record<string, CentralInclusao>
  controleColoracaoPAP: Record<string, ControleColoracaoPAP>
  controleColoracaoHE: Record<string, ControleColoracaoHE>
  estufaGeladeira: Record<string, EstufaGeladeira>
  parafina: Record<string, Parafina>
  processadorTecidos: Record<string, ProcessadorTecidos>
  produtividade: Record<string, Produtividade>
  programacaoProcessador: Record<string, ProgramacaoProcessador>
  arquivoCitologia: Record<string, ArquivoCitologia>
  topografias: Record<string, Topografias>
}

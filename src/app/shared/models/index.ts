export interface Ventilator {
  id: number;
  name: string;
  entrada: string;
  salida: string;
  estado: string;
  tiempo: string;
}

export interface Brooder {
  id: number;
  name: string;
  entrada: string;
  salida: string;
  tiempo: string;
}

export interface Pump {
  id: number;
  name: string;
  entrada: string;
  salida: string;
  tiempo: string;
}

export interface MortalityRecord {
  id: number;
  fecha: string;
  lote: string;
  edadPromedio: number;
  mortalidadMachos: number;
  mortalidadHembras: number;
  total: number;
}

export interface ConsumptionRecord {
  id: number;
  fecha: string;
  edadPollo: number;
  consumoTotal: number;
}

export interface WeightRecord {
  id: number;
  fecha: string;
  edad: number;
  avesMuestreadas: number;
  pesoPromedio: number;
  sexo: 'Hembra' | 'Macho' | 'Mixto';
  zona: 'Panel' | 'Medio' | 'Extractores';
}

export interface MedicationRecord {
  id: number;
  fecha: string;
  edad: number;
  nombreMedicamento: string;
  dosis: string;
  duracion: number;
  motivo: string;
}

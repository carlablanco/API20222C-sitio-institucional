export interface Experiencia {
    type: string,
    years: number
  }
  
export interface Profesor {
    id: number,
    nombre: string,
    experiencia: Array<Experiencia>
  }
  
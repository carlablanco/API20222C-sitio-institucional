export interface Experiencia {
    descripcion: string,
    anios: number
  }
  
export interface Profesor {
    id: number,
    nombre: string,
    experiencia: Array<Experiencia>
  }
  
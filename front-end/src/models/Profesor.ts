export interface Experiencia {
    descripcion: string,
    anios: number
  }
  
export interface Profesor {
    nombre: string,
    experiencia: Array<Experiencia>
  }
  
import { Experiencia } from "./Profesor";

export interface Materia {
    id: number, 
    nombreProfesor: string,
    experienciaProfesor: Experiencia,
    materia: string, 
    duracion: string, 
    costo: number, 
    comentarios: string, 
    calificacion: number
}
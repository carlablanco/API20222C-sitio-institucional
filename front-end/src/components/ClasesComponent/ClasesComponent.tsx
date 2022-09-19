import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import GridComponent from '../GridComponent/GridComponent.lazy';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import FooterComponent from "../FooterComponent/FooterComponent.lazy";
import styles from './ClasesComponent.module.scss';
import imgLibros from "../../img/libros.png";

interface ClasesComponentProps {}



const ClasesComponent: FC<ClasesComponentProps> = (props: any) => {
  interface CustomizedState {
    materia: any,
    frecuencia: any,
    tipoDeClase: any,
    calificacion: any,
  }
  
  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  return (
  <div>
    <NavbarComponent></NavbarComponent>
    <h1 className={styles.title}>¡Bienvenido a nuestras clases!</h1>
    <h4 className={styles.subtitle}>Disfruta de esta experiencia única</h4>
    <div className={styles.div}>
      <img src={imgLibros} alt="Libros" className={styles.img} />
    </div>
    

    <GridComponent></GridComponent>
    <FooterComponent></FooterComponent>
  </div>
);}

export default ClasesComponent;

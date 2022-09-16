import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import GridComponent from '../GridComponent/GridComponent.lazy';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import FooterComponent from "../FooterComponent/FooterComponent.lazy";
import styles from './ClasesComponent.module.scss';

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
  const { materia } = state;
  return (
  <div>
    <NavbarComponent></NavbarComponent>
    <GridComponent></GridComponent>
    <FooterComponent></FooterComponent>
  </div>
);}

export default ClasesComponent;

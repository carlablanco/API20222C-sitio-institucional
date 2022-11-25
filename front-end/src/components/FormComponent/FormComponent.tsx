import React, { FC, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import DropdownComponent from '../DropdownComponent/DropdownComponent';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import styles from "./FormComponent.module.scss";
import { filterClass } from '../../services/class.service';


interface FormComponentProps {}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const FormComponent: FC<FormComponentProps> = () => {

  React.useEffect(() => {
    searchMaterias();
  }, []);

  const searchMaterias = async () => {
      let response = await filterClass({status: 'Publicada'});
      response.data = response.data.map((element) => {
        return {
          label: element.name,
          id: element.id
        }
      });
      response.data = response.data.filter((value, index, self) => {
        return self.findIndex(v => v.label === value.label) === index;
      });
      setMaterias(response.data);
  }


  const [materias, setMaterias] = React.useState([])

  const frecuencias = [
    {label:'Unica', id: 1},
    {label:'Semanal', id: 2},
    {label:'Mensual', id: 3}
  ];
  const tiposDeClases = [
    {label:'Individual', id: 1},
    {label:'Grupal', id:2},
  ];
  const calificaciones = [
    {label:'1', id: 1},
    {label:'2', id:2},
    {label:'3', id:3},
    {label:'4', id: 4},
    {label:'5', id:5}
  ];

  const [materia, setMateria] = useState({label: '', id:''});

  const getSelectedMateria = (event: React.SyntheticEvent, value: any) => {
    setMateria(value);
  }

  const [tipoDeClase, setTipoDeClase] = useState({label: '', id:''});

  const getTipoDeClase = (event: React.SyntheticEvent, value: any) => {
    setTipoDeClase(value);
  }

  const [frecuencia, setFrecuencia] = useState({label: '', id:''});

  const getFrecuencia = (event: React.SyntheticEvent, value: any) => {
    setFrecuencia(value);
  }

  const [calificacion, setCalificacion] = useState({label: '', id:''});

  const getCalificacion = (event: React.SyntheticEvent, value: any) => {
    setCalificacion(value);
  }

  const navigate = useNavigate()

  const buscarClases = () => {
    navigate(`/classes?clase=${materia?.label}&frecuencia=${frecuencia?.label}&tipoDeClase=${tipoDeClase?.label}&calificacion=${calificacion?.label}`, {state: {
      materia,
      tipoDeClase,
      frecuencia,
      calificacion
    }})
  }

  return(
      <div className={styles.container}>
        <div className={styles.fila}>
          <DropdownComponent   onInputChange={getSelectedMateria} options={materias} label='Materias'></DropdownComponent>
        </div>
        <div className={styles.fila}>
          <DropdownComponent onInputChange={getTipoDeClase} options={tiposDeClases} label='Tipo de Clase'></DropdownComponent>
        </div>
        <div className={styles.fila}>
          <DropdownComponent onInputChange={getFrecuencia} options={frecuencias} label='Frecuencia'></DropdownComponent>
        </div>
        <div className={styles.fila}>
          <DropdownComponent onInputChange={getCalificacion} options={calificaciones} label='Calificacion'></DropdownComponent>
        </div>
        <div>
          <button className={styles.boton} disabled={!materia?.id} onClick={buscarClases} >
            Buscar Clases 
          </button>
        </div>
        
      </div>
  );
}

export default FormComponent;

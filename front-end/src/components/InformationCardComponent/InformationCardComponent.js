import * as React from 'react';
import "./InformationCardComponent.css";

export default function InformationCardComponent({title, imageSource, text}) {
  return (
    <div className='card text-center w-75 contenedor align-center justify-content-center'>
        <a href="/">
          <img src={imageSource} alt="card" />
          <div className='card-body'>
              <h4 className='card-title'> {title}</h4>
              <p className='card-text text-secondary'>
                {text}
              </p>

          </div>
        </a>
    </div>
    
  );
}

import React from 'react';
import InformationCardComponent from "./InformationCardComponent";
import imgWeb from "../../img/web.png";
import imgCocina from "../../img/libro.png";
import imgMat from "../../img/matematica.jpg";
import imgDib from "../../img/dibujo.png";
import imgPython from "../../img/python.png"
import imgJava from "../../img/java.png";
import "./InformationCardsComponent.css";


const cards = [
	{
		id: 1,
		title: 'Curso de Python',
		image: imgPython,
		text: 'Aprende a programar en Python con nosotros, el lenguaje mas solicitado por el mundo'
	},
	{
		id: 2,
		title: 'Curso de Java',
		image: imgJava,
		text: '¿Conoces Java? ¿Programacion orientado a objetos? ¡Que estas esperando!'
	},
	{
		id: 3,
		title: 'Curso de diseño web',
		image: imgWeb,
		text: 'Te interesa el mundo de la web, veni a aprender con los mejores, HTML, CSS, JavaScript.'
	},
	{
		id: 4,
		title: 'Curso de Cocina',
		image: imgCocina,
		text: 'Aprende las mejores recetas de la mano de los mejores chefs'
	},
	{
		id: 5,
		title: 'Curso de Matematicas',
		image: imgMat,
		text: 'Aprenderas los fundamentos de la matematica en detalle'
	},
	{
		id: 6,
		title: 'Curso de Dibujo',
		image: imgDib,
		text: 'Aprende a dibujar con nosotros'
	}
]

export default function InformationCardsComponent() {
	return (
		<div className='container centrado'>
			<div className='row justify-content-center align-center'>
				{
					cards.map(card => (
						<div className='col-xxl-3 col-md-4 col-sm-5 margin' key={card.id}>
							<InformationCardComponent title={card.title} imageSource={card.image} text={card.text} />
						</div>
					))
				}
			</div>

		</div>
	)
};




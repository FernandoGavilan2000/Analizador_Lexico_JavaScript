import { Escaner } from './Analizador/Escaner.js';
import { ListCastegory } from './Analizador/ListCategory.js';

document.addEventListener('DOMContentLoaded', () => {
	let ModListener = false;
	const checkbox_modo = document.querySelector('#listener_checkbox');
	const btnAnalizar = document.querySelector('#btn-analizar');
	const btnFile = document.querySelector('#btn-filetxt');
	const btnClean = document.querySelector('#btn-clean');
	const txtInput = document.querySelector('#txt-input');

	checkbox_modo.addEventListener('change', () => {
		ModListener = !ModListener;
	});

	txtInput.addEventListener('input', () => {
		setTimeout(() => {
			if (ModListener) {
				StartAnalizador(txtInput);
			}
		}, 1000);
	});

	btnAnalizar.addEventListener('click', () => {
		StartAnalizador(txtInput);
	});
	btnFile.addEventListener('click', () => {
		let fileToLoad = document.getElementById('fileToLoad').files[0];
		if (fileToLoad) {
			let fileReader = new FileReader();
			fileReader.onload = function (fileLoadedEvent) {
				let textFromFileLoaded = fileLoadedEvent.target.result;
				txtInput.value = textFromFileLoaded;
			};

			fileReader.readAsText(fileToLoad, 'UTF-8');
		}
	});
	btnClean.addEventListener('click', () => {
		Clean_MainTable();
		txtInput.value = '';
		document.getElementById('fileToLoad').value = '';
		document.querySelector('#table-results').innerHTML = '';
	});
});

const Clean_MainTable = () => {
	document.querySelector('#n_tokens').innerHTML = 0;
	document.querySelector(`#PalabrasReservadas`).innerHTML = 0;
	document.querySelector(`#LiteralNumerico`).innerHTML = 0;
	document.querySelector(`#LiteralCadena`).innerHTML = 0;
	document.querySelector(`#Operadores`).innerHTML = 0;
	document.querySelector(`#Delimitadores`).innerHTML = 0;
	document.querySelector(`#SimbolosEspeciales`).innerHTML = 0;
	document.querySelector(`#Identificadores`).innerHTML = 0;
	document.querySelector(`#Importadores`).innerHTML = 0;
	document.querySelector(`#Comentarios`).innerHTML = 0;
};

const StartAnalizador = (txtInput) => {
	Clean_MainTable();
	const ListTokens = Escaner(txtInput.value);
	//console.log(ListTokens);
	//Actualizar Tabla Resumen:

	let MainTable = {};
	ListTokens.map((Token) => {
		if (!MainTable.hasOwnProperty(Token.get_CategoryToken())) {
			MainTable = {
				...MainTable,
				[Token.get_CategoryToken()]: 1,
			};
		} else {
			MainTable = {
				...MainTable,
				[Token.get_CategoryToken()]: MainTable[Token.get_CategoryToken()] + 1,
			};
		}
	});
	document.querySelector('#n_tokens').innerHTML = ListTokens.length.toString();
	for (const category in MainTable) {
		switch (category) {
			case ListCastegory.PalabrasReservadas:
				document.querySelector(`#PalabrasReservadas`).innerHTML = MainTable[category].toString();
				break;
			case ListCastegory.LiteralNumerico:
				document.querySelector(`#LiteralNumerico`).innerHTML = MainTable[category].toString();
				break;
			case ListCastegory.LiteralCadena:
				document.querySelector(`#LiteralCadena`).innerHTML = MainTable[category].toString();
				break;
			case ListCastegory.Operadores:
				document.querySelector(`#Operadores`).innerHTML = MainTable[category].toString();
				break;
			case ListCastegory.Delimitadores:
				document.querySelector(`#Delimitadores`).innerHTML = MainTable[category].toString();
				break;
			case ListCastegory.SimbolosEspeciales:
				document.querySelector(`#SimbolosEspeciales`).innerHTML = MainTable[category].toString();
				break;
			case ListCastegory.Identificadores:
				document.querySelector(`#Identificadores`).innerHTML = MainTable[category].toString();
				break;
			case ListCastegory.Importadores:
				document.querySelector(`#Importadores`).innerHTML = MainTable[category].toString();
				break;
			case ListCastegory.Comentarios:
				document.querySelector(`#Comentarios`).innerHTML = MainTable[category].toString();
				break;

			default:
				break;
		}
	}
	//Crear Tabla Dinamica
	const table_results = document.querySelector('#table-results');
	console.log(ListTokens);
	const tbodyString = ListTokens.reduce((total, value) => {
		let newcell =
			'<tr>' +
			'<td>' +
			`${value.get_ValueToken()}` +
			'</td>' +
			'<td><b><pre>&lt;' +
			`${value.get_TypeToken()}` +
			'&gt;</pre></b></td>' +
			'<td>' +
			`${value.get_CategoryToken()}` +
			'</td>' +
			'</tr>';
		return (total = total + newcell);
	}, '');
	table_results.innerHTML = tbodyString;
};

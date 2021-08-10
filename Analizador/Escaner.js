import Token from './C_Token.js';
import { ListCastegory } from './ListCategory.js';
import { ListTokens } from './ListTokens.js';
import {
	operadoresPredictivos,
	operadoresSingle,
	simbolosEspeciales,
	numbers,
	Mayusculas,
	Minusculas,
	delimitadorSingle,
	reservadas,
	Reservadas,
} from './Arrays.js';

import {
	IsSingleOperador,
	WhoIsSingleOperador,
	WhoIsSimboloEspec,
	WhoIsDelimitador,
	WhoIsReservedWord,
	WhoIsPalabraR_M,
} from './Helpers.js';

export const Escaner = (textoUI) => {
	//Eliminar los comentarios --> ????
	const cleaned_text = textoUI.replace(/\s/g, ''); //Limpiar texto sin espacios

	//console.log(cleaned_text);
	let input_text = cleaned_text + '!';
	console.log(input_text);
	let arrayTokens = [];
	let state = 0;
	let auxlex = '';
	let reserved = '';
	//let chart = '';

	let arrprv = [];
	let psb_rsrvd = '';
	let err_p_rsrvd = [];

	const addArrayToken = (TokenObject) => {
		arrayTokens.push(TokenObject);
		state = 0;
		auxlex = '';
	};

	for (let index = 0; index < input_text.length; index++) {
		let chart = input_text[index];
		switch (state) {
			case 0:
				for (let p_reservada = 0; p_reservada < Reservadas.length; p_reservada++) {
					if (chart === Reservadas[p_reservada][0]) {
						arrprv.push(p_reservada);
						console.log(arrprv);
					}
				}
				if (numbers.includes(chart)) {
					state = 27;
					auxlex += chart;
				} else if (Mayusculas.includes(chart)) {
					state = 2;
					auxlex += chart;
				} else if (chart === "'") {
					state = 3;
					auxlex += chart;
				} else if (chart === '"') {
					state = 32;
					auxlex += chart;
				} else if (delimitadorSingle.includes(chart)) {
					//Verificar que token encajo
					let NameTkn = WhoIsDelimitador(chart);
					addArrayToken(new Token(NameTkn, ListCastegory.Delimitadores, chart));
				} else if (simbolosEspeciales.includes(chart)) {
					//Verificar que token encajo
					let NameTkn = WhoIsSimboloEspec(chart);
					addArrayToken(new Token(NameTkn, ListCastegory.SimbolosEspeciales, chart));
				} else if (operadoresSingle.includes(chart)) {
					let NameTkn = WhoIsSingleOperador(chart);
					addArrayToken(new Token(NameTkn, ListCastegory.Operadores, chart));
				} else if (operadoresPredictivos.includes(chart)) {
					let infoNext = IsSingleOperador(chart, input_text[index + 1]);
					if (infoNext.hasOwnProperty('errorToken')) {
						console.error('Error Lexico en: ', chart);
						state = 0;
					} else {
						if (
							infoNext.nameToken === ListTokens.token_abrir_diple ||
							infoNext.nameToken === ListTokens.token_cerrar_diple ||
							infoNext.nameToken === ListTokens.token_guion_doble
						) {
							addArrayToken(
								new Token(infoNext.nameToken, ListCastegory.Delimitadores, `${chart}${input_text[index + 1]}`)
							);
							index = index + 1;
						} else if (infoNext.has_partner) {
							addArrayToken(
								new Token(infoNext.nameToken, ListCastegory.Operadores, `${chart}${input_text[index + 1]}`)
							);
							index = index + 1;
						} else {
							addArrayToken(new Token(infoNext.nameToken, ListCastegory.Operadores, chart));
						}
					}
				} else if (arrprv.length !== 0 || psb_rsrvd !== '') {
					if (psb_rsrvd === '') {
						psb_rsrvd += chart;
						state = 1;
					} else {
						state = 1;
					}
				} else {
					if (chart == '!' && input_text.length - 1) {
						console.info('SE TERMINO EL PROCESO DEL ANALIZADOR');
					} else {
						console.error('Error Lexico en :', chart);
						state = 0;
					}
				}
				break;

			case 1:
				if (Minusculas.includes(chart)) {
					psb_rsrvd += chart;
					arrprv = [];
					console.log(psb_rsrvd);
					if (Reservadas.includes(psb_rsrvd)) {
						let NameTkn = WhoIsPalabraR_M(psb_rsrvd);
						addArrayToken(new Token(NameTkn, ListCastegory.PalabrasReservadas, psb_rsrvd));
						psb_rsrvd = '';
						auxlex = '';
						arrprv = [];
						console.log('agredado');
					} else {
						for (let p_rsvd = 0; p_rsvd < Reservadas.length; p_rsvd++) {
							if (psb_rsrvd.indexOf(Reservadas[p_rsvd]) !== -1) {
								let restante = psb_rsrvd.replace(Reservadas[p_rsvd], '');
								let utilizado = Reservadas[p_rsvd];
								let NameTkn = WhoIsPalabraR_M(utilizado);
								addArrayToken(new Token(NameTkn, ListCastegory.PalabrasReservadas, utilizado));
								psb_rsrvd = '';
								auxlex = '';
								arrprv = [];
								index--;
								err_p_rsrvd.push(restante);
								//console.log(err_p_rsrvd)
								//console.error('La palabra reservada:', restante, 'no existe')
							}
						}
						state = 1;
					}
				} else {
					state = 0;
					index--;
					psb_rsrvd = '';
				}

				break;
			case 32:
				if (chart !== '"') {
					state = 34;
					auxlex += chart;
				} else if (chart === '"') {
					auxlex += chart;
					addArrayToken(new Token(ListTokens.token_cadena, ListCastegory.LiteralCadena, auxlex));
					//Ya no tenemos que hacer index-1
				} else if (chart === '!') {
					console.error('NUNCA SE CERRO LA CADENA');
				}
				break;

			case 34:
				if (chart !== '"') {
					state = 34;
					auxlex += chart;
				} else if (chart === '"') {
					auxlex += chart;
					addArrayToken(new Token(ListTokens.token_cadena, ListCastegory.LiteralCadena, auxlex));
					//Ya no tenemos que hacer index-1
				} else if (chart === '!') {
					console.error('NUNCA SE CERRO LA CADENA');
				}
				//Un else ????
				break;
			case 2:
				if (Mayusculas.includes(chart)) {
					state = 36;
					auxlex += chart;
				} else if (numbers.includes(chart) || Minusculas.includes(chart)) {
					state = 26;
					auxlex += chart;
				} else {
					addArrayToken(new Token(ListTokens.token_importador, ListCastegory.Importadores, auxlex));
					index -= 1;
				}
				break;

			case 3:
				if (chart !== "'") {
					state = 28;
					auxlex += chart;
				} else if (chart === "'") {
					auxlex += chart;
					addArrayToken(new Token(ListTokens.token_cadena_debil, ListCastegory.LiteralCadena, auxlex));
					//Ya no tenemos que hacer index-1
				} else if (chart === '!') {
					console.error('NUNCA SE CERRO LA CADENA DEBIL');
				}
				break;

			case 28:
				if (chart !== "'") {
					state = 28;
					auxlex += chart;
				} else if (chart === "'") {
					auxlex += chart;
					addArrayToken(new Token(ListTokens.token_cadena_debil, ListCastegory.LiteralCadena, auxlex));
					//Ya no tenemos que hacer index-1
				} else if (chart === '!') {
					console.error('NUNCA SE CERRO LA CADENA DEBIL');
				}
				//Un else ????
				break;
			case 36:
				if (Mayusculas.includes(chart)) {
					state = 36;
					auxlex += chart;
				} else {
					addArrayToken(new Token(ListTokens.token_importador, ListCastegory.Importadores, auxlex));
					index -= 1;
				}
				break;

			case 26:
				if (numbers.includes(chart) || Minusculas.includes(chart)) {
					auxlex += chart;
					//Ir revisando si se llevo una reservada
					for (let index = 0; index < reservadas.length; index++) {
						if (auxlex.includes(reservadas[index])) {
							const reserved_lenght = reservadas[index].length;
							const slice_size = auxlex.length - reserved_lenght;
							const Identificador = auxlex.slice(0, slice_size);
							addArrayToken(new Token(ListTokens.token_identificador, ListCastegory.Identificadores, Identificador));
							const token_reserved = WhoIsReservedWord(reservadas[index]);
							addArrayToken(new Token(token_reserved, ListCastegory.PalabrasReservadas, reservadas[index]));
							break;
						} else {
							state = 26;
						}
					}
					//state = 26;
					//auxlex += chart;
				} else {
					addArrayToken(new Token(ListTokens.token_identificador, ListCastegory.Identificadores, auxlex));
					index -= 1;
				}
				break;

			case 27:
				if (numbers.includes(chart)) {
					state = 27;
					auxlex += chart;
				} else {
					addArrayToken(new Token(ListTokens.token_entero, ListCastegory.LiteralNumerico, auxlex));
					index -= 1;
				}
				break;
			default:
				break;
		}
	}

	return arrayTokens;
};

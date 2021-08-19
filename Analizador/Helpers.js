import { ListTokens } from './ListTokens.js';
import {
	operadoresPredictivos,
	operadoresSingle,
	simbolosEspeciales,
	delimitadorSingle,
	reservadas,
	Reservadas,
} from './Arrays.js';

export const WhoIsPalabraR_M = (character) => {
	let NameToken = '';
	switch (character) {
		case Reservadas[0]:
			NameToken = ListTokens.token_importar;
			break;
		case Reservadas[1]:
			NameToken = ListTokens.token_delete;
			break;
		case Reservadas[2]:
			NameToken = ListTokens.token_if;
			break;
		case Reservadas[3]:
			NameToken = ListTokens.token_then;
			break;
		case Reservadas[4]:
			NameToken = ListTokens.token_else;
			break;
		case Reservadas[5]:
			NameToken = ListTokens.token_for;
			break;
		case Reservadas[6]:
			NameToken = ListTokens.token_while;
			break;

		case Reservadas[7]:
			NameToken = ListTokens.token_switch;
			break;
		case Reservadas[8]:
			NameToken = ListTokens.token_inrange;
			break;
		case Reservadas[9]:
			NameToken = ListTokens.token_false;
			break;
		case Reservadas[10]:
			NameToken = ListTokens.token_true;
			break;
		case Reservadas[11]:
			NameToken = ListTokens.token_imprimir;
			break;
		case Reservadas[12]:
			NameToken = ListTokens.token_var;
			break;
		case Reservadas[13]:
			NameToken = ListTokens.token_const;
			break;
		default:
			break;
	}
	return NameToken;
};

export const WhoIsReservedWord = (word) => {
	let NameToken = '';
	switch (word) {
		case reservadas[0]:
			NameToken = ListTokens.token_importar;
			break;
		case reservadas[1]:
			NameToken = ListTokens.token_delete;
			break;
		case reservadas[2]:
			NameToken = ListTokens.token_if;
			break;
		case reservadas[3]:
			NameToken = ListTokens.token_then;
			break;
		case reservadas[4]:
			NameToken = ListTokens.token_else;
			break;
		case reservadas[5]:
			NameToken = ListTokens.token_for;
			break;
		case reservadas[6]:
			NameToken = ListTokens.token_while;
			break;
		case reservadas[7]:
			NameToken = ListTokens.token_switch;
			break;
		case reservadas[8]:
			NameToken = ListTokens.token_inrange;
			break;
		case reservadas[9]:
			NameToken = ListTokens.token_true;
			break;
		case reservadas[10]:
			NameToken = ListTokens.token_false;
			break;
		case reservadas[11]:
			NameToken = ListTokens.token_imprimir;
			break;
		case reservadas[12]:
			NameToken = ListTokens.token_var;
			break;
		case reservadas[13]:
			NameToken = ListTokens.token_const;
			break;
		default:
			break;
	}
	return NameToken;
};
export const WhoIsDelimitador = (character) => {
	let NameToken = '';
	switch (character) {
		case delimitadorSingle[0]:
			NameToken = ListTokens.token_end_dolar;
			break;
		case delimitadorSingle[1]:
			NameToken = ListTokens.token_semicolon;
			break;
		case delimitadorSingle[2]:
			NameToken = ListTokens.token_abrir_corchete;
			break;
		case delimitadorSingle[3]:
			NameToken = ListTokens.token_cerrar_corchete;
			break;
		case delimitadorSingle[4]:
			NameToken = ListTokens.token_abrir_llave;
			break;
		case delimitadorSingle[5]:
			NameToken = ListTokens.token_cerrar_llave;
			break;
		case delimitadorSingle[6]:
			NameToken = ListTokens.token_abrir_parentesis;
			break;
		case delimitadorSingle[7]:
			NameToken = ListTokens.token_cerrar_parentesis;
			break;
		case delimitadorSingle[8]:
			NameToken = ListTokens.token_coma;
			break;
		default:
			break;
	}
	return NameToken;
};

export const IsSingleOperador = (actual, next) => {
	let respuesta = {};
	switch (actual) {
		case operadoresPredictivos[0]:
			if (next === '=') {
				respuesta.has_partner = true;
				respuesta.nameToken = ListTokens.token_doble_igual;
			} else {
				respuesta.has_partner = false;
				respuesta.nameToken = ListTokens.token_igual;
			}
			break;
		case operadoresPredictivos[1]:
			if (next === '=') {
				respuesta.has_partner = true;
				respuesta.nameToken = ListTokens.token_mayor_igual;
			} else if (next === '>') {
				respuesta.has_partner = true;
				respuesta.nameToken = ListTokens.token_cerrar_diple;
			} else {
				respuesta.has_partner = false;
				respuesta.nameToken = ListTokens.token_mayor;
			}
			break;
		case operadoresPredictivos[2]:
			if (next === '=') {
				respuesta.has_partner = true;
				respuesta.nameToken = ListTokens.token_menor_igual;
			} else if (next === '<') {
				respuesta.has_partner = true;
				respuesta.nameToken = ListTokens.token_abrir_diple;
			} else {
				respuesta.has_partner = false;
				respuesta.nameToken = ListTokens.token_menor;
			}
			break;
		case operadoresPredictivos[3]:
			if (next === '*') {
				respuesta.has_partner = true;
				respuesta.nameToken = ListTokens.token_o_potencia;
			} else {
				respuesta.has_partner = false;
				respuesta.nameToken = ListTokens.token_o_multiplicacion;
			}
			break;
		case operadoresPredictivos[4]:
			if (next === '&') {
				respuesta.has_partner = true;
				respuesta.nameToken = ListTokens.token_and;
			} else {
				respuesta.has_partner = false;
				respuesta.errorToken = true;
			}
			break;
		case operadoresPredictivos[5]:
			if (next === '|') {
				respuesta.has_partner = true;
				respuesta.nameToken = ListTokens.token_or;
			} else {
				respuesta.has_partner = false;
				respuesta.errorToken = true;
			}
			break;
		case operadoresPredictivos[6]:
			if (next === '-') {
				respuesta.has_partner = true;
				respuesta.nameToken = ListTokens.token_guion_doble;
			} else {
				respuesta.has_partner = false;
				respuesta.nameToken = ListTokens.token_o_resta;
			}
			break;
		default:
			break;
	}
	return respuesta;
};

export const WhoIsSingleOperador = (character) => {
	let NameToken = '';
	switch (character) {
		case operadoresSingle[0]:
			NameToken = ListTokens.token_diferente;
			break;
		case operadoresSingle[1]:
			NameToken = ListTokens.token_o_suma;
			break;
		case operadoresSingle[2]:
			NameToken = ListTokens.token_o_resta;
			break;
		case operadoresSingle[3]:
			NameToken = ListTokens.token_o_division;
			break;

		default:
			break;
	}
	return NameToken;
};

export const WhoIsSimboloEspec = (character) => {
	let NameToken = '';
	switch (character) {
		case simbolosEspeciales[0]:
			NameToken = ListTokens.token_interrogacion;
			break;
		case simbolosEspeciales[1]:
			NameToken = ListTokens.token_dos_puntos;
			break;
		case simbolosEspeciales[2]:
			NameToken = ListTokens.token_o_triangulo;
			break;
		case simbolosEspeciales[3]:
			NameToken = ListTokens.token_o_trianguloeq;
			break;
		case simbolosEspeciales[4]:
			NameToken = ListTokens.token_o_cuadrado;
			break;
		case simbolosEspeciales[5]:
			NameToken = ListTokens.token_o_raiz;
			break;
		case simbolosEspeciales[6]:
			NameToken = ListTokens.token_o_rombo;
			break;
		case simbolosEspeciales[7]:
			NameToken = ListTokens.token_o_circulo;
			break;
		case simbolosEspeciales[8]:
			NameToken = ListTokens.token_arroba;
			break;
		case simbolosEspeciales[9]:
			NameToken = ListTokens.token_almohadilla;
			break;
		case simbolosEspeciales[10]:
			NameToken = ListTokens.token_star;
			break;
		case simbolosEspeciales[11]:
			NameToken = ListTokens.token_copyright;
			break;
		default:
			break;
	}
	return NameToken;
};

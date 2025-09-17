/******************************************************************************************
 * Objetivo: Arquivo responsavel pelas funções para criar a API de estados e cidades
 * Data: 15/09/2025
 * Autor: Vitor Miguel
 * Versão 1.0
 ******************************************************************************************/
//import do arquivo estados e cidade
const dados = require('./estados_cidades.js')
const MESSAGE_ERROR = { status: false, statuscode: 500, development: 'Vitor Miguel Rodrigues Cezario' }

//Retorna a lista de estados
const getAllEstados = function () {
    //Padrão do JSON que será o retorno da função
    let message = { status: true, statuscode: 200, development: 'Vitor Miguel Rodrigues Cezario', uf: [] }

    dados.listaDeEstados.estados.forEach(function (item) {
        message.uf.push(item.sigla)
    })
    //Adiciona um novo elemento no JSON
    message.quantidade = message.uf.length

    //Apaga um elemento existente no JSON
    //delete message.status
    if (message.uf.length > 0)
        return message //Resultado Verdadeiro da API 200
    else
        return MESSAGE_ERROR //Resultado Falso da API 500 
}

//Retorna dados do estado filtrando pela sigla
const getEstadoBySigla = function (siglaNotTrat) {

    let sigla = String(siglaNotTrat).toUpperCase()

    let message = { status: true, statuscode: 200, development: 'Vitor Miguel Rodrigues Cezario', uf: sigla }

    dados.listaDeEstados.estados.forEach(function (item) {
        if (item.sigla == sigla) {
            message.descricao = item.nome
            message.capital = item.capital
            message.regiao = item.regiao
        }
    })

    if (message.uf.length > 0)
        return message //Resultado Verdadeiro da API 200
    else
        return MESSAGE_ERROR //Resultado Falso da API 500 
}

//Retorna a capital do estado filtrando pela sigla
const getCapitalBySigla = function (siglaNotTrat) {

    let sigla = String(siglaNotTrat).toUpperCase()

    let message = { status: true, statuscode: 200, development: 'Vitor Miguel Rodrigues Cezario', uf: sigla }

    dados.listaDeEstados.estados.forEach(function (item) {
        if (item.sigla == sigla) {
            message.descricao = item.nome
            message.capital = item.capital
        }
    })

    if (message.uf.length > 0)
        return message //Resultado Verdadeiro da API 200
    else
        return MESSAGE_ERROR //Resultado Falso da API 500 
}

//Retorna a lista de estados filtrando pela região
const getEstadosByRegiao = function (regiao) {
    let message = { status: true, statuscode: 200, development: 'Vitor Miguel Rodrigues Cezario', regiao: regiao, estados: [] }

    dados.listaDeEstados.estados.forEach(function (item) {
        if (item.regiao == regiao) {
            message.estados = item.cidades
        }
    })

}

//Retorna a lista de estados que forma a capital de um país filtrando pelo País
const getEstadoIsCapitalByCountry = function (pais) {

}

//Retorna as cidades existentes em um estado, filtrando pela sigla
const getCidadesBySigla = function (sigla) {

}

console.log(getEstadoBySigla(""))

module.exports = {
    getAllEstados,
    getEstadoBySigla,
    getCapitalBySigla
}
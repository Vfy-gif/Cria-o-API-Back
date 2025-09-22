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

    if(!isNaN(sigla)){
        return MESSAGE_ERROR
    }

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

    if(!isNaN(sigla)){
        return MESSAGE_ERROR
    }

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
const getEstadosByRegiao = function (regiaoNotTrat) {

    regiao = regiaoNotTrat.charAt(0).toUpperCase() + regiaoNotTrat.slice(1).toLowerCase()

    if(!isNaN(regiao)){
        return MESSAGE_ERROR
    }

    let message = { status: true, statuscode: 200, development: 'Vitor Miguel Rodrigues Cezario', regiao: regiao, estados: []}

    dados.listaDeEstados.estados.forEach(function (item) {
        if(item.regiao == regiao){
            uf = item.sigla
            descricao = item.nome
            message.estados.push({'uf': uf, 'descricao': descricao}) 
        }
    })

    if (message.regiao.length > 0)
        return message //Resultado Verdadeiro da API 200
    else
        return MESSAGE_ERROR //Resultado Falso da API 500 
}

//Retorna a lista de estados que forma a capital de um país filtrando pelo País
const getEstadoIsCapitalByCountry = function (paisNotTrat) {

    pais = paisNotTrat.charAt(0).toUpperCase() + paisNotTrat.slice(1).toLowerCase()

    if(!isNaN(pais)){
        return MESSAGE_ERROR
    }

    let message = { status: true, statuscode: 200, development: 'Vitor Miguel Rodrigues Cezario', capitais: []}

    if(dados.listaDeEstados.pais == pais){
        dados.listaDeEstados.estados.forEach(function (item) {
                if(item.capital_pais){

                    capital_atual = item.capital_pais.capital
                    capital_pais_ano_inicio = item.capital_pais.ano_inicio
                    capital_pais_ano_termino = item.capital_pais.ano_fim
                    regiao = item.regiao
                    uf = item.sigla
                    descricao = item.nome

                    message.capitais.push({capital_atual: capital_atual, uf: uf, descricao: descricao,
                                            capital: item.nome, regiao: regiao, capital_pais_ano_inicio: capital_pais_ano_inicio,
                                            capital_pais_ano_termino: capital_pais_ano_termino })
                }
        })
    }

    if (pais.length > 0)
        return message //Resultado Verdadeiro da API 200
    else
        return MESSAGE_ERROR //Resultado Falso da API 500 
}

//Retorna as cidades existentes em um estado, filtrando pela sigla
const getCidadesBySigla = function (siglaNotTrat) {

    sigla = siglaNotTrat.toUpperCase()

    if(!isNaN(sigla)){
        return MESSAGE_ERROR
    }

    let message = { status: true, statuscode: 200, development: 'Vitor Miguel Rodrigues Cezario', uf: sigla, descricao: [], quantidade_cidades: [], cidades: []}

    dados.listaDeEstados.estados.forEach(function (item) {
        if (item.sigla == sigla) {
            message.descricao = item.nome
            message.quantidade_cidades = item.cidades.length
            message.cidades = item.cidades.map(cidade => cidade.nome);
        }
    })
    
    if (sigla.length > 0 && sigla.length < 3 && sigla.length != 1)
        return message //Resultado Verdadeiro da API 200
    else
        return MESSAGE_ERROR //Resultado Falso da API 500 
}

module.exports = {
    getAllEstados,
    getEstadoBySigla,
    getCapitalBySigla,
    getEstadosByRegiao,
    getEstadoIsCapitalByCountry,
    getCidadesBySigla
}
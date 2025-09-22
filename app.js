/******************************************************************************************
 * Objetivo: API responsavel em criar endPoints referente estados e cidades
 * Data: 15/09/2025
 * Autor: Vitor Miguel
 * Versão 1.0
 * 
 * Observações: Instalar dependencias para criar a API
 *      express     - npm install express       --save  Instala as dependencias para criar uma API
 *      cors        - npm install cors          --save  Instala as dependencias para configurar as permissões de uma API
 *      body-parser - npm install body-parser   --save  Instala as dependencias para receber os tipos de dados via POST ou PUT
 ******************************************************************************************/

//Import das dependencias
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Import do arquivo de funções
const dados         = require('./modulo/funcoes.js')

//Define a porta padrão da API, se for em um servidor de nuvem não temos acesso a porta
                // em execução local podemos definir uma porta livre
const PORT          = process.PORT || 8080

//Instancia na classe do express
const app = express()

//configurações do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET') // Metodos (Verbos) do protocolo HTTP

    app.use(cors())
    next()  //Proximo
})

//Request   -> Recebe os dados da API
//Response  -> Envia os dados na API

//EndPoints
app.get('/v1/estados', function(request, response){
    let estados = dados.getAllEstados()

    response.status(estados.statuscode)
    response.json(estados)
})

app.get('/v1/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estado = dados.getEstadoBySigla(sigla)

    response.status(estado.statuscode)
    response.json(estado)
})

app.get('/v1/capital/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let capital = dados.getCapitalBySigla(sigla)
    
    response.status(capital.statuscode)
    response.json(capital)
})

app.get('/v1/regiao/estado/', function(request, response){
    let regiaoEstados = request.query.regiao
    let estados = dados.getEstadosByRegiao(regiaoEstados)
    
    response.status(estados.statuscode)
    response.json(estados)
})

app.get('/v1/pais/estado/', function(request, response){
    let estado = request.query.pais
    let capital = dados.getEstadoIsCapitalByCountry(estado)

    response.status(capital.statuscode)
    response.json(capital)
})

app.get('/v1/cidades/estado/', function(request, response){
    let estado = request.query.estado
    let cidades = dados.getCidadesBySigla(estado)

    response.status(cidades.statuscode)
    response.json(cidades)
})

//Start da API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})
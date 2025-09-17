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

    console.log(sigla)
})

app.get('/v1/regiao/estado/:id', function(request, response){
    let regiaoEstados = request.query.regiao
    let sigla         = request.query.uf
    let id            = request.params.id

    console.log(regiaoEstados)
    console.log(sigla)
    console.log(id)
})

//Start da API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})
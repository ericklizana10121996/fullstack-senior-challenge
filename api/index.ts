// const express = require('express');
// const { MongoClient } = require('mongodb');

// // import { RepositoryConstantsMongoDB } from ".src/features/infraestructura/constants/RepositoryConstantsMongoDB"
// const {RepositoryConstantsMongoDB} = require('./src/features/infraestructura/constants/RepositoryConstantsMongoDB.ts');
// const { default: TipoCambioRepositoryImpl } = require('./src/features/infraestructura/repository/implementations/TipoCambioRepositoryImpl');
// const { default: TipoCambioService } = require('./src/features/domain/services/TipoCambioService');
// const { ExternalApiService } = require('./src/features/infraestructura/services/external/ExternalApiService');
// const { TipoCambioController } = require('./src/features/presentation/controllers/TipoCambioApplicationController');
// const { TipoCambioApplicationService } = require('./src/features/presentation/services/TipoCambioApplicationService');


import express, { Express } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

// import * as swaggerDocument from './openapi.json';
import { MongoClient, ServerApiVersion } from 'mongodb';

import { RepositoryConstantsMongoDB } from './src/features/infraestructura/constants/RepositoryConstantsMongoDB';
import TipoCambioRepositoryImpl from './src/features/infraestructura/repository/implementations/TipoCambioRepositoryImpl';
import TipoCambioService from './src/features/domain/services/TipoCambioService';
import { ExternalApiService } from './src/features/infraestructura/services/external/ExternalApiService';
import { TipoCambioApplicationController } from './src/features/presentation/controllers/TipoCambioApplicationController';
import { TipoCambioApplicationService } from './src/features/presentation/services/TipoCambioApplicationService';
import { OperacionCambioApplicationController } from './src/features/presentation/controllers/OperacionCambioApplicationController';
import { OperacionCambioApplicationService } from './src/features/presentation/services/OperacionCambioApplicationService';
import OperacionCambioService from './src/features/domain/services/OperacionCambioService';
import OperacionCambioRepositoryImpl from './src/features/infraestructura/repository/implementations/OperacionCambioRepositoryImpl';
import { OperacionCambioRequest } from './src/features/domain/dto/OperacionCambioRequest';
import { HistoryClientRequest } from './src/features/domain/dto/HistoryClientRequest';

const app: Express = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const port = 3000;

// const mongoUrl = RepositoryConstantsMongoDB.URI_DB;
// const dbName = RepositoryConstantsMongoDB.NAME_DB;
const username = encodeURIComponent(`${RepositoryConstantsMongoDB.NAME_USER}`);
const password = encodeURIComponent(`${RepositoryConstantsMongoDB.PASS_USER}`);


const mongoUrl = RepositoryConstantsMongoDB.URI_DB.replace('${username}', username).replace('${password}', password);
console.log('mongoURL', mongoUrl);


MongoClient.connect(mongoUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}).then(client => {
    const db = client.db(RepositoryConstantsMongoDB.NAME_DB);
    const exchangeRateRepository = new TipoCambioRepositoryImpl(db, RepositoryConstantsMongoDB.NAME_COLLECTION_EXCHANGE_RATES);
  
    const exchangeRepository = new OperacionCambioRepositoryImpl(db, RepositoryConstantsMongoDB.NAME_COLLECTION_EXCHANGE);
    
    
    const externalApiService = new ExternalApiService();
    const exchangeRateService = new TipoCambioService(exchangeRateRepository, externalApiService);
    const exchangeRateApplicationService = new TipoCambioApplicationService(exchangeRateService);
    const exchangeRateController = new TipoCambioApplicationController(exchangeRateApplicationService);

    const exchangeService = new OperacionCambioService(exchangeRepository);

    const exchangeApplicationService = new OperacionCambioApplicationService(exchangeService);
  
    const exchangeController = new OperacionCambioApplicationController(exchangeApplicationService, 
                                    exchangeRateApplicationService);

    app.post('/save-rate', (req, res) => exchangeRateController.saveExchangeRate(req, res));

    app.post('/save-exchange-client/:clientId', (req, res) => {
      // console.log(req.body);
      const clientId = req.params.clientId.toString();
      const body:OperacionCambioRequest = req.body.data;
      exchangeController.saveExchange(body, clientId, res);
    });

    app.post('/history-exchange-client/:clientId', (req, res) => {
      // console.log(req.body);
      const clientId = req.params.clientId.toString();
      const body:HistoryClientRequest = req.body.filters;
      exchangeController.historyClient(body, clientId, res);
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => console.error(error));

  export { app }
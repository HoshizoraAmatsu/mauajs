const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const observacoesPorLembreteId = {};

//:id é um placeholder
//exemplo: /lembretes/123456/observacoes

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;

    //req.params dá acesso á lista de parâmetros da URL
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];

    observacoesDoLembrete.push({ id: idObs, texto });

    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;

    res.status(201).send(observacoesDoLembrete);
});

app.listen(5000, (() => {
    console.log('Observacoes. Porta 5000')
}));
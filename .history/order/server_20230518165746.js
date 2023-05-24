const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const db = require('./models');
const orderSchema = require('./orderSchema');
const orderResolver = require('./orderResolver');
const app = express();
const port = 5000;
app.use(bodyParser.json());
// Utilisation de GraphQL pour gérer les requêtes
app.use('/graphql', graphqlHTTP({
schema: orderSchema,
rootValue: orderResolver,
graphiql: true
}));

// Utilisation de body-parser pour analyser les demandes HTTP
app.use(bodyParser.urlencoded({ extended: true }));
// Implémentation de l'API REST
app.get('/orders', (req, res) => {
db.all(`SELECT * FROM orders`, [], (err, rows) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(rows);
});
});
app.get('/order/:id', (req, res) => {
db.get(`SELECT * FROM orders WHERE id = ?`, [req.params.id], (err, row) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json(row);
});
});
app.post('/order', (req, res) => {
const { name, email, password } = req.body;
db.run(`INSERT INTO orders (name, email, password) VALUES (?, ?, ?)`, [name,
email, password], (err) => {
if (err) {
res.status(400).json({ "error": err.message });
return;
}
res.json({ "message": "success" });
});
});
app.put('/order/:id', (req, res) => {
    const { name, email, password } = req.body;
    db.run(`UPDATE orders SET name = ?, email = ?, password = ? WHERE id = ?`,
    [name, email, password, req.params.id], (err) => {
    if (err) {
    res.status(400).json({ "error": err.message });
    return;
    }
    res.json({ "message": "success" });
    });
    });
    app.delete('customer/:id', (req, res) => {
    db.run(`DELETE FROM customers WHERE id = ?`, [req.params.id], (err) => {
    if (err) {
    res.status(400).json({ "error": err.message });
    return;
    }
    res.json({ "message": "success" });
    });
    });
    // Lancement du serveur
    app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}.`);
    });
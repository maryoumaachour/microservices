const sqlite3 = require('sqlite3').verbose();
// Connexion la base de données
let db = new sqlite3.Database('./database.sqlite', (err) => {
if (err) {
console.error(err.message);
throw err;
}
console.log('Base de données connectée.');
});
// Création de la table "tickets"
db.run(`CREATE TABLE IF NOT EXISTS tickets (
id INTEGER PRIMARY KEY AUTOINCREMENT,
Dep_ TEXT NOT NULL,
numVol TEXT NOT NULL UNIQUE,
password TEXT NOT NULL
)`);
// Modèle de données pour représenter un utilisateur
class Ticket {
constructor(name, email, password) {
this.name = name;
this.email = email;
this.password = password;
}
// Enregistrer un nouvel utilisateur dans la base de données
save(callback) {
db.run(`INSERT INTO tickets (name, email, password) VALUES (?, ?, ?)`,
[this.name, this.email, this.password], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Utilisateur ${this.name} ajouté avec l'ID ${this.lastID}`);
callback(null, this.lastID);
});
}
// Rechercher tous les utilisateurs dans la base de données
static findAll(callback) {
db.all(`SELECT * FROM tickets`, [], function(err, rows) {
if (err) {
console.error(err.message);
return callback(err);
}
const tickets = rows.map(row => new Ticket(row.name, row.email,
row.password));
callback(null, tickets);
});
}
// Rechercher un utilisateur par ID dans la base de données
static findById(id, callback) {
    db.get(`SELECT * FROM tickets WHERE id = ?`, [id], function(err, row) {
    if (err) {
    console.error(err.message);
    return callback(err);
    }
    if (!row) {
    return callback(new Error('Utilisateur non trouvé'));
    }
    const ticket = new Ticket(row.name, row.email, row.password);
    callback(null,ticket);
    });
    }
    // Mettre à jour un utilisateur dans la base de données
    static updateById(id, name, email, password, callback) {
    db.run(`UPDATE tickets SET name = ?, email = ?, password = ? WHERE id = ?`,
    [name, email, password, id], function(err) {
    if (err) {
    console.error(err.message);
    return callback(err);
    }
    console.log(`Utilisateur avec l'ID ${id} mis à jour.`);
    callback(null);
    });
    }
    // Supprimer un utilisateur de la base de données
    static deleteById(id, callback) {
    db.run(`DELETE FROM tickets WHERE id = ?`, [id], function(err) {
    if (err) {
    console.error(err.message);
    return callback(err);
    }
    console.log(`Utilisateur avec l'ID ${id} supprimé.`);
    callback(null);
    });
    }
    }
    module.exports = db;
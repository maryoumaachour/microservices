// ticketSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const ticketSchema = buildSchema(`
type Query {
ticket(id: Int!): Ticket
tickets: [Ticket]
}
type Mutation {
addTicket(HDep: String!, email: String!, password: String!): Ticket
}
type Ticket {
id: Int
HDep: String
email: String
password: String
}
`);
module.exports = ticketSchema;
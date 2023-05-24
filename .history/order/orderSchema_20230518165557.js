// orderSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const orderSchema = buildSchema(`
type Query {
order(id: Int!): Order
orders: [Order]
}
type Mutation {
addOrder(name: String!, email: String!, password: String!): Order
}
type Order {
id: Int
name: String
email: String
password: String
}
`);
module.exports = orderSchema;
// // customerSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const customerSchema = buildSchema(`
type Query {
customer(id: Int!): Customer
customers: [Customer]
}
type Mutation {
addCustomer(name: String!, email: String!, password: String!): Customer
}
type Customer {
id: Int
name: String
email: String
password: String
}
`);
module.exports = userSchema;Schema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const userSchema = buildSchema(`
type Query {
user(id: Int!): Customer
users: [Customer]
}
type Mutation {
addCustomer(name: String!, email: String!, password: String!): User
}
type User {
id: Int
name: String
email: String
password: String
}
`);
module.exports = userSchema;
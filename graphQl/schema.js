const { gql } = require("apollo-server-express");

//Schema
const typeDefs = gql`
  # TYPES =====================
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    created: String
  }
  type Token {
    token: String
  }

  # INPUTS =====================
  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }
  input AuthInput {
    email: String!
    password: String!
  }

  # Queries ======================
  type Query {
    #Usuarios
    getUser(token: String!) : User
  }

  type Mutation {
    #Usuarios
    newUser(input: UserInput) : User
    authUser(input: AuthInput) : Token
  }
`;

module.exports = typeDefs;
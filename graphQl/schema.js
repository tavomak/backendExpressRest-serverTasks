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
  type Project {
    id: ID
    name: String!
    user: ID!
    date: String
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
  input ProjectInput {
    name: String!
  }

  # Queries ======================
  type Query {
    #Usuarios
    getUser(token: String!) : User
    #Productos
    getProjects(token: String!) : [Project]
  }

  type Mutation {
    #Usuarios
    newUser(input: UserInput) : User
    authUser(input: AuthInput) : Token
    #Productos
    createProject(input: ProjectInput) : Project
    updateProject(input: ProjectInput) : Project
    removeProject(input: ProjectInput) : Project
  }
`;

module.exports = typeDefs;
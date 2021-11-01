const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		turtle(ScientificName: String!): Turtle,
		food(id: ID!) : Food
	},

	type Turtle {
		ScientificName: String
		EnglishName: String
		Family: String
		LivedYears: String
		InterestingFact: String
		foods: [Food]
	},

	
	type Food {
		id: ID
		name: String
		turtles: [Turtle]
	}
`;

module.exports = typeDefs;
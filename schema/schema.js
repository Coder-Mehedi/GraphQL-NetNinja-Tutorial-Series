const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/Book");
const Author = require("../models/Author");

const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLSchema
} = graphql;

const books = [
	{ name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
	{ name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
	{ name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
	{ name: "The hero of ages", genre: "Fantasy", id: "4", authorId: "2" },
	{ name: "The colour of magic", genre: "Fantasy", id: "5", authorId: "3" },
	{ name: "The light fantastic", genre: "Fantasy", id: "6", authorId: "3" }
];

const authors = [
	{ name: "Patrick Rothfuss", age: 44, id: "1" },
	{ name: "Brandon Sanderson", age: 42, id: "2" },
	{ name: "Terry Pratchett", age: 66, id: "3" }
];

const BookType = new GraphQLObjectType({
	name: "Book",
	description: "All the books",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(book) {
				// return _.find(authors, { id: book.authorId });
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	description: "All the authors",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(author) {
				// return _.filter(books, { authorId: author.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		books: {
			type: new GraphQLList(BookType),
			resolve() {
				// return books;
			}
		},
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(books, { id: args.id });
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve() {
				// return authors;
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(authors, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});

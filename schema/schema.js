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
	GraphQLSchema,
	GraphQLNonNull
} = graphql;

// const books = [
// 	{ name: "Name of the wind", genre: "Fantasy", id: "5e776b2b49c2a62e3885299f", authorId: "5e776a7149c2a62e3885299c" },
// 	{ name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "5e776ab449c2a62e3885299d" },
// 	{ name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "5e776ad549c2a62e3885299e" },
// 	{ name: "The hero of ages", genre: "Fantasy", id: "4", authorId: "5e776ab449c2a62e3885299d" },
// 	{ name: "The colour of magic", genre: "Fantasy", id: "5", authorId: "5e776ad549c2a62e3885299e" },
// 	{ name: "The light fantastic", genre: "Fantasy", id: "6", authorId: "5e776ad549c2a62e3885299e" }
// ];

// const authors = [
// 	{ name: "Patrick Rothfuss", age: 44, id: "5e776a7149c2a62e3885299c" },
// 	{ name: "Brandon Sanderson", age: 42, id: "2" },
// 	{ name: "Terry Pratchett", age: 66, id: "3" }
// ];

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
				return Author.findById(book.authorId);
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
				return Book.find({ authorId: author.id });
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
				let books = Book.find({});
				return books;
			}
		},
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(books, { id: args.id });
				return Book.findById(args.id);
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve() {
				let authors = Author.find({});
				return authors;
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(authors, { id: args.id });
				return Author.findById(args.id);
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age
				});
				return author.save();
			}
		},
		updateAuthor: {
			type: AuthorType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				age: { type: GraphQLInt }
			},
			resolve(parent, args) {
				let author = {};
				if (args.name) author.name = args.name;
				if (args.age) author.age = args.age;

				return Author.findByIdAndUpdate(
					args.id,
					{ $set: author },
					{ new: true }
				);
			}
		},
		deleteAuthor: {
			type: AuthorType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				return Author.findByIdAndRemove(args.id);
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				authorId: { type: GraphQLID }
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});
				return book.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});

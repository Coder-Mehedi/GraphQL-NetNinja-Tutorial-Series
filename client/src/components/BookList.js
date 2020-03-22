import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const getBookQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

const BookList = () => {
	const { loading, error, data } = useQuery(getBookQuery, {});

	if (loading) return <h4>Loading...</h4>;

	if (error) return <h5>{error}</h5>;

	return (
		<div>
			<ul id="book-list">
				{data.books.map(book => (
					<li key={book.id}>{book.name}</li>
				))}
			</ul>
		</div>
	);
};

export default BookList;

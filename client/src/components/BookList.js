import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/queries";

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

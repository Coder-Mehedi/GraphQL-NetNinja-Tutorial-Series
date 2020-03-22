import React from "react";
import { getBookQuery } from "../queries/queries";
import { useQuery } from "@apollo/react-hooks";

const BookDetails = ({ selected }) => {
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: { id: selected }
	});
	data && selected && console.log(data);
	if (loading) {
		return <h4>Loading Details...</h4>;
	}
	if (data) {
		return (
			<div id="book-details">
				<h2>{data.book.name}</h2>
				<p>{data.book.genre}</p>
				<p>{data.book.author.name}</p>
				<p>All books by this author</p>
				<ul className="other-books">
					{data.book.author.books.map(book => (
						<li key={book.id}>{book.name}</li>
					))}
				</ul>
			</div>
		);
	} else {
		return <h3>No Books Selected</h3>;
	}
};

export default BookDetails;

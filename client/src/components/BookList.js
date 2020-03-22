import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
	const [selected, setSelected] = useState(1);
	const { loading, error, data } = useQuery(getBooksQuery, {});

	if (loading) return <h4>Loading...</h4>;

	if (error) return <h5>{error}</h5>;

	return (
		<div>
			<ul id="book-list">
				{data.books.map(book => (
					<li key={book.id} onClick={e => setSelected(book.id)}>
						{book.name}
					</li>
				))}
			</ul>
			<BookDetails selected={selected} />
		</div>
	);
};

export default BookList;

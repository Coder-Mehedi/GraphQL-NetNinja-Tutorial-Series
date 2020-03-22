import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
	getBooksQuery,
	getAuthorsQuery,
	addBookMutation
} from "../queries/queries";

const AddBook = () => {
	const { loading, error, data } = useQuery(getAuthorsQuery, {});
	const [addBook] = useMutation(addBookMutation);

	const [name, setName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorId, setAuthor] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		if (name && genre && authorId) {
			addBook({
				variables: {
					name,
					genre,
					authorId
				},
				refetchQueries: [{ query: getBooksQuery }]
			});
			setName("");
			setGenre("");
			setAuthor("");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<label>Book name:</label>
				<input
					type="text"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</div>
			<div className="field">
				<label>Genre:</label>
				<input
					type="text"
					value={genre}
					onChange={e => setGenre(e.target.value)}
				/>
			</div>
			<div className="field">
				<label>Author:</label>
				<select value={authorId} onChange={e => setAuthor(e.target.value)}>
					<option>Select Author</option>
					{loading && <option disabled>Loading Author...</option>}
					{data &&
						data.authors.map(authorId => (
							<option key={authorId.id} value={authorId.id}>
								{authorId.name}
							</option>
						))}
				</select>
			</div>
			<button>Add Book</button>
		</form>
	);
};

export default AddBook;

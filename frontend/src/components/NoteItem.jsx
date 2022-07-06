import React from 'react';
import { useSelector } from 'react-redux';

const NoteItem = ({ note }) => {
	const { user } = useSelector((state) => state.auth);

	return (
		<div
			className="note"
			style={{
				backgroundColor: note.is_staff ? 'rgba(0,0,0,0.7)' : '#fff',
				color: note.is_staff ? '#fff' : '#000',
			}}
		>
			<h4>Note from {note.is_staff ? <span>Staff</span> : <span>{user.name}</span>}</h4>
			<p>{note.text}</p>
			<div className="note-date">{new Date(note.created_at).toLocaleString('en-UK')}</div>
		</div>
	);
};

export default NoteItem;

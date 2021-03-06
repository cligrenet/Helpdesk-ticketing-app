import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, createNote } from '../features/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import NoteItem from '../components/NoteItem';
import { FaPlus } from 'react-icons/fa';

// React Modal
const customStyles = {
	content: {
		width: '600px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		position: 'relative',
	},
};

Modal.setAppElement('#root');

function Ticket() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [noteText, setNoteText] = useState('');
	const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets);
	const { notes, isLoading: noteIsLoading } = useSelector((state) => state.notes);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { ticketId } = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getTicket(ticketId));
		dispatch(getNotes(ticketId));
	}, [dispatch, isError, message, ticketId]);

	// Close ticket
	const onTicketClose = () => {
		dispatch(closeTicket(ticketId));
		toast.success('Ticket closed');
		navigate('/tickets');
	};

	// Create note submit
	const onNoteSubmit = (e) => {
		e.preventDefault();
		dispatch(createNote({ noteText, ticketId }));
		closeModal();
	};

	// Open/close modal
	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	if (isLoading || noteIsLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <h3>Something went wrong</h3>;
	}

	return (
		<div className="ticket-page">
			<header className="ticket-header">
				<BackButton url="/tickets" />
				<h2>
					Ticket ID : {ticket.ticket_id}
					<span className={`status status-${ticket.status}`}>{ticket.status}</span>
				</h2>

				<p>
					Product : {ticket.product}{' '}
					<span className="ticket-header-date">
						Date Submitted: {new Date(ticket.created_at).toLocaleString('en-UL')}
					</span>
				</p>
				<div className="ticket-desc">
					<h3>Description of Issue </h3>
					<p>{ticket.description}</p>
				</div>
				<h2>Notes</h2>
			</header>

			{ticket.status !== 'closed' && (
				<button className="btn" onClick={openModal}>
					<FaPlus /> Add Note
				</button>
			)}

			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">
				<h2>Add Note</h2>
				<button className="btn-close" onClick={closeModal}>
					X
				</button>
				<form onSubmit={onNoteSubmit}>
					<div className="form-group">
						<textarea
							name="noteText"
							id="noteText"
							placeholder="Note text"
							className="form-control"
							value={noteText}
							onChange={(e) => setNoteText(e.target.value)}
						></textarea>
					</div>
					<div className="form-group">
						<button className="btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</Modal>

			{notes.map((note) => (
				<NoteItem key={note.note_id} note={note} />
			))}

			{ticket.status !== 'closed' && (
				<button className="btn btn-block btn-danger" onClick={onTicketClose}>
					Close Ticket
				</button>
			)}
		</div>
	);
}

export default Ticket;

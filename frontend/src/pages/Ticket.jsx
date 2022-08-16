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

	const status = `bg-[#333] text-[#fff] w-[100px] px-[20px] justify-center rounded-[10px] text-[16px] text-center float-right ${
		ticket.status === 'new' ? 'bg-highlight-yellow' : 'bg-highlight-blue'
	}`;

	return (
		<div className="relative text-left">
			<header>
				<BackButton url="/tickets" />
				<div className="mt-[20px]">
					<h2 className="text-xl font-semibold">
						Ticket ID : {ticket.ticket_id}
						<span className={status}>{ticket.status}</span>
					</h2>

					<p className="leading-relaxed">
						Product : {ticket.product}{' '}
						<span className="float-right">
							Date Submitted: {new Date(ticket.created_at).toLocaleString('en-UL')}
						</span>
					</p>
				</div>
				<div className="mt-[20px] mb-[40px] text-[17px] bg-bg-light">
					<h3 className="text-highlight-green">Description of Issue </h3>
					<p className="leading-relaxed">{ticket.description}</p>
				</div>
				<h2 className="font-semibold">Notes</h2>
			</header>

			{ticket.status !== 'closed' && (
				<button
					className="p-[10px] border-solid border border-highlight-green rounded-[5px]
				bg-highlight-green text-[#fff] text-[13px] font-bold cursor-pointer text-center flex items-center justify-center hover:scale-[.98] py-[5px] px-[15px]"
					onClick={openModal}
				>
					<FaPlus className="mr-[5px]" /> Add Note
				</button>
			)}

			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">
				<h2>Add Note</h2>
				<button
					className="text-[#000] absolute top-[5px] right-[5px] text-[12px] cursor-pointer hover:text-highlight-green"
					onClick={closeModal}
				>
					Close
				</button>
				<form onSubmit={onNoteSubmit}>
					<div className="mb-[10px]">
						<textarea
							name="noteText"
							id="noteText"
							placeholder="Note text"
							className="w-full p-[10px] border border-solid border-[#e6e6e6] rounded-[5px] mb-[10px]"
							value={noteText}
							onChange={(e) => setNoteText(e.target.value)}
						></textarea>
					</div>
					<div className="mb-[10px]">
						<button
							className="float-right p-[10px] border-solid border border-highlight-green rounded-[5px]
				bg-highlight-green text-[#fff] text-[16px] font-bold cursor-pointer text-center flex items-center justify-center hover:scale-[0.98] py-[5px] px-[15px]"
							type="submit"
						>
							Submit
						</button>
					</div>
				</form>
			</Modal>

			{notes.map((note) => (
				<NoteItem key={note.note_id} note={note} />
			))}

			{ticket.status !== 'closed' && (
				<button
					className="mt-[10px] p-[10px] border-solid border border-highlight-blue rounded-[5px]
				bg-highlight-blue text-[#fff] text-[13px] font-bold cursor-pointer text-center flex items-center justify-center hover:scale-[.98] w-full"
					onClick={onTicketClose}
				>
					Close Ticket
				</button>
			)}
		</div>
	);
}

export default Ticket;

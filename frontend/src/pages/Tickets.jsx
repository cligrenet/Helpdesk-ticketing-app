import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
	const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets);

	const dispatch = useDispatch();

	// Clear the state on unmount: return a function from useEffect
	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getTickets());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BackButton url="/" />
			<h1 className="text-3xl p-[20px]">Tickets</h1>
			<div>
				<div className="font-bold grid grid-cols-4 gap-[20px] justify-between items-center mb-[20px] bg-bg-light py-[10px] px-[15px] rounded-[5px]text-center">
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{tickets.map((ticket) => (
					<TicketItem key={ticket.ticket_id} ticket={ticket} />
				))}
			</div>
		</>
	);
}

export default Tickets;

import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
	const status = `bg-[#333] text-[#fff] w-[1/6] justify-center rounded-[10px] text-[16px] text-center ${
		ticket.status === 'new' ? 'bg-highlight-yellow' : 'bg-highlight-blue'
	}`;

	return (
		<div className="grid grid-cols-4 gap-[20px] justify-between items-center mb-[20px] bg-bg-light rounded-[5px]text-center">
			<div>{new Date(ticket.created_at).toLocaleString('en-UK')}</div>
			<div>{ticket.product}</div>
			<div className={status}>{ticket.status}</div>
			<Link
				to={`/tickets/${ticket.ticket_id}`}
				className="p-[10px] border-solid border border-highlight-green rounded-[5px]
		bg-[#fff] text-highlight-green text-[13px] font-bold cursor-pointer text-center flex items-center justify-center hover:scale-[0.98] py-[5px] px-[15px]"
			>
				View
			</Link>
		</div>
	);
};

export default TicketItem;

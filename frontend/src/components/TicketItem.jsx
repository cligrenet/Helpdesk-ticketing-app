import React from 'react';
import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
	return (
		<div className="ticket">
			<div>{new Date(ticket.created_at).toLocaleString('en-UK')}</div>
			<div>{ticket.product}</div>
			<div className={`status status-${ticket.status}`}>{ticket.status}</div>
			<Link to={`/tickets/${ticket.ticket_id}`} className="btn btn-reverse btn-sm">
				View
			</Link>
		</div>
	);
};

export default TicketItem;

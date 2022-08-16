import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
	return (
		<>
			<section className="text-[2rem] py-[20px] mb-[50px] font-bold">
				<h1 className="text-5xl pb-[20px]">What do you need help with?</h1>
				<p className="text-grey-2 leading-relaxed">Please choose from an option bellow</p>
			</section>

			<Link
				to="/new-ticket"
				className="p-[10px]  border-solid border border-highlight-green rounded-[5px]
			bg-[#fff] text-highlight-green font-[16px] font-bold cursor-pointer text-center flex items-center justify-center w-full mb-[20px] hover:scale-[.98]"
			>
				<FaQuestionCircle className="mr-[8px]" /> Create New Ticket
			</Link>
			<Link
				to="/tickets"
				className="p-[10px] border-solid border-1 border-highlight-green rounded-[5px]
			bg-highlight-green text-[#fff] font-[16px] font-bold cursor-pointer text-center flex items-center justify-center w-full mb-[20px] hover:scale-[.98]"
			>
				<FaTicketAlt className="mr-[8px]" /> View My Tickets
			</Link>
		</>
	);
}

export default Home;

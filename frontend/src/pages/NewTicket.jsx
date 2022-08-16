import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
	const { user } = useSelector((state) => state.auth);
	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets);

	const [name] = useState(user.name);
	const [email] = useState(user.email);
	const [product, setProduct] = useState('iPhone');
	const [description, setDescription] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			dispatch(reset());
			navigate('/tickets');
		}

		dispatch(reset());
	}, [dispatch, isError, isSuccess, message, navigate]);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createTicket({ product, description }));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BackButton url="/" />
			<section className="font-bold py-[20px] mb-[20px]">
				<h1 className="text-4xl pb-[10px]">Create New Ticket</h1>
				<p className="leading-relaxed text-grey-2 text-2xl">Please fill out the form below</p>
			</section>
			<section className="w-9/12 my-0 mx-auto">
				<div className="mb-[10px]">
					<label className="text-left block mb-[5px] ml-[3px]" htmlFor="name">
						Customer Name
					</label>
					<input
						type="text"
						className="w-full p-[10px] border border-solid border-[#e6e6e6] rounded-[5px] mb-[10px]"
						value={name}
						disabled
					/>
				</div>
				<div className="mb-[10px]">
					<label className="text-left block mb-[5px] ml-[3px]" htmlFor="email">
						Customer Email
					</label>
					<input
						type="text"
						className="w-full p-[10px] border border-solid border-[#e6e6e6] rounded-[5px] mb-[10px]"
						value={email}
						disabled
					/>
				</div>
				<form onSubmit={onSubmit}>
					<div className="mb-[10px]">
						<label className="text-left block mb-[5px] ml-[3px]" htmlFor="product">
							Product
						</label>
						<select
							name="product"
							id="product"
							className="w-full p-[10px] border border-solid border-[#e6e6e6] rounded-[5px] mb-[10px]"
							value={product}
							onChange={(e) => setProduct(e.target.value)}
						>
							<option value="iPhone">iPhone</option>
							<option value="Macbook Pro">Macbook Pro</option>
							<option value="Macbook Air">Macbook Air</option>
							<option value="iMac">iMac</option>
							<option value="iPad">iPad</option>
						</select>
					</div>
					<div className="mb-[10px]">
						<label className="text-left block mb-[5px] ml-[3px]" htmlFor="description">
							Description of the issue
						</label>
						<textarea
							name="description"
							id="description"
							placeholder="Description"
							className="w-full p-[10px] border border-solid border-[#e6e6e6] rounded-[5px] mb-[10px]"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						>
							Description
						</textarea>
					</div>
					<div className="mb-[10px]">
						<button
							className="px-[10px] py-[10px] border-solid border-1 border-highlight-green rounded-[5px]
			bg-highlight-green text-[#fff] font-[16px] font-bold cursor-pointer text-center flex items-center justify-center w-full mb-[20px] hover:scale-[.98]"
						>
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default NewTicket;

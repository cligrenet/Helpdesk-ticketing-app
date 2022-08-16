import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const navigate = useNavigate();

	/////////////////////////
	const dispatch = useDispatch();
	// Bring in any piece of the global state into a component by using the useSelector hook
	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
	/////////////////////////

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		// Redirect when logged in
		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== password2) {
			toast.error('Passwords do not match');
		} else {
			const userData = { name, email, password };

			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="text-4xl font-bold mb-[50px] px-20px">
				<h1 className="flex justify-center text-5xl mb-[10px]">
					<FaUser className="mr-[5px]" /> Register
				</h1>
				<p className="text-grey-2 leading-relaxed">Please create an account</p>
			</section>
			<section className="w-9/12 my-0 mx-auto">
				<form onSubmit={onSubmit}>
					<div className="mb-[10px]">
						<input
							type="text"
							className="w-full p-[10px] border border-solid border-[#e6e6e6] rounded-[5px] mb-[10px]"
							id="name"
							name="name"
							value={name}
							onChange={onChange}
							placeholder="Enter your name"
							required
						/>
					</div>
					<div className="mb-[10px]">
						<input
							type="email"
							className="w-full p-[10px] border border-solid border-[#e6e6e6] rounded-[5px] mb-[10px]"
							id="email"
							name="email"
							value={email}
							onChange={onChange}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="mb-[10px]">
						<input
							type="password"
							className="w-full p-[10px] border border-solid border-[#e6e6e6] rounded-[5px] mb-[10px]"
							id="password"
							name="password"
							value={password}
							onChange={onChange}
							placeholder="Enter your password"
							required
						/>
					</div>
					<div className="mb-[10px]">
						<input
							type="password"
							className="w-full p-[10px] border border-solid border-[#e6e6e6] rounded-[5px] mb-[10px]"
							id="password2"
							name="password2"
							value={password2}
							onChange={onChange}
							placeholder="Confirm your password"
							required
						/>
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

export default Register;

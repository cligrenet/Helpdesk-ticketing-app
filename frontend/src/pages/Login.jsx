import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();

	/////////////////////////
	const dispatch = useDispatch();
	// Bring in any piece of the global state into a component by using the useSelector hook
	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
	/////////////////////////s

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

		const userData = { email, password };

		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="text-4xl font-bold mb-[50px] px-20px">
				<h1 className="flex justify-center text-5xl mb-[10px]">
					<FaSignInAlt className="mr-[5px]" /> Login
				</h1>
				<p className="text-grey-2 leading-relaxed">Please log in to get support</p>
			</section>
			<section className="w-9/12 my-0 mx-auto">
				<form onSubmit={onSubmit}>
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

export default Login;

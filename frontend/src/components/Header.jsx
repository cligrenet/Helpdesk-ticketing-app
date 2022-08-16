import { FaSignInAlt, FaSignOutAlt, FaUser, FaHeadset } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<header className="flex justify-between items-center py-[20px] border-b border-solid border-[#e6e6e6] mb-[60px]">
			<div>
				<Link to="/" className="flex items-center text-highlight-green font-bold text-xl">
					<FaHeadset className="mr-[5px]" /> Help Desk
				</Link>
			</div>
			<ul className="flex items-center justify-between list-none">
				{user ? (
					<li className=" ml-[20px] flex items-center  hover:text-grey-1 leading-loose">
						<button
							className="px-[20px] py-[5px] border-solid border border-highlight-green rounded-[5px]
			bg-highlight-green text-[#fff] font-[16px] font-bold cursor-pointer text-center flex items-center justify-center hover:bg-[#fff] hover:text-highlight-green"
							onClick={onLogout}
						>
							<FaSignOutAlt className="mr-[5px]" /> Logout
						</button>
					</li>
				) : (
					<>
						<li className="ml-[20px] leading-loose">
							<Link
								to="/login"
								className="flex items-center text-highlight-green font-bold hover:text-grey-1"
							>
								<FaSignInAlt className="mr-[5px]" />
								Login
							</Link>
						</li>
						<li className="ml-[20px] leading-loose">
							<Link
								to="/register"
								className="flex items-center text-highlight-green font-bold hover:text-grey-1"
							>
								<FaUser className="mr-[5px]" />
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}

export default Header;

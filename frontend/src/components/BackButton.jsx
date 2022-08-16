import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BackButton = ({ url }) => {
	return (
		<Link
			to={url}
			className="p-[10px] border-solid border border-highlight-green rounded-[5px]
		bg-[#fff] text-highlight-green text-[16px] font-bold cursor-pointer text-center flex items-center justify-center hover:bg-highlight-green hover:text-[#fff] w-[100px]"
		>
			<FaArrowCircleLeft className="mr-[5px]" /> Back
		</Link>
	);
};

export default BackButton;

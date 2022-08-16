import { useSelector } from 'react-redux';

const NoteItem = ({ note }) => {
	const { user } = useSelector((state) => state.auth);

	return (
		<div
			className="border border-solid border-[#e6e6e6] rounded-[5px] p-[20px] text-left my-[20px] relative"
			style={{
				backgroundColor: note.is_staff ? '#aeeed7' : '#fff',
			}}
		>
			<h4 className="font-semibold">Note from {note.is_staff ? <span>Staff</span> : <span>{user.name}</span>}</h4>
			<p className="leading-relaxed">{note.text}</p>
			<div className="absolute top-[15px] right-[10px] text-[14px]">
				{new Date(note.created_at).toLocaleString('en-UK')}
			</div>
		</div>
	);
};

export default NoteItem;

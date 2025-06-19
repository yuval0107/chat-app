import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const { authUser } = useAuthContext();
    const otherUser = conversation.participants.find(p => p._id !== authUser._id);

    const handleClick = () => {
        setSelectedConversation(conversation);
    };

    return (
        <>
            <div
                className={`flex gap-3 items-center hover:bg-white/10 rounded-lg p-3 cursor-pointer transition-all duration-200
				${isSelected ? "bg-white/20" : ""}
				`}
                onClick={handleClick}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full ring ring-white/20 ring-offset-2 ring-offset-base-100'>
                        <img
                            src={otherUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt='user avatar'
                            className='object-cover w-full h-full'
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between items-center'>
                        <div>
                            <p className='font-bold text-white'>{otherUser?.fullName}</p>
                            <p className='text-white/70 text-sm'>Click to chat</p>
                        </div>
                        <span className='text-white/70 text-sm'>{extractTime(conversation.updatedAt)}</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1 bg-white/10' />}
        </>
    );
};
export default Conversation; 
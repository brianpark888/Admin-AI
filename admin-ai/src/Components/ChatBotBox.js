import React from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRefresh } from '@fortawesome/free-solid-svg-icons';
import 'react-resizable/css/styles.css';
import ChatBot from '@/Components/ChatBot';

const ChatBotBox = ({ onClose, deleteCollection, formId, formQuestion }) => { // Pass formId and formQuestion as props
    return (
        <Draggable defaultPosition={{ x: 0, y: 20 }}>
            <ResizableBox
                width={550}
                height={800}
                minConstraints={[300, 300]}
                maxConstraints={[800, 800]}
                className="flex bottom-5 right-10 z-100 bg-white shadow-lg border border-gray-300 rounded-md"
            >
                <div className="p-2 h-full w-full flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold px-2 py-2 ml-3 mt-5">Chat</h3>
                        <div className="flex items-center">
                            <button
                                onClick={deleteCollection}
                                className="bg-transparent hover:text-[#8302E1] font-md px-4 py-2 rounded" //delete chat history - why isn't this working?
                            >
                                Remove Chat History 
                                <FontAwesomeIcon icon={faRefresh} size="lg" />
                            </button>
                            <button
                                onClick={onClose}
                                className="text-gray-600 hover:text-[#8302E1] ml-auto mr-2"
                            >
                                <FontAwesomeIcon icon={faClose} size="lg" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <ChatBot className="h-full w-full" formId={formId} formQuestion={formQuestion} />
                    </div>
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default ChatBotBox;

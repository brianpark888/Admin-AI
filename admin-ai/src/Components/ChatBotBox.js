import React from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { deleteDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import 'react-resizable/css/styles.css';
import ChatBot from '@/Components/ChatBot';

const ChatBotBox = ({ onClose, formId, formQuestion }) => { // Pass formId and formQuestion as props
    const deleteCollection = async () => {
        const formRef = doc(db, 'forms', formId);
        const messageRef = collection(formRef, 'messages');
        const messagesSnapshot = await getDocs(messageRef);
        messagesSnapshot.docs.map(document => deleteDoc(doc(db, `forms/${formId}/messages`, document.id)))
    }
    return (
        <Draggable defaultPosition={{ x: 0, y: 20 }}>
            <ResizableBox
                width={550}
                height={800}
                minConstraints={[300, 300]}
                maxConstraints={[800, 800]}
                className="flex bottom-5 right-10 z-100 bg-white shadow-lg border border-gray-300 "
            >
                <div className="p-2 h-full w-full flex flex-col">
                    <div className="flex justify-between items-center mb-2  ">
                        
                        
                        <div className="flex items-center mt-5">
                        <h3 className="text-xl font-bold px-2 py-2 ml-3 mt-5  ">Chat</h3>
                            <button
                                onClick={deleteCollection}
                                className="bg-transparent hover:text-[#8302E1] font-md mt-5 rounded  " //delete chat history - why isn't this working?
                            >
                                Restart History 
                                <FontAwesomeIcon icon={faRefresh} size="lg" />
                            </button>

                        </div>
                        <button
                                onClick={onClose}
                                className="text-gray-600 hover:text-[#8302E1] ml-auto mr-5  mt-0 "
                            >
                                <FontAwesomeIcon icon={faClose} size="lg" />
                            </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <ChatBot formId={formId} formQuestion={formQuestion} />
                    </div>
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default ChatBotBox;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chat } from "@/Components/Chatbot/Chat";
import { collection, addDoc, doc, getDocs, query, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Button from "./Button";
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const querySnapshot = await collection(db, "messages");
      const q = query(querySnapshot, orderBy("timestamp"));
      const results = await getDocs(q);
      const fetchedMessages = [];

      results.forEach((doc) => {
        fetchedMessages.push(doc.data());
      });

      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages from Firebase: ", error);
    }
  };

  const handleSend = async (message) => {
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setLoading(true);
    console.log(updatedMessages);

    try {
      await addDoc(collection(db, "messages"), {
        role: message.role,
        parts: message.parts,
        timestamp: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }

      const result = await response.json();

      if (!result) {
        setLoading(false);
        return;
      }

      setMessages((messages) => [...messages, result]);

      try {
        await addDoc(collection(db, "messages"), {
          role: result.role,
          parts: result.parts,
          timestamp: new Date(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } catch (e) {
      console.error("Error fetching chat response: ", e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  
  async function deleteCollection() {
    const msgCollection = await collection(db, "messages");
    const q = query(msgCollection)
    const messages= await getDocs(q);
    
    messages.forEach((message)=>{
      deleteDoc(doc(db, "messages", message.id))
    })
    setMessages([]);
  }
  

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
            <Chat
              messages={messages}
              loading={loading}
              onSendMessage={handleSend}
            />
            <div ref={messagesEndRef} />
            <Button onClick={deleteCollection}>Delete Collection</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;

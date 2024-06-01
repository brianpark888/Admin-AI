"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chat } from "@/Components/Chatbot/Chat";
import { collection, addDoc, doc, getDocs, query, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Button from "./Button";
const ChatBot = ({formId, formQuestion, formPrompt}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formId, setFormId] = useState(null); // State variable for formId
  const messagesEndRef = useRef(null);
  const [responses, setResponses] = useState("");
  const chatPrompt = `I will give you responses to a question. This is the Question: ${formQuestion}. Responses: ${responses} I will also give you prompts to help query responses that fit criterias set in`;
  

  useEffect(() => {
    const fetchData = async () => {
      const formDocRef = doc(db, 'forms', formId);
      const responsesRef = collection(formDocRef, 'submissions');
      const responseSnapshot = await getDocs(responsesRef);
      // Mapping through each document and transforming its data to a string format
      const loadedResponses = responseSnapshot.docs.map(doc => 
        {const data = doc.data();
        return `Name: ${data.name}. Response: ${data.answer}`}
      );
      // Joining all the stringified objects into a single string with line breaks or other separators if needed
      const responsesString = "Here is a list of responses: " + loadedResponses.join('\n');
      setResponses(responsesString);
    };
  
    fetchData();
  }, [formId]);
  


  useEffect(() => {
    // Run this code only on the client side
    const urlParams = new URLSearchParams(window.location.search);
    const formId = urlParams.get('code');
    setFormId(formId);
  }, []);

  useEffect(() => {
    if (formId) {
      fetchMessages();
    }
  }, [formId]);

  const fetchMessages = async () => {
    try {
      const messagesRef = collection(db, "forms", formId, "messages");
      const q = query(messagesRef, orderBy("timestamp"));
      const results = await getDocs(q);
      const fetchedMessages = [];

      results.forEach((doc) => {
        fetchedMessages.push({ role: doc.data().role, parts: doc.data().parts });
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
      await addDoc(collection(db, "forms", formId, "messages"), {
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
          systemInstruction: chatPrompt
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
        await addDoc(collection(db, "forms", formId, "messages"), {
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

  const deleteCollection = async () => {
    try {
      const messagesRef = collection(db, "forms", formId, "messages");
      const q = query(messagesRef);
      const messagesSnapshot = await getDocs(q);

      const deletePromises = messagesSnapshot.docs.map((message) =>
        deleteDoc(doc(db, "forms", formId, "messages", message.id))
      );

      await Promise.all(deletePromises);
      setMessages([]);
    } catch (error) {
      console.error("Error deleting collection: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
          <div className="max-w-[800px] mx-auto mt-4 sm:mt-5">
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

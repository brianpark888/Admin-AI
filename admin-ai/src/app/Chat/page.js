"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Chat } from "@/Components/Chatbot/Chat";
import { collection, addDoc,getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // 경로를 실제 firebase.js 파일 위치에 맞게 수정



export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const fetchMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const fetchedMessages = [];
    querySnapshot.forEach((doc) => {
      fetchedMessages.push(doc.data());
    });
    setMessages(fetchedMessages);
  };
  const handleSend = async (message) => {
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setLoading(true);

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
          messages: updatedMessages.slice(1),
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

  const handleReset = async () => {
    // 모델의 첫 문장 추가
    const initialMessage = {
      role: "model",
      parts: [{ text: "안녕? 나는 엘리엇이야. 오늘은 무슨 일이 있었니?" }],
    };
  
    // Firebase에서 메시지 불러오기
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push(doc.data());
      });
  
      // 모델의 첫 문장 뒤에 Firebase에서 불러온 메시지 추가
      setMessages([initialMessage, ...fetchedMessages]);
    } catch (error) {
      console.error("Error fetching messages from Firebase: ", error);
      // 에러가 발생할 경우에도 모델의 첫 문장만 표시
      setMessages([initialMessage]);
    }
  };
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);
  useEffect(() => {
    fetchMessages(); // 컴포넌트가 렌더링될 때 Firestore에서 메시지 데이터를 읽어옵니다.
  }, []);
  useEffect(() => {
    handleReset();
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
          </div>
        </div>
        
        <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center sm:justify-between justify-center"></div>
      </div>
    </>
  );
}
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./components/SideBar";
import { ChatArea } from "./components/ChatArea";
import { MessageInput } from "./components/MessageInput";

function ChatApp() {
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [model, setModel] = useState("mixtral-8x7b-32768");
  const [conversationalMemoryLength, setConversationalMemoryLength] =
    useState(10);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (userQuestion) {
      setLoading(true); // Set loading state to true when sending a message
      try {
        const response = await axios.post("http://localhost:5000/api/chat", {
          userQuestion,
        });
        const message = { author: "You", content: userQuestion };
        const aiResponse = {
          author: "Quickie",
          content: response.data.response,
        };
        setChatHistory([...chatHistory, message, aiResponse]);
        setUserQuestion("");
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false); // Set loading state to false after receiving the response
      }
    }
  };

  return (
    <div className="flex h-screen ">
      <Sidebar
        model={model}
        setModel={setModel}
        conversationalMemoryLength={conversationalMemoryLength}
        setConversationalMemoryLength={setConversationalMemoryLength}
      />
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl poppins p-5 px-5 font-semibold">Quickie</h1>
        <ChatArea
          chatHistory={chatHistory}
          loading={loading}
          setUserQuestion={setUserQuestion}
          handleSend={handleSend}
        />
        <MessageInput
          userQuestion={userQuestion}
          setUserQuestion={setUserQuestion}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
}

export default ChatApp;

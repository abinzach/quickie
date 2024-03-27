import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/SideBar";
import { ChatArea } from "./components/ChatArea";
import { MessageInput } from "./components/MessageInput";
import { BackendLoading } from "./components/BackendLoading";

function ChatApp() {
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [model, setModel] = useState("mixtral-8x7b-32768");
  const [backendLoading, setBackendLoading] = useState(true);
  const [conversationalMemoryLength, setConversationalMemoryLength] =
    useState(10);
  const [loading, setLoading] = useState(false);
//https://quickie-backend.onrender
  useEffect(() => {
    const fetchData = async () => {
    

      try {
        const response = await axios.get(
          "https://quickie-backend.onrender/"
        );
        console.log("response", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setBackendLoading(false); // Update loading state when request completes (success or failure)
      }
    };

    fetchData();
  }, [backendLoading]);

  const handleSend = async () => {
    if (userQuestion) {
      setLoading(true); // Set loading state to true when sending a message
      try {
        const response = await axios.post(
          "https://quickie-backend.onrender/api/chat",
          {
            userQuestion,
          }
        );
        console.log(response);
        const message = { author: "You", content: userQuestion };
        const aiResponse = {
          author: "Quickie",
          content: response.data.content,
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
  if (backendLoading) {
    return <BackendLoading/>
  }
  return (
    <div className="flex h-screen ">
      <Sidebar
        model={model}
        setModel={setModel}
        conversationalMemoryLength={conversationalMemoryLength}
        setConversationalMemoryLength={setConversationalMemoryLength}
      />
      <div className="flex-1 flex flex-col">
        <h1
          onClick={() => window.location.reload()}
          className="text-3xl poppins p-5 px-5 cursor-pointer font-semibold"
        >
          Quickie
        </h1>
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

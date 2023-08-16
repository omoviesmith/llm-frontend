import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

//
import AppLogo from "../components/logo";
import Message from "../components/message";

//
import send from "../assets/send.svg";

//
import { askQuestion, getChatHistory } from "../apis/chat";

//
import useUserSession from "../hooks/useUserSession";

//
interface IMessage {
  text: string;
  isReply: boolean;
}

/**
 *
 */
export default function ChatPage() {
  const { getUserId, isFirstTime, resetUserId } = useUserSession();
  const location = useLocation();

  //
  const [input, setInput] = useState<string>("");
  const [msgList, setMsgList] = useState<IMessage[]>([]);

  //
  const messageListRef = useRef<HTMLDivElement>(null);
  const messageListParentRef = useRef<HTMLDivElement>(null);

  // Get chat history of the user
  useQuery({
    queryKey: ["chat-history"],
    queryFn: () => {
      const userId = getUserId();
      return getChatHistory(userId);
    },
    onSuccess: (data) => {
      const formattedData = data
        .map((entry) => [
          { text: entry[0], isReply: false },
          { text: entry[1], isReply: true },
        ])
        .flat();

      if (formattedData.length) {
        setMsgList((prev) => [...formattedData, ...prev]);
      }
    },
    enabled: !isFirstTime,
  });

  // Ask a new question
  const mutation = useMutation({
    mutationFn: (question: string) => {
      const userId = getUserId();
      return askQuestion(question, userId);
    },
    onSuccess: (data) => {
      setMsgList((msgs) => [...msgs, { text: data.answer, isReply: true }]);
    },
  });

  //
  function resetUserSession() {
    resetUserId();
    setMsgList([]);
  }

  //
  function handleKeyUpInput(key: string) {
    if (key !== "Enter") return;

    submitInput(input);
  }

  //
  function submitSearchInput() {
    submitInput(input);
  }

  //
  function submitInput(message: string) {
    if (!message) return;

    //
    setInput("");
    setMsgList((msgs) => [...msgs, { text: message, isReply: false }]);

    //
    mutation.mutate(message);
  }

  //
  useEffect(() => {
    if (location.state?.input) {
      submitInput(location.state?.input);

      // Removing anything in the state
      window.history.replaceState({}, document.title);
    }

    return () => {
      setMsgList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scrolling to bottom of message list
  useEffect(() => {
    if (messageListRef.current) {
      const height = (messageListRef.current?.offsetHeight ?? 0) + 650;

      setTimeout(() => {
        messageListParentRef.current?.scrollTo({
          top: height,
          behavior: "smooth",
        });
      }, 120);
    }
  }, [msgList]);

  //
  return (
    <div className="w-full h-screen px-2 pt-2 pb-6 flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-3">
        <div className="col-span-3 md:col-span-1">
          <div className="pt-3 px-5 flex gap-10 justify-center md:justify-start">
            <Link to="/about" className="underline">
              About
            </Link>
            <Link to="/donate" className="underline">
              Donate
            </Link>
          </div>
        </div>

        <div className="col-span-3 md:col-span-1 flex justify-center pt-5">
          <Link to="/">
            <AppLogo />
          </Link>
        </div>

        <div className="col-span-3 md:col-span-1 flex justify-end pt-3 px-5">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Chat box */}
      <div className="mt-12 flex flex-grow flex-col justify-between items-center">
        <div className="max-w-[1100px] rounded-[20px] w-full max-h-[500px] h-full bg-[#313131B2] relative overflow-y-hidden pb-[100px] md:pb-[84px]">
          {/* Messages */}
          <div className="overflow-y-auto h-full" ref={messageListParentRef}>
            <div className="pb-5" ref={messageListRef}>
              {msgList.map((msg, index) => (
                <Message message={msg.text} isReply={msg.isReply} key={index} />
              ))}

              {mutation.isLoading && (
                <div className="my-5">
                  <span className="loader" />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="w-full absolute bottom-2 flex justify-center px-2 pt-2 h-[100px] md:h-[84px]  bg-[#313131]">
            <div className="max-w-3xl w-full flex flex-col items-center">
              <div className="relative w-full">
                <input
                  className="w-full rounded-full bg-[#313134b3] border border-[#383838] h-12 text-sm outline-none focus:outline-none focus:border-gray-600 pl-5 pr-16 disabled:cursor-wait"
                  placeholder="Ask me other questions"
                  value={input}
                  disabled={mutation.isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyUp={(e) => handleKeyUpInput(e.key)}
                />

                <div className="absolute right-5 h-full flex items-center top-0 cursor-pointer">
                  <img
                    src={send}
                    alt="Send"
                    onClick={() => submitSearchInput()}
                  />
                </div>
              </div>

              <p className="mt-2 text-gray-400 text-sm text-center">
                <span>
                  This free tool was created by mob for the community based on
                  GPT 3.5 by OpenAI.
                </span>
                <Link to="/about" className="underline ml-1">
                  Find out more about this project.
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-2 text-sm">
          <button
            className="text-red-400 hover:underline"
            onClick={() => resetUserSession()}
          >
            Delete history
          </button>
        </div>
      </div>
    </div>
  );
}

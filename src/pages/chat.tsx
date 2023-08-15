import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

//
import AppLogo from "../components/logo";
import Message from "../components/message";

//
import send from "../assets/send.svg";

//
const TEMP_OUTPUT =
  "The Voice to Parliament refers to a proposed constitutional amendment aimed at providing Indigenous Australians with a formal mechanism to have their voices heard in matters of national significance. It seeks to establish a representative body that will advise and influence the Australian Parliament on policies and legislation affecting Indigenous communities. This mechanism aims to address the historical marginalization and exclusion of Indigenous voices from the political decision-making process. The Voice to Parliament has been a subject of debate and consultation, with the goal of achieving greater recognition, empowerment, and self-determination for Indigenous peoples in Australia.";

//
interface IMessage {
  text: string;
  isReply: boolean;
}

/**
 *
 */
export default function ChatPage() {
  const location = useLocation();

  //
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  //
  const messageListRef = useRef<HTMLDivElement>(null);
  const messageListParentRef = useRef<HTMLDivElement>(null);

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

    // TODO:: Make API call and get response
    setMessages((msgs) => [
      ...msgs,
      { text: message, isReply: false },
      { text: TEMP_OUTPUT, isReply: true },
    ]);

    setInput("");

    // Scrolling to bottom of message list
    if (messageListRef.current) {
      const height = (messageListRef.current?.offsetHeight ?? 0) + 650;

      setTimeout(() => {
        messageListParentRef.current?.scrollTo({
          top: height,
          behavior: "smooth",
        });
      }, 120);
    }
  }

  //
  useEffect(() => {
    if (location.state.input) {
      submitInput(location.state.input);
    }

    return () => {
      setMessages([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </div>

      {/* Chat box */}
      <div className="mt-12 flex justify-center flex-grow">
        <div className="max-w-[1100px] rounded-[20px] w-full max-h-[650px] h-full bg-[#313131B2] relative overflow-y-hidden pb-[100px] md:pb-[84px]">
          {/* Messages */}
          <div className="overflow-y-auto h-full" ref={messageListParentRef}>
            <div className="pb-5" ref={messageListRef}>
              {messages.map((msg, index) => (
                <Message message={msg.text} isReply={msg.isReply} key={index} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="w-full absolute bottom-2 flex justify-center px-2 pt-2 h-[100px] md:h-[84px]  bg-[#313131]">
            <div className="max-w-3xl w-full flex flex-col items-center">
              <div className="relative w-full">
                <input
                  className="w-full rounded-full bg-[#313134b3] border border-[#383838] h-12 text-sm outline-none focus:outline-none focus:border-gray-600 pl-5 pr-16"
                  placeholder="Ask me other questions"
                  value={input}
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
                <a href="#" className="underline ml-1">
                  Find out more about this project.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

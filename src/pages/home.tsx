import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

//
import AppLogo from "../components/logo";
import AutoSuggestInput from "../components/AutoSuggestInput";

//
import comment from "../assets/comment.svg";

//
import useUserSession from "../hooks/useUserSession";

//
import { getFaqQuestions } from "../apis/faq";

/**
 *
 */
export default function HomePage() {
  useUserSession();
  const navigate = useNavigate();

  //
  const { data: faqQuestions } = useQuery({
    queryKey: ["faq-questions"],
    queryFn: () => {
      return getFaqQuestions();
    },
  });

  // //
  // const faqQuestions = [
  //   "What is the Voice to Parliament?",
  //   "Why do people say there is not enough detail?",
  //   "Explain what the Voice will do in simple terms",
  // ];

  //
  function navigateToChat(text: string) {
    if (!text) return;
    navigate("/chat", { state: { input: text } });
  }

  //
  return (
    <div className="w-full min-h-screen overflow-y-auto p-2">
      {/* Navigation */}
      <div className="absolute top-5 left-7 flex gap-10">
        <Link to="/about" className="underline">
          About
        </Link>
        <Link to="/donate" className="underline">
          Donate
        </Link>
      </div>

      {/* Logo */}
      <div className="justify-center flex mt-48">
        <div className="relative max-w-fit cursor-default">
          <AppLogo />
          <img
            src={comment}
            alt="The Voice Comment"
            className="absolute md:-right-32 -top-20 right-0"
          />
        </div>
      </div>

      {/* Input */}
      <div className="flex justify-center mt-10 mb-[70px]">
        <div className="max-w-2xl w-full">
          <AutoSuggestInput />
        </div>
      </div>

      {/* FAQ */}
      <div className="text-center font-futura">
        <p className="font-bold text-[32px] leading-[40px] mb-8 uppercase tracking-tight">
          Frequently Asked Questions
        </p>

        <div className="flex justify-center my-2">
          <div className="max-w-[720px] w-full grid grid-cols-3 gap-[10px]">
            {faqQuestions?.map((qn, index) => (
              <div
                className="col-span-3 md:col-span-1 rounded-[20px] bg-[#313134B2] px-6 py-3 flex justify-center items-center cursor-pointer"
                key={index}
                onClick={() => navigateToChat(qn)}
              >
                <span>“{qn}” →</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3 text-gray-400">
          <span>
            This free tool was created by mob for the community based on GPT 3.5
            by OpenAI.
          </span>
          <Link to="/about" className="underline ml-1">
            Find out more about this project.
          </Link>
        </p>
      </div>
    </div>
  );
}

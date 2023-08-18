import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
import axiosInstance from "../utils/axios";

//
import search from "../assets/search.svg";
import { useClickOutside } from "../hooks/useClickOutside";

//
function AutoSuggestInput() {
  const navigate = useNavigate();

  //
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [globalQuestionList, setGlobalQuestionList] = useState<string[]>([]);

  //
  const [isSuggestionVisible, setIsSuggestionVisible] =
    useState<boolean>(false);

  //
  const outsideRef = useClickOutside(() => setIsSuggestionVisible(false));

  //
  async function fetchGlobalQuestionList() {
    try {
      const response = await axiosInstance.get("/global-question-list");
      setGlobalQuestionList(response.data.global_question_list);
    } catch (error) {
      console.error("Error fetching global_question_list:", error);
    }
  }

  function handleInputChange(value: string) {
    setInputValue(value);

    // Filter global_question_list for auto-suggestions
    const filteredSuggestions = globalQuestionList.filter((question) =>
      question.includes(value)
    );

    //
    setSuggestions(filteredSuggestions);

    //
    if (filteredSuggestions.length > 0) {
      setIsSuggestionVisible(true);
    }
  }

  //
  function navigateToChat(text: string) {
    console.log("text", text);
    if (!text) return;
    navigate("/chat", { state: { input: text } });
  }

  //
  function submitInput() {
    navigateToChat(inputValue);
  }

  //
  function handleKeyUpInput(key: string) {
    if (key !== "Enter") return;

    navigateToChat(inputValue);
  }

  //
  useEffect(() => {
    // Fetch global_question_list when the component mounts
    fetchGlobalQuestionList();
  }, []);

  //
  return (
    <div className="relative w-full" ref={outsideRef}>
      <div className="relative w-full">
        <input
          className="w-full rounded-full bg-[#313134B2] h-12 text-center text-sm outline-none focus:none focus:border-gray-600 focus:border-2 pl-5 pr-16 peer"
          placeholder="Ask your question here."
          value={inputValue}
          onFocus={() => handleInputChange(inputValue)}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyUp={(e) => handleKeyUpInput(e.key)}
        />

        <div className="absolute right-5 h-full flex items-center top-0 cursor-pointer">
          <img src={search} alt="Search" onClick={() => submitInput()} />
        </div>
      </div>

      {suggestions.length > 0 && isSuggestionVisible && (
        <div className="absolute top-[3.25rem] w-full bg-stone-700 rounded-xl overflow-hidden">
          <div className="max-h-40 overflow-y-auto">
            {suggestions.map((sugg, index) => (
              <div
                key={index}
                className="text-gray-100 hover:bg-stone-800 px-2 py-2 cursor-pointer"
                onClick={() => navigateToChat(sugg)}
              >
                <p>{sugg}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AutoSuggestInput;

import axiosInstance from "../utils/axios";

/**
 *
 */
export async function askQuestion(question: string, userId: string) {
  const response = await axiosInstance.post<IAskResponse>("/ask", {
    question,
    userId,
  });
  return response.data;
}

/**
 *
 */
export async function getChatHistory(userId: string) {
  const response = await axiosInstance.get<IChatHistoryResponse>(
    `/chathistory/${userId}`
  );
  return response.data.chat_history;
}

//
interface IAskResponse {
  answer: string;
}

//
interface IChatHistoryResponse {
  chat_history: [string, string][];
}

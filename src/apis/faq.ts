import axiosInstance from "../utils/axios";

/**
 *
 */
export async function getFaqQuestions() {
  const response = await axiosInstance.get<IChatHistoryResponse>("/faq");
  return response.data.frequently_asked;
}

//
interface IChatHistoryResponse {
  frequently_asked: string[];
}

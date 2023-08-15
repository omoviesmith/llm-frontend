import { RouterProvider, createBrowserRouter } from "react-router-dom";

//
import HomePage from "./pages/home";
import ChatPage from "./pages/chat";
import DonatePage from "./pages/donate";
import AboutPage from "./pages/about";

//
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/donate",
    element: <DonatePage />,
  },
]);

/**
 *
 */
export default function App() {
  return <RouterProvider router={router} />;
}

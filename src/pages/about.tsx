import { Link } from "react-router-dom";

//
import AppLogo from "../components/logo";

/**
 *
 */
export default function AboutPage() {
  return (
    <div className="w-full min-h-screen p-2">
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

      <div className="pt-48 text-center font-futura">
        <p className="underline font-bold text-[32px] leading-[48px] uppercase">
          About the BlakGPT project
        </p>

        <p className="mt-3 text-gray-400">
          This free tool was created by mob for the community based on GPT 3.5
          by OpenAI.
        </p>
      </div>
    </div>
  );
}

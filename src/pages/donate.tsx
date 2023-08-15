import { Link } from "react-router-dom";

//
import AppLogo from "../components/logo";

/**
 *
 */
export default function DonatePage() {
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
    </div>
  );
}

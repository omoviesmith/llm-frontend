import { Link } from "react-router-dom";

//
import AppLogo from "../components/logo";
import { useState } from "react";
import classNames from "classnames";

/**
 *
 */
export default function DonatePage() {
  const [amount, setAmount] = useState<number>(10);
  const [payMode, setPayMode] = useState<"once" | "monthly">("once");

  //
  const isDisabled = amount < 1;

  //
  const amounts = [500, 300, 250, 200, 100, 50];

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

      <div className="flex-grow flex justify-center w-full my-20">
        <div className="max-w-[1100px] w-full h-full grid grid-cols-2 gap-2 md:gap-5 lg:gap-10">
          {/* Left side */}
          <div className="col-span-2 md:col-span-1 rounded-lg h-full bg-zinc-700 overflow-hidden">
            <img
              src="/donate.jpg"
              alt="donate"
              height={240}
              className="h-60 w-full object-cover"
            />
            <div className="p-3 md:p-7">
              <p className="text-center text-3xl font-inter font-bold uppercase">
                Donate
              </p>

              <div className="mt-10">
                <p className="text-lg text-gray-300 font-semibold">
                  Elevate Voices, Transform Lives: Donate Today!
                </p>

                <p className="text-gray-300 mt-5">
                  Welcome to our donations page dedicated to BlakGPT. Your
                  donation ignites change, empowers voices, and drives impact.
                  Join us in our mission to amplify, inspire, and create a
                  harmonious world. Your contribution matters – make a
                  difference today.
                </p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="col-span-2 md:col-span-1 rounded-lg h-full bg-zinc-700 p-3 md:p-7 flex flex-col justify-between min-h-[30rem]">
            <div>
              <div className="flex justify-center">
                <p className="font-semibold text-2xl">Secure Donation</p>
              </div>

              <div className="flex w-full text-center my-7">
                <div
                  className={classNames(
                    "w-1/2 cursor-pointer p-2 rounded-l-lg",
                    payMode === "once" ? "bg-[#4267B2]" : "bg-gray-500"
                  )}
                  onClick={() => setPayMode("once")}
                >
                  Give Once
                </div>
                <div
                  className={classNames(
                    "w-1/2 cursor-pointer p-2 rounded-r-lg",
                    payMode === "monthly" ? "bg-[#4267B2]" : "bg-gray-500"
                  )}
                  onClick={() => setPayMode("monthly")}
                >
                  ❤️ Monthly
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {amounts.map((amt, index) => (
                  <button
                    key={index}
                    className="col-span-1 p-2 bg-gray-600 border border-gray-500 hover:bg-gray-700 rounded"
                    onClick={() => setAmount(amt)}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="my-7">
                <div className="relative">
                  <div className="absolute h-full flex items-center pl-4">
                    <DollarIcon />
                  </div>
                  <input
                    className="w-full py-3 pl-14 focus:outline-none bg-neutral-600 rounded border border-transparent focus:border-neutral-500"
                    placeholder="Enter your custom donation amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-[#4267B2] py-3 w-full rounded text-lg font-semibold disabled:cursor-not-allowed"
                disabled={isDisabled}
                onClick={() => console.log("Donated amount", amount)}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//
function DollarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3c0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156c0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616c0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769c0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
      />
    </svg>
  );
}

import classNames from "classnames";

//
import userBot from "../assets/userBot.svg";
import userHuman from "../assets/userHuman.svg";

//
interface IMessageProps {
  message: string;
  isReply?: boolean;
}

/**
 *
 */
export default function Message({ isReply, message }: IMessageProps) {
  return (
    <div
      className={classNames(
        "flex w-full justify-center p-5 md:p-9 text-[15px]",
        {
          "rounded-[20px] bg-[#373737B2]": isReply,
        }
      )}
    >
      <div
        className={classNames(
          "flex items-center gap-4 md:gap-[26px]",
          isReply
            ? "justify-start pr-3 md:pr-[30px]"
            : "justify-end pl-3 md:pl-[30px]"
        )}
      >
        {isReply && (
          <img src={userBot} width={30} height={30} alt="User logo" />
        )}

        <div
          className={classNames(
            "w-full md:w-[540px] font-inter whitespace-pre-wrap break-words",
            isReply ? "text-start" : "text-end"
          )}
        >
          {message}
        </div>

        {!isReply && (
          <img src={userHuman} width={30} height={30} alt="User logo" />
        )}
      </div>
    </div>
  );
}

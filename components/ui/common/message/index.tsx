import { PropsWithChildren, useState } from "react";

export enum MessageTypes {
  success = "success",
  warning = "warning",
  danger = "danger",
}

const MessageType = {
  [MessageTypes.success]: "green",
  [MessageTypes.warning]: "yellow",
  [MessageTypes.danger]: "red",
};

enum Sizes {
  small = "sm",
  medium = "md",
  large = "lg",
}

const Size = {
  [Sizes.small]: "text-sm",
  [Sizes.medium]: "text-base",
  [Sizes.large]: "text-lg",
};

const BG_CLASSES = {
  [MessageTypes.success]: "bg-green-100",
  [MessageTypes.warning]: "bg-yellow-100",
  [MessageTypes.danger]: "bg-red-100",
};

const TEXT_CLASSES = {
  [MessageTypes.success]: "text-green-900",
  [MessageTypes.warning]: "text-yellow-900",
  [MessageTypes.danger]: "text-red-900",
};

const Message: React.FC<
  PropsWithChildren & { type: MessageTypes; size?: "sm" | "md" | "lg" }
> = ({ children, type = "success", size = "md" }) => {
  const [isDisplayed, setIsDisplayed] = useState(true);

  if (!isDisplayed) {
    return null;
  }

  return (
    <div className={`${BG_CLASSES[type]} rounded-xl mb-3`}>
      <div className="max-w-7xl mx-auto py-2 px-1 sm:px-3 lg:px-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <div className={`ml-3 ${Size[size]} ${TEXT_CLASSES[type]}`}>
              <span className="md:inline">{children}</span>
            </div>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              onClick={() => setIsDisplayed(false)}
              type="button"
              className="-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className={`h-6 w-6 ${TEXT_CLASSES[type]}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

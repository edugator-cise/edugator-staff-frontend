import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";

const AIChat = () => {
  return (
    <div className="absolute bottom-4 right-4 h-auto w-auto z-50">
      <Popover.Root>
        <Popover.Trigger asChild>
          <div className="flex items-center justify-center w-12 h-12 cursor-pointer bg-violet-500 rounded-full ring-1 ring-violet-400 z-50">
            <div className="w-6 h-6">
              <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.08495 16.1699L1.0431 18.1819C0.558764 18.3202 0.0955218 17.9067 0.178332 17.4098L1.15498 11.5499V2.30998C1.15498 1.69734 1.39835 1.10979 1.83156 0.676581C2.26476 0.243374 2.85233 0 3.46496 0H18.4798C19.0925 0 19.6802 0.243374 20.1134 0.676581C20.5466 1.10979 20.7898 1.69734 20.7898 2.30998V13.8599C20.7898 14.4726 20.5466 15.0601 20.1134 15.4934C19.6802 15.9266 19.0925 16.1699 18.4798 16.1699H8.08495Z"
                  className="fill-violet-300"
                />
                <path
                  d="M18 22.2856L22.9569 23.7018C23.4412 23.8403 23.9045 23.4267 23.8217 22.9299L23.1429 18.8571V11.9999C23.1429 11.5453 22.9622 11.1092 22.6408 10.7877C22.3193 10.4663 21.8832 10.2856 21.4286 10.2856H10.2857C9.83106 10.2856 9.39504 10.4663 9.07354 10.7877C8.75206 11.1092 8.57144 11.5453 8.57144 11.9999V20.5714C8.57144 21.026 8.75206 21.4621 9.07354 21.7835C9.39504 22.105 9.83106 22.2856 10.2857 22.2856H18Z"
                  className="fill-violet-100"
                />
              </svg>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="PopoverContent shadow-2xl shadow-black/10 font-dm rounded-lg overflow-hidden w-96 h-[32rem] relative bg-slate-100 dark:bg-nav-dark border dark:border-slate-700 border-slate-300"
            side="top"
            sideOffset={10}
            align="end"
          >
            <div className="w-full h-full flex flex-col">
              {/* Messages Pane */}
              <div className="overflow-y-auto h-full flex flex-col space-y-4 p-4">
                {/* Base Message */}
                <div className="max-w-[75%] w-fit h-auto bg-violet-600 flex items-end justify-end rounded-tl-xl rounded-tr-xl rounded-br-xl py-2 px-4">
                  <p className="text-sm font-dm text-white">
                    Hello! My name is Guppy and I'm here to help you with your
                    code.
                  </p>
                </div>
                <div className="max-w-[75%] w-fit h-auto bg-violet-600 flex items-end justify-end rounded-tl-xl rounded-tr-xl rounded-br-xl py-2 px-4">
                  <p className="text-sm font-dm text-white">
                    Ask me anything about your code and I'll try my best to
                    help!
                  </p>
                </div>
              </div>
              <div className="py-2 px-4 flex items-center justify-between w-full bg-slate-600/20 border-t dark:border-slate-700">
                <p className="text-sm font-ambit">Guppy</p>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default AIChat;

/**
 * <div className="absolute flex items-center justify-center right-4 bottom-4 w-12 h-12 bg-violet-500 rounded-full ring-1 ring-violet-400 z-50">
            <div className="w-6 h-6">
              <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.08495 16.1699L1.0431 18.1819C0.558764 18.3202 0.0955218 17.9067 0.178332 17.4098L1.15498 11.5499V2.30998C1.15498 1.69734 1.39835 1.10979 1.83156 0.676581C2.26476 0.243374 2.85233 0 3.46496 0H18.4798C19.0925 0 19.6802 0.243374 20.1134 0.676581C20.5466 1.10979 20.7898 1.69734 20.7898 2.30998V13.8599C20.7898 14.4726 20.5466 15.0601 20.1134 15.4934C19.6802 15.9266 19.0925 16.1699 18.4798 16.1699H8.08495Z"
                  className="fill-violet-300"
                />
                <path
                  d="M18 22.2856L22.9569 23.7018C23.4412 23.8403 23.9045 23.4267 23.8217 22.9299L23.1429 18.8571V11.9999C23.1429 11.5453 22.9622 11.1092 22.6408 10.7877C22.3193 10.4663 21.8832 10.2856 21.4286 10.2856H10.2857C9.83106 10.2856 9.39504 10.4663 9.07354 10.7877C8.75206 11.1092 8.57144 11.5453 8.57144 11.9999V20.5714C8.57144 21.026 8.75206 21.4621 9.07354 21.7835C9.39504 22.105 9.83106 22.2856 10.2857 22.2856H18Z"
                  className="fill-violet-100"
                />
              </svg>
            </div>
          </div>
 */

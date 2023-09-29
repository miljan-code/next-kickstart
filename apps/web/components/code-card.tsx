"use client";

import Typist from "react-typist";

export const CodeCard = () => {
  return (
    <div
      className="mx-auto w-full overflow-hidden rounded-lg sm:w-[600px]"
      aria-hidden="true"
    >
      <div
        className="h-[300px] overflow-hidden rounded-lg border border-border bg-foreground/5 px-3 pb-6 
         pt-4 font-mono text-[10px] leading-normal subpixel-antialiased shadow-lg transition-all sm:h-[400px] sm:px-2 sm:text-xs md:px-5"
      >
        <div className="top mb-6 flex">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="ml-2 h-3 w-3 rounded-full bg-orange-300"></div>
          <div className="ml-2 h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>
          npx next-kickstart
          <Typist.Delay ms={1250} />
        </Typist>
        <Typist
          className="leading-1 translate-y-[-0.2rem] bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text font-mono text-[7px] text-transparent sm:text-sm md:translate-y-[-0.4rem]"
          cursor={{ show: false }}
          avgTypingDelay={-500}
        >
          <Typist.Delay ms={2000} />
          &nbsp;_&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;
          <br />
          |&nbsp;|&nbsp;/&nbsp;(_)&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;
          <br />
          |&nbsp;|/&nbsp;/&nbsp;_&nbsp;&nbsp;___|&nbsp;|&nbsp;_____|&nbsp;|_&nbsp;__&nbsp;_&nbsp;_&nbsp;__|&nbsp;|_&nbsp;
          <br />
          |&nbsp;&nbsp;&nbsp;&nbsp;\|&nbsp;|/&nbsp;__|&nbsp;|/&nbsp;/&nbsp;__|&nbsp;__/&nbsp;_&nbsp;|&nbsp;__|&nbsp;|&nbsp;&nbsp;_|
          <br />
          |&nbsp;|\&nbsp;&nbsp;\&nbsp;|&nbsp;(__|&nbsp;&nbsp;&nbsp;\__&nbsp;\|&nbsp;|&nbsp;(_|&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;|_&nbsp;
          <br />
          \_|&nbsp;\_/_|\___|_|\_\___/\__\___|_|&nbsp;&nbsp;&nbsp;|___|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Typist>
        <Typist
          startDelay={2100}
          className=""
          cursor={{ show: false }}
          avgTypingDelay={-500}
        >
          <div>
            ? What will your project be called?
            <Typist.Delay ms={500} />
            <Typist
              cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
              avgTypingDelay={50}
              className="inline pl-1 text-tertiary"
            >
              &nbsp;next-kickstart
            </Typist>
          </div>
          <br />
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={4800}
          avgTypingDelay={-10000}
        >
          ? Would you like to use Drizzle ORM?
          <br />
          ◉ Yes
          <br />
          ◯ No
          <Typist.Backspace count={87} delay={1000} />
          <Typist
            cursor={{ show: false }}
            avgTypingDelay={-10000}
            className="translate-y-[-1.8rem] md:translate-y-[-2.0rem]"
          >
            <span>
              <span>? Would you like to use Drizzle ORM?</span>
              <span className="pl-2 text-tertiary">Yes</span>
            </span>
          </Typist>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={6300}
          avgTypingDelay={-10000}
          className="translate-y-[-1.8rem] md:translate-y-[-2.0rem]"
        >
          <Typist.Delay ms={1000} />
          ? Would you like to use NextAuth?
          <br />
          ◉ Yes
          <br />
          ◯ No
          <Typist.Backspace count={87} delay={1000} />
          <Typist
            cursor={{ show: false }}
            avgTypingDelay={-10000}
            className="translate-y-[-1.8rem] md:translate-y-[-2.0rem]"
          >
            <span>
              <span>? Would you like to use NextAuth?</span>
              <span className="pl-2 text-tertiary">Yes</span>
            </span>
          </Typist>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={8100}
          avgTypingDelay={-10000}
          className="translate-y-[-3.6rem] sm:translate-y-[-4rem]"
        >
          <Typist.Delay ms={1000} />
          ? Would you like to use tRPC?
          <br />
          ◉ Yes
          <br />
          ◯ No
          <Typist.Backspace count={87} delay={1000} />
          <Typist
            cursor={{ show: false }}
            avgTypingDelay={-10000}
            className="translate-y-[-1.8rem] sm:translate-y-[-2rem]"
          >
            <span>
              <span>? Would you like to use tRPC?</span>
              <span className="pl-2 text-tertiary">Yes</span>
            </span>
          </Typist>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={10000}
          avgTypingDelay={-10000}
          className="translate-y-[-5.4rem] sm:translate-y-[-6rem]"
        >
          <Typist.Delay ms={1000} />
          ? Would you like to use shadcn/ui?
          <br />
          ◉ Yes
          <br />
          ◯ No
          <Typist.Backspace count={87} delay={1000} />
          <Typist
            cursor={{ show: false }}
            avgTypingDelay={-10000}
            className="translate-y-[-1.8rem] sm:translate-y-[-2rem]"
          >
            <span>
              <span>? Would you like to use shadcn/ui?</span>
              <span className="pl-2 text-tertiary">Yes</span>
            </span>
          </Typist>
        </Typist>
        <Typist
          cursor={{ show: false }}
          startDelay={11700}
          avgTypingDelay={-10000}
          className="text-success translate-y-[-6.3rem] sm:translate-y-[-7rem]"
        >
          <Typist.Delay ms={1000} />
          The project has been initialized successfully.
          <br />
          <br />
          Happy hacking!
        </Typist>
      </div>
    </div>
  );
};

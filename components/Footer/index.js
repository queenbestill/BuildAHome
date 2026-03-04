import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = ({}) => {
  return (
    <>
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
        <div>
          <h2 className="text-2xl text-bold">Contact.</h2>
          <div className="mt-10">
            <h2 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
              LET&apos;S BUILD
            </h2>
            <h2 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
              A HOME
            </h2>
            <Button
              type="primary"
              onClick={() =>
                window.open(
                  "https://whydonate.com/fundraising/a-home-in-lisbon-my-dream-of-stability-and-roots",
                  "_blank"
                )
              }
            >
              Support the campaign
            </Button>
            <div className="mt-10">
              <Socials />
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-sm text-bold mt-2 laptop:mt-10 p-2 laptop:p-0">
        Made With ❤ by{" "}
        <Link href="https://build-a-home.vercel.app/#">
          <a className="underline underline-offset-1">Chetan Verma</a>
        </Link>
      </h2>
    </>
  );
};

export default Footer;

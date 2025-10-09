import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isUpdate }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { name, showUpdate, showImpact } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-medium p-2 laptop:p-0 link"
              >
                {name}.
              </h1>

              <div className="flex items-center">
                {data.darkMode && (
                  <Button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <img
                      className="h-6"
                      src={`/images/${
                        theme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                    ></img>
                  </Button>
                )}

                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                  ></img>
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                isScrolled 
                  ? "bg-gradient-to-b from-purple-200 to-white dark:from-purple-800 dark:to-gray-900 backdrop-blur-sm" 
                  : theme === "dark" 
                    ? "bg-slate-800" 
                    : "bg-white"
              } shadow-md rounded-md transition-all duration-300 ease-in-out`}
            >
              {!isUpdate ? (
                <div className="grid grid-cols-1">
                  <Button onClick={handleWorkScroll}>Pictures</Button>
                  <Button onClick={handleAboutScroll}>About</Button>
                  {showUpdate && (
                    <Button onClick={() => router.push("/update")}>Updates</Button>
                  )}
                  {showImpact && (
                    <Button
                      onClick={() =>
                        window.open("mailto:ownlearnenglish@gmail.com")
                      }
                    >
                      Impact
                    </Button>
                  )}

                  <Button
                    onClick={() => window.open("mailto:ownlearnenglish@gmail.com")}
                  >
                    Contact
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  <Button onClick={() => router.push("/")} classes="first:ml-1">
                    Home
                  </Button>
                  {showUpdate && (
                    <Button onClick={() => router.push("/update")}>Updates</Button>
                  )}
                  {showImpact && (
                    <Button
                      onClick={() => router.push("/impact")}
                      classes="first:ml-1"
                    >
                      Impact
                    </Button>
                  )}

                  <Button
                    onClick={() => window.open("mailto:ownlearnenglish@gmail.com")}
                  >
                    Donate
                  </Button>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className={`mt-10 hidden flex-row items-center justify-between sticky ${
          isScrolled 
            ? "bg-gradient-to-b from-purple-200 to-white dark:from-purple-800 dark:to-gray-900 backdrop-blur-sm" 
            : theme === "light" 
              ? "bg-white" 
              : "bg-transparent"
        } dark:text-white top-0 z-10 tablet:flex transition-all duration-300 ease-in-out`}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {name}.
        </h1>
        {!isUpdate ? (
          <div className="flex">
            <Button onClick={handleWorkScroll}>Pictures</Button>
            <Button onClick={handleAboutScroll}>About</Button>
            {showUpdate && (
              <Button onClick={() => router.push("/update")}>Updates</Button>
            )}
            {showImpact && (
              <Button
                onClick={() => router.push("/impact")}
                classes="first:ml-1"
              >
                Impact
              </Button>
            )}

            <Button onClick={() => window.open("mailto:ownlearnenglish@gmail.com")}>
            Donate
            </Button>
            {mounted && theme && data.darkMode && (
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                ></img>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex">
            <Button onClick={() => router.push("/")}>Home</Button>
            {showUpdate && (
              <Button onClick={() => router.push("/update")}>Updates</Button>
            )}
            {showImpact && (
              <Button
                onClick={() => router.push("/impact")}
                classes="first:ml-1"
              >
                Impact
              </Button>
            )}

            <Button onClick={() => window.open("mailto:ownlearnenglish@gmail.com")}>
              Contact
            </Button>

            {mounted && theme && data.darkMode && (
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                ></img>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

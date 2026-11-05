import { useRef } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Cursor from "../components/Cursor";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";

// Local Data
import data from "../data/portfolio.json";

export default function ThankYou() {
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();

  const t = data.thankYou;

  const open = (url) => () => window.open(url, "_blank");
  const writeToMe = () => {
    window.location.href = `mailto:${t.supportEmail}?subject=${encodeURIComponent(
      t.supportSubject
    )}`;
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current],
      { y: 30, x: -10 },
      { y: 0, x: 0 }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{t.siteTitle}</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content={data.siteDescription} />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10 px-4 tablet:px-8">
        <Header isBlog={true} />

        {/* Confirmation */}
        <div className="laptop:mt-16 mt-8 p-2 laptop:p-0">
          <p
            ref={textOne}
            className="text-xs tablet:text-sm tracking-[0.25em] opacity-60"
          >
            {t.eyebrow}
          </p>
          <h1
            ref={textTwo}
            className="mt-4 text-3xl tablet:text-6xl font-bold leading-[1.1] w-full laptop:w-4/5"
          >
            {t.title}
          </h1>
          <p
            ref={textThree}
            className="mt-4 text-lg tablet:text-xl laptop:text-2xl opacity-80 w-full laptop:w-3/5 leading-snug"
          >
            {t.intro}
          </p>
        </div>

        {/* Why and story */}
        <div className="mt-12 laptop:mt-24 p-2 laptop:p-0 grid grid-cols-1 laptop:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl text-bold">{t.whyTitle}</h2>
            <p className="mt-3 text-lg opacity-70 leading-relaxed">{t.why}</p>
          </div>
          <div>
            <h2 className="text-2xl text-bold">{t.storyTitle}</h2>
            <p className="mt-3 text-lg opacity-70 leading-relaxed">
              {t.story}
            </p>
          </div>
        </div>

        {/* Campaign links */}
        <div className="mt-10 laptop:mt-16 p-2 laptop:p-0">
          <h2 className="text-2xl text-bold">{t.followTitle}</h2>
          <div className="mt-4 flex flex-wrap">
            <Button type="primary" onClick={open(data.donateUrl)}>
              {t.donateLabel}
            </Button>
            <Button type="primary" onClick={open(t.websiteUrl)}>
              {t.websiteLabel}
            </Button>
            <Button type="primary" onClick={open(t.tiktokUrl)}>
              {t.tiktokLabel}
            </Button>
          </div>
        </div>

        {/* Support */}
        <div className="mt-10 laptop:mt-16 p-2 laptop:p-0 w-full laptop:w-3/5">
          <h2 className="text-2xl text-bold">{t.supportTitle}</h2>
          <p className="mt-3 text-lg opacity-70 leading-relaxed">{t.support}</p>
          <div className="mt-3 flex flex-wrap">
            <Button type="primary" onClick={writeToMe}>
              {t.supportButton}
            </Button>
          </div>
        </div>

        {/* Exclusive resource */}
        <div className="mt-10 laptop:mt-16 p-2 laptop:p-0">
          <div className="rounded-lg border border-gray-400/40 p-6 laptop:p-10">
            <p className="text-xs tablet:text-sm tracking-[0.25em] opacity-60">
              {t.bonusEyebrow}
            </p>
            <h2 className="mt-3 text-2xl tablet:text-4xl font-bold leading-tight">
              {t.bonusTitle}
            </h2>
            <p className="mt-3 text-lg opacity-70 leading-relaxed w-full laptop:w-3/5">
              {t.bonus}
            </p>
            <div className="mt-4 flex flex-wrap">
              <Button
                type="primary"
                onClick={() => (window.location.href = t.bonusUrl)}
              >
                {t.bonusButton}
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-8 tablet:mx-2 text-sm opacity-50 w-full laptop:w-4/5 leading-relaxed">
          {data.legalNotice}
        </p>

        <Footer />
      </div>
    </div>
  );
}

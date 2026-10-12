import { useRef } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import TierCard from "../components/TierCard";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Cursor from "../components/Cursor";
import Socials from "../components/Socials";

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const campaignRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const textFive = useRef();
  const titleRefs = [textOne, textTwo, textThree, textFour];

  const { hero, space, rewards } = data;

  // Handling Scroll
  const scrollTo = (ref) => () => {
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const openDonate = () => window.open(data.donateUrl, "_blank");

  useIsomorphicLayoutEffect(() => {
    stagger(
      [
        textOne.current,
        textTwo.current,
        textThree.current,
        textFour.current,
        textFive.current,
      ],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.siteTitle}</title>
        <meta name="description" content={data.siteDescription} />
        <meta property="og:title" content={data.siteTitle} />
        <meta property="og:description" content={data.siteDescription} />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10 px-4 tablet:px-8">
        <Header
          handleWorkScroll={scrollTo(workRef)}
          handleCampaignScroll={scrollTo(campaignRef)}
          handleAboutScroll={scrollTo(aboutRef)}
        />

        {/* Hero: the whole message is visible without scrolling */}
        <div className="laptop:mt-16 mt-8 p-2 laptop:p-0">
          <p className="text-xs tablet:text-sm tracking-[0.25em] opacity-60">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4">
            {hero.titleLines.map((line, index) => (
              <span
                key={line}
                ref={titleRefs[index]}
                className={`block text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-6xl font-bold leading-[1.1] w-full laptop:w-4/5 ${
                  index > 1 ? "text-neutral-500" : ""
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          <div ref={textFive}>
            <Socials className="mt-2 laptop:mt-4" />

            <p className="mt-4 text-lg tablet:text-xl laptop:text-2xl opacity-80 w-full laptop:w-3/5 leading-snug">
              {hero.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm tablet:text-base">
              {hero.steps.map((step, index) => {
                const last = index === hero.steps.length - 1;
                return (
                  <span key={step} className="flex items-center gap-2">
                    <span
                      className={
                        last
                          ? "inline-flex items-center gap-2 rounded-full px-4 py-2 text-base tablet:text-xl font-bold text-white bg-gradient-to-r from-fuchsia-400 to-indigo-400 shadow-lg"
                          : "inline-flex items-center gap-2 rounded-full border border-gray-400/60 px-3 py-1.5"
                      }
                    >
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          last ? "bg-white text-black" : "bg-gray-500/30"
                        }`}
                      >
                        {index + 1}
                      </span>
                      {step}
                    </span>
                    {!last && (
                      <span className="hidden tablet:inline opacity-40">→</span>
                    )}
                  </span>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap">
              <Button type="primary" onClick={openDonate}>
                {hero.primaryButton}
              </Button>
              <Button onClick={scrollTo(campaignRef)}>
                {hero.secondaryButton}
              </Button>
            </div>

            <p className="mt-3 text-sm opacity-60 w-full laptop:w-3/5 leading-snug">
              {hero.noteOne}
              <br />
              {hero.noteTwo}
            </p>
          </div>
        </div>

        {/* The space (illustrative images) */}
        <div className="mt-16 laptop:mt-32 p-2 laptop:p-0" ref={workRef}>
          <h2 className="text-2xl text-bold">{space.title}</h2>
          <p className="mt-1 text-lg opacity-50">{space.subtitle}</p>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 gap-4">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                useComparator={true}
                beforeSrc={project.beforeImageSrc}
                afterSrc={project.afterImageSrc}
              />
            ))}
          </div>
          <p className="mt-4 text-sm opacity-50">{space.note}</p>
        </div>

        {/* The campaign */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={campaignRef}>
          <h2 className="tablet:m-10 text-2xl text-bold">The campaign.</h2>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service) => (
              <ServiceCard
                key={service.id}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
          <p className="mt-6 tablet:mx-10 text-sm opacity-50 w-full laptop:w-4/5 leading-relaxed">
            {data.legalNotice}
          </p>
        </div>

        {/* What you get in return */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h2 className="tablet:m-10 text-2xl text-bold">{rewards.title}</h2>
          <p className="tablet:mx-10 mt-1 text-lg opacity-50">{rewards.lead}</p>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-3 gap-5">
            {rewards.tiers.map((tier) => (
              <TierCard
                key={tier.id}
                emoji={tier.emoji}
                name={tier.name}
                price={tier.price}
                perks={tier.perks}
                access={tier.access}
                badge={rewards.badge}
                href={data.donateUrl}
                cta={rewards.cta}
              />
            ))}
          </div>
          <div className="tablet:mx-10 mt-6 w-full laptop:w-4/5">
            <h3 className="text-xl">{rewards.bookingTitle}</h3>
            <p className="mt-2 text-sm opacity-60 leading-relaxed">
              {rewards.booking}
            </p>
          </div>
        </div>

        {/* About */}
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h2 className="tablet:m-10 text-2xl text-bold">About.</h2>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5 whitespace-pre-line">
            {data.aboutpara}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

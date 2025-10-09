import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectImpact from "../components/ProjectImpact";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
// Data
import { name, showImpact } from "../data/portfolio.json";
import { impact } from "../data/portfolio.json";
import data from "../data/portfolio.json";

const Impact = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showImpact) {
      router.push("/");
    }
  }, []);
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => router.push("/edit")} type={"primary"}>
            Edit Impact
          </Button>
        </div>
      )}
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header isUpdate />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${
                mount && theme.theme === "dark" ? "bg-slate-800" : "bg-gray-50"
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 className="text-3xl font-bold">{name}</h1>
              <h2 className="text-xl mt-5">{impact.tagline}</h2>
              <h2 className="w-4/5 text-xl mt-5 opacity-50">
                {impact.description}
              </h2>
              <div className="mt-2">
                <Socials />
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">🏠 1. Housing Crisis and Accessibility</h1>
                <p className="text-sm mt-2 opacity-50">Lisbon is facing one of the sharpest housing crises in Europe. Rents have increased over 65% in the last five years, while local salaries remain among the lowest in Western Europe. Many educators, artists, and independent professionals are being displaced from the city center — losing both stability and community.
                By supporting this campaign, you’re not only helping me secure a home, but also standing for fair access to housing and creative sustainability.</p>
                {/* {impact.experiences.map(
                  ({ id, dates, type, position, bullets }) => (
                    <ProjectImpact
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                    ></ProjectImpact>
                  )
                )} */}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">💡 2. Empowering Independent Work</h1>
                <p className="text-sm mt-2 opacity-50">Having a stable home means having a stable workspace. It allows me to keep teaching English to students around the world, expand Own English, and collaborate with local creative projects in Lisbon. Every contribution helps preserve independent work in a city where freelancers are being priced out of their own neighborhoods.</p>
                {/* <div className="mt-2">
                  <h2 className="text-lg">{impact.education.universityName}</h2>
                  <h3 className="text-sm opacity-75">
                    {impact.education.universityDate}
                  </h3>
                  <p className="text-sm mt-2 opacity-50">
                    {impact.education.universityPara}
                  </p>
                </div> */}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">🌍 3. Community and Cultural Impact</h1>
                <p className="text-sm mt-2 opacity-50">This isn’t just about one home — it’s about building continuity, belonging, and contribution. From this base, I’ll continue creating language-learning programs, community art projects, and digital storytelling about Lisbon’s evolving identity. Your support has a ripple effect: it helps one person stay, teach, create, and give back.</p>
                {/* <div className="flex mob:flex-col desktop:flex-row justify-between">
                  {impact.languages && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Languages</h2>
                      <ul className="list-disc">
                        {impact.languages.map((language, index) => (
                          <li key={index} className="ml-5 py-2">
                            {language}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {impact.frameworks && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Frameworks</h2>
                      <ul className="list-disc">
                        {impact.frameworks.map((framework, index) => (
                          <li key={index} className="ml-5 py-2">
                            {framework}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {impact.others && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Others</h2>
                      <ul className="list-disc">
                        {impact.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Impact;

import Head from "next/head";
import Link from "next/link";
import Wave from "./wave";
import React from "react";
import Navbar from "./navbar";
import Image from "next/image";

const name = "Xander Dyer";
export const siteTitle = "LeakyDev | Home";

type layoutProps = {
  children: React.ReactNode;
  pageName: string;
};

export default function Layout(Props: layoutProps) {
  var topLayer;

  const setBackground = () => {
    switch (Props.pageName) {
      case "home":
        topLayer = `bg-shallow`;
        return `bg-sand`;
      case "blog":
        topLayer = `bg-shallow`;
        return `bg-seafoam`;
      default:
        topLayer = `bg-shallow`;
        return `bg-sand`;
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Navbar pageName={Props.pageName} />
      {Props.pageName == "home" ? (
        <>
          <div
            className={` ${setBackground()} flex flex-col items-stretch md:items-center md:flex-row pl-4`}
          >
            <div className="flex flex-col items-center order-1 w-full p-0 md:p-8 md:order-2">
              <Image
                src="/images/OnTheBeach.svg"
                className="w-1/3 md:w-8/12"
                width={100}
                height={100}
                alt={name}
              />
            </div>
            <div className="flex flex-col items-center order-2 w-full gap-8 md:px-0 md:pl-12 md:order-1">
              <h1 className="text-4xl text-center">{name}</h1>
              <div className="flex flex-row gap-2 md:gap-5">
                <button
                  className="w-1/6 drop-shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://github.com/leakyfontana", "_blank");
                  }}
                >
                  <Image
                    src="https://img.icons8.com/3d-fluency/94/null/github.png"
                    alt="link to Xander's github"
                    width={94}
                    height={94}
                  />
                </button>
                <button
                  className="w-1/6 drop-shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://www.instagram.com/leakyfontana/",
                      "_blank"
                    );
                  }}
                >
                  <Image
                    src="https://img.icons8.com/3d-fluency/94/null/instagram-new.png"
                    alt="link to Xander's instagram"
                    width={94}
                    height={94}
                  />
                </button>
                <button
                  className="w-1/6 drop-shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://www.linkedin.com/in/xdyer/", "_blank");
                  }}
                >
                  <Image
                    src="https://img.icons8.com/3d-fluency/94/null/linkedin.png"
                    alt="link to Xander's linkedin"
                    width={94}
                    height={94}
                  />
                </button>
                <button
                  className="w-1/6 drop-shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("mailto:xdyer777@gmail.com", "_blank");
                  }}
                >
                  <Image
                    src="https://img.icons8.com/3d-fluency/94/null/mail.png"
                    alt="send Xander an email"
                    width={94}
                    height={94}
                  />
                </button>
                <button
                  className="w-1/6 drop-shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("/files/XanderJDyerResume2023.pdf", "_blank");
                  }}
                >
                  <Image
                    src="https://img.icons8.com/3d-fluency/94/null/document.png"
                    alt="Xander's resume"
                    width={94}
                    height={94}
                  />
                </button>
              </div>
              <p className="text-lg">
                Like the tide, I have risen in the realm of software
                development. My portfolio is a sea of skill and imagination. See
                it below, where the depths of the digital domain await on an
                eerie journey into the unknown.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={` ${setBackground()} flex flex-col items-stretch md:items-center md:flex-row pt-3 gap-2`}
          >
            <div className="flex flex-col items-center order-1 w-full p-0 md:p-8 md:order-2">
              <img src="/images/OnTheBeach.svg" className="w-2/12" alt={name} />
              <h2 className="text-3xl hover:underline">
                <Link className="text-deep-sea hover:text-white" href="/">
                  {name}
                </Link>
              </h2>
            </div>
          </div>
          <Wave isHome={false} layer={1} />
        </>
      )}
      <main className="w-screen">{Props.children}</main>
      {Props.pageName != "home" && (
        <div
          className={` ${topLayer} px-10 py-5 text-xl text-white hover:underline`}
        >
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </>
  );
}

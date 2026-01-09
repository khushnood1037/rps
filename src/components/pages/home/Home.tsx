// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lazy, Suspense } from "react";
import Banner from "./banner/Banner";
import Faq from "./faq/Faq.tsx";
import "./Home.scss";

const BecauseSec = lazy(() => import("./becauseSec/BecauseSec"));
const RoadmapToPeace = lazy(
  () => import("./roadmapToPeace/RoadmapToPeace.tsx")
);
const SecuritySec = lazy(() => import("./securitySec/SecuritySec"));
const TheRoot = lazy(() => import("./theRoot/TheRoot"));
const StandardOwnership = lazy(
  () => import("./standardOwnership/StandardOwnership")
);
const CryptoSecurity = lazy(() => import("./cryptoSecurity/CryptoSecurity"));
const Tokenomics = lazy(() => import("./tokenomics/Tokenomics"));
const DaoSec = lazy(() => import("./DaoSec/DaoSec.tsx"));
const FundRaising = lazy(() => import("./FundRaising/FundRaising.tsx"));
const SecurityReimagined = lazy(
  () => import("./SecurityReimagined/SecurityReimagined.tsx")
);

// gsap.registerPlugin(ScrollTrigger);
const Home = () => {

  return (
    <>
      <div className="landing_page">
        <Banner />
        <Suspense fallback={<div className="lazy-loader">Loading...</div>}>
          <SecurityReimagined />
          <TheRoot />
          <StandardOwnership />
          <CryptoSecurity />
          <BecauseSec />
          <RoadmapToPeace />
          <SecuritySec />
          <Tokenomics />
          <FundRaising />
          <DaoSec />
          <Faq />
        </Suspense>
      </div>
    </>
  );
};

export default Home;

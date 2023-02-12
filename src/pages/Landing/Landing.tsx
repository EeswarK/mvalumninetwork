import React from "react";
import Hero from "./Hero";
import PrimaryFeatures from "./PrimaryFeatures";
import SecondaryFeatures from "./SecondaryFeatures";

function Landing() {
  return (
    <div>
      <Hero />
      <PrimaryFeatures />
      {/* not in use */}
      <SecondaryFeatures />
    </div>
  );
}

export default Landing;

import React from "react";
import OurServiceHero from "../components/Sections/Ourservice/OurServiceHero";
import ServicesCards from "../components/Sections/Ourservice/ServicesCards";
import ServiceDetails from "../components/Sections/Ourservice/ServiceDetails";
import ServicesTable from "../components/Sections/Ourservice/ServicesTable.jsx";
import CTABanner from "../components/Sections/Homepage/CTABanner";
import MoreFAQ from "../components/Sections/Homepage/MoreFAQ";
import Footer from "../components/Footer";


const Ourservices = () => {
  return (
    <>
      <OurServiceHero/>
      <ServicesCards/>
      <ServiceDetails/>
      <ServicesTable/>
       <CTABanner />
        <MoreFAQ />
        <Footer/>
    </>
  );
};

export default Ourservices;

import React from "react";
import Brand from "./Brand";

const PopularBrands = () => {
  return (
    <>
      <div className="bg-gray-900 flex flex-col py-6">
        <p className="font-bold text-gray-200 text-lg text-center my-8 underline underline-offset-8">Popular Brands</p>
        <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Brand brand={"Apple"} slogan={"More the Price, better the Exclusiveness"} img={"https://cdn.cdnlogo.com/logos/a/51/apple-computer-rainbow.svg"}/>
          <Brand brand={"Asus"} slogan={"Services Matters the most, Not Marketing"} img={"https://cdn.cdnlogo.com/logos/a/85/asus.svg"}/>
          <Brand brand={"Infinix"} slogan={"Making Laptops Affordable for Everyone"} img={"https://www.kindpng.com/picc/m/589-5894144_infinix-infinix-mobile-logo-hd-png-download.png"}/>
          <Brand brand={"MSI"} slogan={"Performance is My Power, Looks like a Flower"} img={"https://cdn.cdnlogo.com/logos/m/21/msi.png"}/>
          <Brand brand={"HP"} slogan={"Old is Gold, Laptop means HP, nobody else"} img={"https://cdn.cdnlogo.com/logos/h/92/hp.svg"}/>
          <Brand brand={"Dell"} slogan={"Maybe I'm Underrated, but in reality I'm the King"} img={"https://cdn.cdnlogo.com/logos/d/28/dell.svg"}/>
        </div>
      </div>
    </>
  );
};

export default PopularBrands;

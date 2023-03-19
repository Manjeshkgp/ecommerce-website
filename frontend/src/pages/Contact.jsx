import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <>
      <motion.div initial={{width:0}} animate={{width:"100%"}} exit={{x:"100%",transition:{duration:0.1}}} className="flex flex-col lg:flex-row py-2 justify-evenly items-center bg-gray-900 min-h-[calc(100vh-16rem)]">
        <div className="relative w-5/6 lg:w-3/5 h-96"><iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21211.24820215282!2d1.4731720728374145!3d49.08268042104413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6cbdd7d3ddcb1%3A0xeb9fd94417956f9a!2sVernon%2C%20France!5e0!3m2!1sen!2sin!4v1675805761961!5m2!1sen!2sin"
          className="h-full w-full rounded-lg"
          loading="lazy"
          title="French Vernon Map"
        ></iframe>
        <div className="absolute w-full h-full cursor-pointer hover:bg-transparent rounded-lg bg-[rgba(45,43,92,0.4)] top-0"></div>
        </div>
        <div className="my-2 w-5/6 lg:w-2/6 h-96 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 rounded-lg flex flex-col">
          <p className="w-full text-center text-lg font-semibold underline">Address</p>
          <p className="mx-4">XYZ Tech Market</p>
          <p className="mx-4">Near Pharmacie Dorbon Fleur, Bd Georges Azemia</p>
          <p className="mx-4">Vernon, France</p>
          <p className="w-full text-center text-lg font-semibold underline">Contact Details</p>
          <p className="mx-4">example@email.com</p>
          <p className="mx-4">+33-1234567890</p>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;

import React from 'react';
import Navbar from '../components/navabr';
import Footer  from '../components/footer';
import Form from '../components/form';
import Button from '../components/button';
import Services from '../components/services';
import { useState } from 'react';
import  {firestore} from "../configuration/firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from '../configuration/firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import HeroSection from '../components/herosection';

function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <Services />
      <Form/>
      
      <Footer/>
    </div>
  );
}

export default Home;

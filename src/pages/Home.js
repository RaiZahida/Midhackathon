import React from 'react';
import Navbar from '../components/navabr';
import Footer  from '../components/footer';
import { useState } from 'react';
import  {firestore} from "../configuration/firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from '../configuration/firebase';
import { Navigate, useNavigate } from 'react-router-dom';

function Home() {
 
 
 

  return (
    <div>
      <Navbar />
      
      
      <Footer/>
    </div>
   
  );
}

export default Home;

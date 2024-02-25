"use client"

import { useState,useEffect } from 'react';
import axios from 'axios';
import Form from '@/components/Form';
import Tabledata from '@/components/Tabledata';
import { serverUrl } from "@/config";

const Home = () => {
  const [model, setmodel] = useState(false);
  const [fetchagain, setfetchagain] = useState(true);
  const [data, setdata] = useState([]);
  const [currentdata, setcurrentdata] = useState(null);

  const fetchdata = async () => {
    try{
    const {data} =await axios.get(serverUrl+'data');
    console.log(data);
    setdata(data);
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchdata();
  },[fetchagain]);

  return (
    <div className="flex relative padding mx-auto mx-w-7xl">
      <Tabledata setcurrentdata={setcurrentdata} fetchagain={fetchagain} setfetchagain={setfetchagain} data={data} model={model} setmodel={setmodel}/>
      <Form setcurrentdata={setcurrentdata} currentdata={currentdata} fetchagain={fetchagain} setfetchagain={setfetchagain} model={model} setmodel={setmodel}/>
    </div>
  );
};

export default Home;

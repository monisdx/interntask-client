"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Form from "@/components/Form";
import Tabledata from "@/components/Tabledata";
import { serverUrl } from "@/config";
import { RiH1 } from "react-icons/ri";

const Home = () => {
  const [model, setmodel] = useState(false);
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentdata, setcurrentdata] = useState(null);

  const flag = useRef(false);

  async function fetchdata() {
    try {
      setLoading(true);
      const { data } = await axios.get(serverUrl + "data");
      setdata(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!flag.current) {
      flag.current = true;
      fetchdata();
    }
  }, []);

  return (
    <div className="flex relative padding mx-auto mx-w-7xl">
      {!loading && (
        <Tabledata
          setcurrentdata={setcurrentdata}
          refetch={fetchdata}
          data={data}
          model={model}
          setmodel={setmodel}
        />
      )}

      {loading && (
        <div className="flex w-full h-screen items-center justify-center">
          <figure className="size-[20vw] border-[5px] border-red-500 border-dashed animate-spin rounded-full" />
        </div>
      )}

      <Form
        setcurrentdata={setcurrentdata}
        currentdata={currentdata}
        refetch={fetchdata}
        model={model}
        setmodel={setmodel}
      />
    </div>
  );
};

export default Home;

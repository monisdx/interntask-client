"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { serverUrl } from "@/config";

const Form = ({
  setcurrentdata,
  currentdata,
  fetchagain,
  setfetchagain,
  model,
  setmodel,
}) => {
  const [form, setform] = useState({
    name: "",
    email: "",
    phonenumber: "",
    hobbies: "",
  });

  console.log(currentdata);
  console.log(form);

  useEffect(() => {
    if (currentdata) setform(currentdata);
  }, [currentdata]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "hobbies") {
      setform({ ...form, hobbies: value.split(",") });
    } else {
      setform({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    if (currentdata === null) {
      createdata(form);
    } else {
      updatedata(currentdata?._id, form);
    }

    clear();
    handleback();
  };

  const clear = () => {
    setcurrentdata(null);
    setform({ name: "", email: "", phonenumber: "", hobbies: [] });
  };

  const handleback = () => {
    setcurrentdata(null);
    setmodel(!model);
  };

  const createdata = async (form) => {
    try {
      const { data } = await axios.post(serverUrl+"/data", form);
      console.log(data);
      setfetchagain(!fetchagain);
    } catch (error) {
      console.log(error);
    }
  };

  const updatedata = async (id, form) => {
    try {
      const { data } = await axios.put(
        serverUrl+`/data/${id}`,
        form
      );
      console.log(data);
      setfetchagain(!fetchagain);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex fixed top-0 left-0 w-full h-full  justify-center items-center ${
        model ? "opacity-100 z-20" : "opacity-0 z-[-1]"
      }  bg-black/50 backdrop-blur-sm duration-500`}
    >
      <div
        className={`bg-white relative flex flex-col justify-center items-center p-4 w-[500px] rounded-xl  duration-500 shadow-lg`}
      >
        <p className="text-black text-[25px] font-medium"> Fill Entry </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full mt-4 gap-1"
        >
          <span className="text-black text-[18px] font-medium">Name</span>
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              required     
              minLength={3}         
              defaultValue={form.name}
              onChange={handleChange}
              className="placeholder:text-grey p-3 w-full text-black bg-white-100 rounded-lg outline-none border border-black font-medium"
            />
          </div>
          <span className="text-black text-[18px] font-medium">Email</span>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder=" Enter email"
              required
              defaultValue={form.email}
              onChange={handleChange}
              className="placeholder:text-grey p-3 w-full text-black bg-white-100 rounded-lg outline-none border border-black font-medium"
            />
          </div>
          <span className="text-black text-[18px] font-medium">Phone No.</span>
          <div className="flex flex-col">
            <input
              type="text"
              name="phonenumber"
              placeholder=" Enter phone number"
              required
              defaultValue={form.phonenumber}
              onChange={handleChange}
              pattern="[0-9]{10}" 
              className="placeholder:text-grey p-3 w-full text-black bg-white-100 rounded-lg outline-none border border-black font-medium"
            />
          </div>
          <span className="text-black text-[18px] font-medium">Hobbies</span>
          <div className="flex flex-col">
            <input
              type="text"
              name="hobbies"
              placeholder=" Enter your hobbies"
              required
              defaultValue={form.hobbies}
              onChange={handleChange}
              className="placeholder:text-grey p-3 w-full text-black bg-white-100 rounded-lg outline-none border border-black font-medium"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center px-4 py-2 font-medium text-[18px] rounded-[10px] text-white bg-black outline-none border-none mt-4"
          >
            Save
          </button>
        </form>
        <span
          className="absolute right-0 top-0 px-4 py-4 text-[30px] cursor-pointer"
          onClick={handleback}
        >
          <MdCancel />
        </span>
      </div>
    </div>
  );
};

export default Form;

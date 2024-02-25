"use client";

import { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { serverUrl } from "@/config";

const Tabledata = ({
  setcurrentdata,
  fetchagain,
  setfetchagain,
  data,
  model,
  setmodel,
}) => {
  const [selecteddata, setselecteddata] = useState([]);
  // const [toggle, settoggle] = useState(false);

  console.log(selecteddata);

  const handleselection = (id) => {
    const bool = selecteddata.find((i) => i === id);

    if (bool) {
      setselecteddata(selecteddata.filter((i) => i !== id));
    } else {
      setselecteddata([...selecteddata, id]);
    }
    // settoggle(!toggle);
  };

  const handledit = (user) => {
    setcurrentdata(user);
    setmodel(!model);
  };

  async function sendmail() {
    const obj = { email: "moniskhandx@gmail.com", ids: selecteddata };

    // console.log(obj);
    setselecteddata([]);
    try {
      const { data } = await axios.post(
       serverUrl+"data/send-mail",
        obj
      );
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  const deletedata = async (id) => {
    try {
      const { data } = await axios.delete(serverUrl+`data/${id}`);
      console.log(data);
      setfetchagain(!fetchagain);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="padding w-full  flex flex-col justify-center">
      <h1 className="manrope text-black font-extrabold p-4 text-2xl">Table</h1>
      <button
        onClick={() => setmodel(!model)}
        className="w-[150px] flex justify-center px-4 py-2 font-medium text-[18px] rounded-[10px] text-white bg-black outline-none border-none mb-4"
      >
        {" "}
        Add Entry
      </button>
      {data?.length ? (
        <div className="bg-white-100 flex flex-col gap-4  rounded-lg  p-5 w-full shadow-lg">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className=" text-lg font-extrabold">Select</p>
                  </TableCell>
                  <TableCell>
                    <p className=" text-lg font-extrabold">ID</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-lg font-extrabold"> Name </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-lg font-extrabold"> Email </p>
                  </TableCell>
                  <TableCell>
                    <p className=" text-lg font-extrabold">Phone Number</p>
                  </TableCell>
                  <TableCell>
                    <p className=" text-lg font-extrabold">Hobbies</p>
                  </TableCell>
                  <TableCell>
                    <p className=" text-lg font-extrabold">Update/delete</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((user, i) => (
                  <TableRow key={user?._id}>
                    <TableCell>
                      <div
                        onClick={() => handleselection(user?._id)}
                        className="cursor-pointer"
                      >
                        {selecteddata.includes(user?._id) ? (
                          <ImCheckboxChecked size={"15px"} color="#1DB700" />
                        ) : (
                          <ImCheckboxUnchecked size={"15px"} color="#666768" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <h1 className="font-manrope text-grey">{i + 1}</h1>
                    </TableCell>
                    <TableCell>
                      <h1 className="font-medium text-grey">{user.name}</h1>
                    </TableCell>
                    <TableCell>
                      <h1 className="font-medium text-grey">{user.email}</h1>
                    </TableCell>
                    <TableCell>
                      <h1 className="font-medium text-grey">
                        {user.phonenumber}
                      </h1>
                    </TableCell>
                    <TableCell>
                      <div className=" flex flex-wrap gap-1">
                        {user.hobbies.map((hobby, i) => (
                          <p key={i} className="font-medium text-grey">
                            {hobby}
                          </p>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-[80px]">
                        <FaEdit
                          size={"20px"}
                          color="#2E8BC0"
                          className="cursor-pointer"
                          onClick={() => handledit(user)}
                        />
                        <RiDeleteBin6Line
                          size={"20px"}
                          color="#ff0000"
                          className="cursor-pointer"
                          onClick={() => deletedata(user._id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <h1 className="text=[20px] font-medium">no entry yet</h1>
      )}
      {data?.length ? (
        <button
          onClick={() => sendmail()}
          className="w-[150px] flex justify-center px-4 py-2 font-medium text-[18px] rounded-[10px] text-white bg-black outline-none border-none mt-4"
        >
          Send Mail
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Tabledata;

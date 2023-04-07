import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Logging from "../components/Logging";
import Card from "../components/card";

export default function Home() {
  const date = new Date();

  const [device, setDevice] = useState([]);
  const [form, setForm] = useState({
    from: moment(date).format("YYYY-MM-DD 00:00"),
    to: moment(date).format("YYYY-MM-DD 23:59"),
    deviceid: "",
  });

  const changeDate = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const download = async (e) => {
    e.preventDefault();

    const result = await axios.get(
      `${process.env.REACT_APP_HOST_DEV}/api/counting/download`,
      { params: form }
    );

    window.open(result.request.responseURL, "blank");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const results = await axios.get(
          `${process.env.REACT_APP_HOST_DEV}/api/device`
        );
        setDevice(results.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="mt-24 mb-10 px-10">
        <div className="grid gap-6 mb-6 md:grid-cols-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Waktu Mulai
            </label>
            <input
              name="from"
              type="datetime-local"
              value={form.from}
              onChange={changeDate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500  w-full p-2.5 "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Waktu akhir
            </label>
            <input
              name="to"
              value={form.to}
              onChange={changeDate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500  w-full p-2.5"
              type="datetime-local"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Device
            </label>
            <select
              name="deviceid"
              onChange={changeDate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5"
            >
              <option value="">All devices</option>
              {device.map((value, index) => {
                return (
                  <option key={index} value={value.device_id}>
                    {value.device_id}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <h2 className="font-semibold text-gray-900 text-lg mb-2">
          Jumlah Harian
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card form={form} className="bg-red-600 text-white" />
          {device.map((item, index) => {
            return <Card key={index} form={form} device={item.device_id} />;
          })}
        </div>
        <h2 className="font-semibold mt-6  text-gray-900 text-lg mb-2">
          Jumlah Keseluruhan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card form={{}} className="bg-red-600 text-white" />
          {device.map((item, index) => {
            return <Card key={index} form={{}} device={item.device_id} />;
          })}
        </div>
        <div className="flex mt-12 mb-2 justify-between max-w-md items-center">
          <h2 className="font-semibold text-gray-900 text-lg mb-5">Log</h2>
          <button
            onClick={(e) => download(e)}
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-5 h-5 mr-2 -ml-1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Download CSV
          </button>
        </div>
        <Logging form={form} />
      </div>
    </>
  );
}

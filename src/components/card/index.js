import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function Card({ form, className, device }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCount = async () => {
      setLoading(true);
      try {
        const results = await axios.get(
          `${process.env.REACT_APP_HOST_DEV}/api/counting/count`,
          {
            params: {
              ...form,
              deviceid: device,
            },
          }
        );
        setCount(results.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getCount();
  }, [form, device]);

  return (
    <>
      {!loading ? (
        <div
          className={`${className} w-full text-center md:text-left p-6 border border-gray-200 rounded-2xl shadow`}
        >
          <h5 className="mb-2 text-7xl font-bold tracking-tight ">{count}</h5>
          <p className="font-semibold">{device ? device : "Semua device "}</p>
          {form.from ? (
            <p className="text-xs font-light">
              {moment(form.from).format("DD MMM, HH:mm")} -{" "}
              {moment(form.to).format("DD MMM, HH:mm")}
            </p>
          ) : (
            <p className="text-xs font-light">Total Keseluruhan</p>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

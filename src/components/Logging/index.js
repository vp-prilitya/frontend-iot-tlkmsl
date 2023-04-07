import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Loading from "../loading";

export default function Logging({ form }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "Date",
      sortable: true,
      selector: (row) => row.createdAt,
    },
    {
      name: "Device",
      selector: (row) => row.device_id,
      width: "150px",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const results = await axios.get(
          `${process.env.REACT_APP_HOST_DEV}/api/counting`,
          { params: { ...form } }
        );

        const db = results.data.data.rows.map((value) => {
          return {
            ...value,
            createdAt: moment(value.createdAt).format("DD MMM YYYY, HH:ss"),
          };
        });
        setData(db);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getData();
  }, [form]);

  return (
    <>
      <div className="relative max-w-md overflow-x-auto shadow-md rounded-lg">
        {!loading ? (
          <DataTable
            pagination
            responsive
            subHeaderWrap
            columns={columns}
            data={data}
          />
        ) : (
          <Loading className="text-center p-8" />
        )}
      </div>
    </>
  );
}

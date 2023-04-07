import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reset() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState({
    token: "",
  });

  const navigate = useNavigate();

  const click = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_HOST_DEV}/api/counting/reset`,
        input
      );
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-36 mb-10 max-w-md  px-10 mx-auto">
      {error ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error!</span> {error}.
        </div>
      ) : (
        <></>
      )}
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Token
      </label>
      <input
        type="text"
        name="token"
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500  w-full p-2.5 "
      />
      <button
        type="button"
        onClick={(e) => click(e)}
        className="mt-5 focus:outline-none w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        {loading ? "Laoading..." : "Reset Data"}
      </button>
    </div>
  );
}

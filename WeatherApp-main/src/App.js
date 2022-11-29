import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";

function App() {
  //const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [number, setNumber] = useState({});
  const [no, setNo] = useState({});

  const getWetherDetails = (inputCity) => {
    if (!inputCity) return;
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: { q: inputCity, days: "3" },
      headers: {
        "X-RapidAPI-Key": "6a7d6da078msh82e7a527e1ce619p1eb49ejsnd5f124815b0c",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
      }
    };

    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setNo((res.data?.current?.temp_c).toFixed(0));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getNumberDetails = (no) => {
    if (!no) return;
    const tempurl = "https://numbersapi.p.rapidapi.com/" + no + "/math";

    const options = {
      method: "GET",
      url: tempurl,
      params: { fragment: "true", json: "true" },
      headers: {
        "X-RapidAPI-Key": "6a7d6da078msh82e7a527e1ce619p1eb49ejsnd5f124815b0c",
        "X-RapidAPI-Host": "numbersapi.p.rapidapi.com"
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setNumber(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //useEffect(() => {
  //getWetherDetails("delhi")
  //},[])

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
    getNumberDetails(no);
  };

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="container">
        {Object.keys(data).length > 0 && (
          <div className="container my-3 center">
            <div className="shadow rounded wetherResultBox">
              <h6 className="weathorCity">
                The temperature in {data?.location?.name} is
              </h6>
              <h8 className="weathorTemp">
                {(data?.current?.temp_c).toFixed(2)}°C
              </h8>
            </div>
          </div>
        )}
        {Object.keys(number).length > 0 && (
          <div className="container my-6" center>
            <div className="shadow rounded wetherResultBox">
              <h5> An intresting Fact about the number:</h5>
              <body className="container my-3">{number?.text}</body>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

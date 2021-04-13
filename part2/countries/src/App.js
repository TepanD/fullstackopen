import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ input, handler }) => {
  return (
    <div>
      find countries{" "}
      <input value={input} onChange={handler} placeholder="search country..." />
    </div>
  );
};

const Countries = ({ countries }) => {
  const countriesObjectLength = countries.length;
  //console.log(countriesObjectLength);
  if (countriesObjectLength === 0) {
    return " ";
  } else if (countriesObjectLength > 10) {
    return <div>Too many matches,specify another filter</div>;
  } else if (countriesObjectLength === 1) {
    return <Details country={countries[0]} />;
  } else {
    return (
      <>
        {countries.map((country, index) => (
          <div key={index}>
            {country.name}
            <Details2 country={country} />
          </div>
        ))}
      </>
    );
  }
};

const Details = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      {country.languages.map((languange, index) => (
        <ul key={index}>
          <li>{languange.name}</li>
        </ul>
      ))}
      <img
        alt={country.name + "flag"}
        src={country.flag}
        width="300"
        style={{ border: 1 + "px solid black" }}
      />
      <WeatherDetails capital={country.capital} />
    </div>
  );
};

const WeatherDetails = ({ capital }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState({ location: {}, current: {} });

  const hook = () => {
    console.log("effect");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`
      )
      .then((response) => {
        console.log("promise fullfilled");
        setWeather(response.data);
      });
  };
  useEffect(hook, []);
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <div>temperature: {weather.current.temperature}</div>
      <img alt="" src={weather.current.weather_icons} />
      <div>
        wind: {weather.current.wind_speed} mph direction{" "}
        {weather.current.wind_dir}
      </div>
    </div>
  );
};

const Details2 = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (showDetails === false) {
    return <button onClick={() => setShowDetails(true)}>show</button>;
  } else if (showDetails === true) {
    return (
      <div>
        <button onClick={() => setShowDetails(false)}>close</button>
        <h2>{country.name}</h2>

        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        {country.languages.map((languange, index) => (
          <ul key={index}>
            <li>{languange.name}</li>
          </ul>
        ))}
        <img
          alt={country.name + "flag"}
          src={country.flag}
          width="300"
          style={{ border: 1 + "px solid black" }}
        />
        <WeatherDetails capital={country.capital} />
        <br />
      </div>
    );
  }
};

const App = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const hook = () => {
    //console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      //console.log("promise fullfilled");
      setCountries(response.data);
    });
  };
  useEffect(hook, []);

  const countriesToShow =
    searchCountry === ""
      ? []
      : countries.filter((country) =>
          country.name.toLowerCase().includes(searchCountry.toLowerCase())
        );

  const searchCountriesHandler = (event) => {
    console.log(event.target.value);
    setSearchCountry(event.target.value);
  };

  return (
    <div>
      <Filter input={searchCountry} handler={searchCountriesHandler} />
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;

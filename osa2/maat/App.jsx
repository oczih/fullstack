import { useState, useEffect } from "react";

export default function CountrySearch() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (query === "") {
      setFilteredCountries([]);
      setSelectedCountry(null);
      return;
    }

    const matches = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCountries(matches);
    if (matches.length === 1) {
      setSelectedCountry(matches[0]);
    } else {
      setSelectedCountry(null);
    }
  }, [query, countries]);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital?.[0]}&appid=${api_key}&units=metric`)
        .then((response) => response.json())
        .then((data) => setWeather(data));
    }
  }, [selectedCountry, api_key]);

  return (
    <div>
      <input
        type="text"
        placeholder="Etsi maata..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredCountries.length > 10 ? (
        <p>Anna tarkempi haku.</p>
      ) : selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Pääkaupunki: {selectedCountry.capital?.[0] || "N/A"}</p>
          <p>Väestö: {selectedCountry.population.toLocaleString()}</p>
          <h3>Kielet:</h3>
          <ul>
            {Object.values(selectedCountry.languages || {}).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={selectedCountry.flags.svg}
            alt={`Maan ${selectedCountry.name.common} lippu`}
            width="100"
          />
          {weather && (
            <div>
              <h3>Sää paikassa {selectedCountry.capital?.[0]}</h3>
              <p>Lämpotila: {weather.main.temp}°C</p>
              <p>Tuuli: {weather.wind.speed} m/s</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
          <button onClick={() => setSelectedCountry(null)}>Back</button>
        </div>
      ) : (
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            <span>{country.name.common} </span>
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </div>
        ))
      )}
    </div>
  );
}

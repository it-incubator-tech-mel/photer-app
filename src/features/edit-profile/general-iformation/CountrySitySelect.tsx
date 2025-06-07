import React, { useEffect, useState } from 'react';
import Select from 'react-select';
const CountryCitySelect = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const countryOptions = data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
        }));
        setCountries(countryOptions);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);
  const handleCountryChange = async (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null); // Сбросить выбранный город
    if (selectedOption) {
      try {
        const response = await fetch(
          `https://world-cities-api.herokuapp.com/cities?country=${selectedOption.label}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const cityOptions = data.map((city) => ({
          value: city.name,
          label: city.name,
        }));
        setCities(cityOptions);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setCities([]);
    }
  };
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <Select
        options={countries}
        onChange={handleCountryChange}
        placeholder="Выберите страну..."
        isClearable
      />
      {selectedCountry && (
        <Select
          options={cities}
          onChange={handleCityChange}
          placeholder="Выберите город..."
          isClearable
        />
      )}
      {selectedCity && <div>Выбранный город: {selectedCity.label}</div>}
    </div>
  );
};
export default CountryCitySelect;

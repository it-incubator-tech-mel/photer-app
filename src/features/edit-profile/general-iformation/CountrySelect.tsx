import React, { useEffect, useState } from 'react';
import Select from 'react-select';
const CountrySelect = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // const response = await fetch('https://restcountries.com/v3.1/all');
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name'
        );
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
  const handleChange = (selectedOption) => {
    console.log('Selected country:', selectedOption);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Select
      options={countries}
      onChange={handleChange}
      placeholder="Выберите страну..."
      isClearable
    />
  );
};
export default CountrySelect;

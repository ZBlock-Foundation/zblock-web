import csc from "country-state-city";

const getAllCountries = () => {
  return csc.getAllCountries();
};

const getCitiesOfCountry = (countryCode) => {
  return csc.getCitiesOfCountry(countryCode);
};

const getStatesOfCountry = (countryCode) => {
  return csc.getStatesOfCountry(countryCode);
};

export { getAllCountries, getCitiesOfCountry, getStatesOfCountry };

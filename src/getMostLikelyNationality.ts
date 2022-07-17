import axios from 'axios';

type ResponseCountry = {
  country_id: string;
  probability: number;
};

type CountryGuess = {
  countryCode: string | null;
  probability: number;
};

type Country = {
  countryCode: string | null;
  probability: number;
};

const getMostRelevant = (countryList: ResponseCountry[]): CountryGuess => {
  if (!countryList || !countryList.length)
    return {
      countryCode: null,
      probability: 0,
    };

  const sortedCountries: ResponseCountry[] = countryList.sort(
    (a, b) => b.probability - a.probability
  );

  return {
    countryCode: sortedCountries[0].country_id,
    probability: sortedCountries[0].probability,
  };
};

const getMostLikelyNationality = async (name: string): Promise<Country> => {
  if (!name) throw 'Missing name parameter';

  const nationalityResult = await axios({
    method: 'GET',
    url: 'https://api.nationalize.io/',
    params: {
      name: name,
    },
  });

  const mostLikelyNationality = getMostRelevant(nationalityResult.data.country);

  return mostLikelyNationality;
};

export default getMostLikelyNationality;

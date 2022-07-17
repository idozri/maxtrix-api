import axios from 'axios';

type Gender = {
  gender: string | null;
  probability: number;
};

const getMostLikelyGender = async (name: string): Promise<Gender> => {
  if (!name) throw 'Missing name parameter';

  const genderResult = await axios({
    method: 'GET',
    url: 'https://api.genderize.io/',
    params: {
      name: name,
    },
  });

  const mostLikelyGender = {
    gender: genderResult.data.gender,
    probability: genderResult.data.probability,
  };

  return mostLikelyGender;
};

export default getMostLikelyGender;

export const getPlacesData = async (type) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
    },
  };
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=39&tr_latitude=43&bl_longitude=26&tr_longitude=30`;

  try {
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPlacesData = async (type, bl, tr) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
    },
  };
  const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${bl.lat}&tr_latitude=${tr.lat}&bl_longitude=${bl.lng}&tr_longitude=${tr.lng}`;

  try {
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

import axios from 'axios';

export const getPlaceDetails=async(place)=>{
    console.log(place)

    const options = {
      method: 'GET',
      url: 'https://maps-data.p.rapidapi.com/searchmaps.php',
      params: {
        query: place
      },
      headers: {
        'x-rapidapi-key': '6908f5a6bbmsh92b9542fc2b8d45p1118d1jsnd52c9a7602ea',
        'x-rapidapi-host': 'maps-data.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log( "res is" + response.data.data[0].business_id);
      return response.data.data[0].business_id

    } catch (error) {
      console.log(error);
    }
}
export async function fetchImage(id) {
  console.log(id)
  const options = {
    method: 'GET',
    url: 'https://maps-data.p.rapidapi.com/photos.php',
    params: {
      business_id: id
    },
    headers: {
      'x-rapidapi-key': '8afeef943bmsh8d2efc418983b6ap1ea20fjsn3ff6394863f0',
      'x-rapidapi-host': 'maps-data.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data.data.photos[0]);
    return response.data.data.photos[0]
  } catch (error) {
    console.error(error);
  }
}




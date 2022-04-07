import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url: string) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
            'X-RapidAPI-Key': `${process.env.REACT_APP_API}`
        }
    });

    return data?.hits.map((element: any) => {
        const { coverPhoto, externalID, price, rentFrequency, rooms, title, baths, area, agency, isVerified, type, purpose, furnishingStatus, amenities, photoIDs } = element;
        return {
            coverPhoto,
            price,
            rentFrequency,
            rooms,
            title,
            baths,
            area,
            agency,
            isVerified,
            externalID,
            type,
            purpose,
            furnishingStatus,
            amenities,
            photoIDs
        }
    })
}

export async function fetchData() {
    const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
    const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

    return { rents: propertyForRent, sales: propertyForSale }
}

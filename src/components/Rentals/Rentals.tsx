import { useState } from "react"
import { fetchData } from "../../api"
import Property from "../Property/Property"

export const data = [
    {
        coverPhoto: { id: '1', url: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4', },
        price: '50000',
        rentFrequency: '90',
        rooms: 4,
        title: 'Vipingo Ridge, the ultimate modern homes',
        baths: '2',
        area: 123.5678,
        agency: 'uagency',
        isVerified: true,
        externalID: 123456,
    },

    {
        coverPhoto: { id: '2', url: 'https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4' },
        price: '735353',
        rentFrequency: '56',
        rooms: 8,
        title: 'Kilifi Ridge, the ultimate modern homes',
        baths: '5',
        area: 56.5678,
        agency: 'agency',
        isVerified: true,
        externalID: 654321,
    }
]

const Rentals = () => {
    //const [rentals, setRentals] = useState([])
    //fetchData().then((results) => setRentals(results.rents))
    return (
        <div className="flex justify-between gap-6 flex-wrap">
            {data.map((item, id) => (
                <Property key={id} {...item} />
            ))}  </div>
    )
}

export default Rentals
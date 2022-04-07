export interface BannerProp {
    imgurl: string;
    text1: string;
    text2: string;
    text3: string;
    btnText: string;
}

export interface PropertyProp {
    coverPhoto: { id: string; url: string; };
    price: string;
    rentFrequency: string;
    rooms: number;
    title: string;
    baths: string;
    area: number;
    agency: string;
    isVerified: boolean;
    externalID: number;
}

export interface CarouselProp {
    carouselData: Array<string>
}

export interface PropertyPropDetails {
    externalID: string | number;
    price: string;
    rentFrequency: string;
    rooms: number;
    title: string;
    baths: string;
    area: number;
    agency: string;
    isVerified: boolean;
    description: string;
    type: string;
    purpose: string;
    furnishingStatus: boolean;
    amenities: string;
    photos: Array<string>;
    contact: string;
}
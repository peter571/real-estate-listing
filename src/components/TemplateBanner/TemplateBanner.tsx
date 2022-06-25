import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BannerProp } from "../../types"

const TemplateBanner = (prop: BannerProp) => {

    const { container, textWrapper, btnLink } = bannerStyles;

    return (
        <div className={container}>
            <div className={textWrapper}>
                <h1 className="text-sm text-[#ceda81]">{prop.text1}</h1>
                <p className="text-[#ceda81] font-bold">{prop.text2}</p>
                <p className="text-[#ceda81] text-5xl font-semibold">{prop.text3}</p>
                <p className="text-lg text-[#ceda81] font-semibold">{prop.text4}</p>
                <Link className={btnLink} to="/properties">
                    Explore Properties
                    <FiExternalLink />
                </Link>
            </div>
        </div>
    )
}

const bannerStyles = {
    container: 'flex items-center object-cover bg-hero-pattern h-screen',
    textWrapper: 'backdrop-blur-sm bg-black/30 flex flex-col gap-4 p-5 w-[100%] sm:w-[80%] md:w-[70%]',
    btnLink: 'flex items-center gap-2 flex-nowrap transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 rounded-sm bg-white self-start text-sm text-black px-2 py-1'
}

export default TemplateBanner

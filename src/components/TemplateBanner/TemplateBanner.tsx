import { BannerProp } from "../../types"

const TemplateBanner = (prop: BannerProp) => {
    return (
        <div className={`flex ${prop.reverse ? 'flex-row-reverse' : ''} justify-center items-center h-96`}>
            <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200 h-auto w-96">
                <img src={prop.imgurl} alt="banner" />
            </div>
            <div className="flex flex-col gap-2 pl-3">
                <h1 className="text-sm text-gray-700">{prop.text1}</h1>
                <p className="text-black text-2xl font-bold w-[50%]">{prop.text2}</p>
                <p className="text-lg text-gray-900 font-semibold  w-[80%]">{prop.text3}</p>
            </div>
        </div>
    )
}

export default TemplateBanner
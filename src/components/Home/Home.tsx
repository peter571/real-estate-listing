import React from 'react';
import Footer from '../Footer/Footer'
import Properties from '../Properties/Properties'
import TemplateBanner from '../TemplateBanner/TemplateBanner'

const Home = () => {

    return (
        <div>
            <TemplateBanner
                imgurl={'https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'}
                text1={'RENT A HOME'}
                text2={'Rental Homes for Everyone'}
                text3={'EXplore form Apartments, builder floors, villas and more'}
                btnText={'Explore Renting'}
                reverse={true} />

            <TemplateBanner
                imgurl={'https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'}
                text1={'BUY A HOME'}
                text2={'Find, Buy & Own Your Dream Home'}
                text3={'EXplore form Apartments, builder floors, villas and more'}
                btnText={'Explore Buying'}
                reverse={false} />

            <Properties />

            <Footer />
        </div>
    )
}

export default Home
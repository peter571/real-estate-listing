import React from 'react';
import Footer from '../Footer/Footer'
import Properties from '../Properties/Properties'
import TemplateBanner from '../TemplateBanner/TemplateBanner'
import banner from '../../images/homes2.jpg';

const Home = () => {

    return (
        <div>
            <TemplateBanner
                imgurl={banner}
                text1={'BUY, RENT A HOME'}
                text2={'Are you a Realtor? Register your account, upload your properties and meet your customers.'}
                text3={'Explore from Apartments, builder floors, villas and more'}
                text4={'We connect home hunters to the best Realtors in town.'}
                reverse={true} />

        </div>
    )
}

export default Home
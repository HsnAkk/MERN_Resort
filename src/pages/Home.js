import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';



const Home = () => {
    return (
        // Hero icinde default olarak hero:'defaultHero' tanimladigimiz icin burada tekrar yazmamiza gerek yoktur.
        // aksi halde <Hero hero="defaultHero" /> seklinde yazmamiz gerekecekti.
        
        <>
            <Hero >         
                <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
                    <Link to='/rooms' className="btn-primary">Our rooms</Link>
                </Banner>
            </Hero>
            <Services />
            <FeaturedRooms />
           
        </>
    )               
}

export default Home;
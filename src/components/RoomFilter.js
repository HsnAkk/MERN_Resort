import React from 'react';
import Title from './Title';
import { useContext } from 'react';
import { RoomContext } from '../context';


// get all unique rooms type value
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]   // O N E M L I *******************
}

const RoomFilter = ({rooms}) => {
    const context = useContext(RoomContext);
    //console.log(context);
    const { handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets } = context;

    let types = getUnique(rooms, 'type');   // it gets rooms' unique types
    types = ['all', ...types];              // adds 'all' as a sort of type to unique types

    types = types.map((item, index) => {
        return <option key={index} value={item} >{item}</option> 
    });

    let people = getUnique(rooms, 'capacity');   // it gets rooms' unique capacities
    people = people.map((item, index) => {
        return <option key={index} value={item} >{item}</option> 
    });



    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type*/}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" 
                            id="type" 
                            value={type} 
                            className="form-control"
                            onChange={handleChange}        
                    >
                    {types}
                    </select>
                </div>
                {/* end select type*/}
                {/* guests */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select name="capacity" 
                            id="capacity" 
                            value={capacity} 
                            className="form-control"
                            onChange={handleChange}        
                    >
                    {people}
                    </select>
                </div>
                {/* end guests*/}

                {/* room price*/}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input  type="range" 
                            name="price" 
                            min={minPrice} 
                            max={maxPrice} 
                            id='price' 
                            value={price}
                            className="form-control"
                            onChange={handleChange}        
                    />                   
                </div>
                {/* end room price*/}

                {/* room size*/}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input  type="number" 
                                name="minSize" 
                                id='size' 
                                value={minSize}
                                className="size-input"
                                onChange={handleChange}        
                        />     
                        <input  type="number" 
                                name="maxSize" 
                                id='size' 
                                value={maxSize}
                                className="size-input"
                                onChange={handleChange}        
                        />     
                    </div>
                </div>
                {/* end room size*/}

                {/* extras*/}
                <div className="form-group">
                    <div className="single-extra">
                        <input  type="checkbox" 
                                name="breakfast"
                                id="breakfast"
                                checked={breakfast}
                                onChange={handleChange} 
                        />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input  type="checkbox" 
                                name="pets"
                                id="pets"
                                checked={pets}
                                onChange={handleChange} 
                        />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* end extras*/}


            </form>
        </section>
    )
}

export default RoomFilter

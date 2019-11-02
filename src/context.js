import React, { Component } from 'react';
// import items from './data';            // useful in case data comes from local computer
import Client from './Contentful';


const RoomContext = React.createContext();


class RoomProvider extends Component {
    state = {
        rooms : [],
        sortedRooms : [],
        featuredRooms : [],
        loading : true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize:0,
        maxSize:0,
        breakfast: false,
        pets: false
    }

    // get data from Contentful
    getData = async () => {
        try {
            let response = await Client.getEntries({
                                                    content_type : "beachResortRoomExample",
                                                    //order: "sys.createdAt"  // brings the rooms in order
                                                    //order: "fields.price"   // brings the rooms in ascending price
                                                    order: "-fields.price"   // brings the rooms in descending price
                                                    // you can set up however you want exp. size,  
                                                   });
            let rooms = this.formatData(response.items);    // response.items comes from structur of contenful
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));

            this.setState({
                rooms, 
                featuredRooms, 
                sortedRooms: rooms,
                loading : false,
                price: maxPrice,
                maxPrice,
                maxSize
            });                                    
           
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount () {
        this.getData();
    }


    // get data  ________________>>>>> data from our local computer
    // componentDidMount () {
    //    let rooms = this.formatData(items);
    //    let featuredRooms = rooms.filter(room => room.featured === true);
    //    let maxPrice = Math.max(...rooms.map(item => item.price));
    //    let maxSize = Math.max(...rooms.map(item => item.size));

    //    this.setState({
    //        rooms, 
    //        featuredRooms, 
    //        sortedRooms: rooms,
    //        loading : false,
    //        price: maxPrice,
    //        maxPrice,
    //        maxSize
    //    });
    // }

    formatData = (items) => {
        let tempItems = items.map( item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields, images, id};
            return room;
        });
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug); // find() buldugu ilk elemani OBJECT olarak aliyor, filter() ise ARRAY olarak döndürüyor.
        return room;
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
       
        this.setState({
                        [name] : value
                      }, this.filterRooms);       // calls filterRooms function as callback
    }

    filterRooms = () => {
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state;
        // all value
        let tempRooms = [...rooms];
        
        // transform capacity value from string to number
        capacity = parseInt(capacity);

        // transform price value from string to number
        price = parseInt(price);

        //filter by type
        if ( type !== 'all' ) {
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        // filter by capacity
        if ( capacity !== 1 ) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);
        
        // filter by room size
        tempRooms = tempRooms.filter(room => (room.size <= maxSize) && (room.size >= minSize));

        // filter by extras
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }
        
        this.setState({
            sortedRooms: tempRooms
        })
    }


    render() {
        return (
            <RoomContext.Provider value={{
                                            ...this.state, 
                                            getRoom: this.getRoom, 
                                            handleChange: this.handleChange
                                        }}>
                { this.props.children }
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;


export function withRoomConsumer (Component) {                 // 1. alternatif to RoomContainer
    return function ConsumerWrapper (props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export { RoomProvider, RoomConsumer, RoomContext };
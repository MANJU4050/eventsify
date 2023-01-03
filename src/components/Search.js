import React from 'react'
import './Home1.css'
import { allFilters } from '../features/navbar/filterSlice'
import { allEvents } from '../features/events/eventsSlice'
import { useSelector } from 'react-redux'
import EventCard from './EventCard'

const Search = () => {
    const filters = useSelector(allFilters)
    const events = useSelector(allEvents)
    let searchEvents;

    if(!filters.place && !filters.category){
       const filteredEvents = events.filter((event)=>{
            return event.title===filters.search;
        })
        searchEvents = filteredEvents.map((event)=>{
            return <EventCard
            key={event.eventid}
            title={event.title}
            place={event.place}
            category={event.category}
            startdate={event.startDate}
            enddate={event.endDate}
            price={event.price}
            favourite={event.favourite}
          />
        })
    }else if(!filters.place){
        const filteredEvents = events.filter((event)=>{
            return event.title===filters.search && event.category===filters.category
        })
        searchEvents = filteredEvents.map((event)=>{
            return <EventCard
            key={event.eventid}
            title={event.title}
            place={event.place}
            category={event.category}
            startdate={event.startDate}
            enddate={event.endDate}
            price={event.price}
            favourite={event.favourite}
          />
        })
    }else if(!filters.category){
        const filteredEvents = events.filter((event)=>{
            return event.title===filters.search && event.place===filters.place;
        })
        searchEvents = filteredEvents.map((event)=>{
            return <EventCard
            key={event.eventid}
            title={event.title}
            place={event.place}
            category={event.category}
            startdate={event.startDate}
            enddate={event.endDate}
            price={event.price}
            favourite={event.favourite}
          />
        })
    }else if(filters.category && filters.place){
        const filteredEvents = events.filter((event)=>{
            return event.title===filters.search && event.place===filters.place && event.category===filters.category;
        })
        searchEvents = filteredEvents.map((event)=>{
            return <EventCard
            key={event.eventid}
            title={event.title}
            place={event.place}
            category={event.category}
            startdate={event.startDate}
            enddate={event.endDate}
            price={event.price}
            favourite={event.favourite}
          />
        })
    }
  return (
    <>
      <div className="events">{searchEvents}</div>
    </>)
}

export default Search
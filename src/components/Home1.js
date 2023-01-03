import React,{useState} from "react";
import EventCard from "./EventCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { allEvents, viewEvents } from "../features/events/eventsSlice";
import { allFilters } from "../features/navbar/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";


const Home1 = () => {
  const dispatch = useDispatch();
  const filters = useSelector(allFilters);
  const [paginatedEvents,setPaginatedEvents] = useState([]);

  const [pageNumber,setPageNumber] = useState(0)
  const eventsPerPage = 12;
  const pagesVisited = pageNumber * eventsPerPage;

  
  

  const {
    data: allevents,
    isLoading,
    isError,
    isSuccess,
    error,
    
  } = useQuery(["events"], async () => {
    return await axios.get("http://localhost:4000/api/viewallevents").then((res) => {
        console.log(res.data)
        setPaginatedEvents(()=>{
          return res.data
        })
        dispatch(viewEvents(res.data));
        return res.data;
      });
  });


  let events;
  let pageCount;

  //////////////////////////////////////

  if(isSuccess){
    console.log(pageCount)
    if(!filters.place && !filters.category){
        events = paginatedEvents.slice(pagesVisited,pagesVisited + eventsPerPage).map((event)=>{
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

  pageCount = Math.ceil(paginatedEvents.length/eventsPerPage);
  


    }else if(!filters.place){
        const category = allevents.filter((event)=>{
            return filters.category===event.category;
        })

        events = category.slice(pagesVisited,pagesVisited + eventsPerPage).map((event)=>{
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
        pageCount = Math.ceil(category.length/eventsPerPage);
    }else if(!filters.category){
        const places = allevents.filter((event)=>{
            return filters.place===event.place.toLowerCase();
        })

        events = places.slice(pagesVisited,pagesVisited + eventsPerPage).map((event)=>{
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
        pageCount = Math.ceil(places.length/eventsPerPage);
    }else if(filters.category && filters.place){
        const desiredEvents = allevents.filter((event)=>{
            return filters.place===event.place.toLowerCase() && filters.category===event.category;
        })

        events = desiredEvents.slice(pagesVisited,pagesVisited + eventsPerPage).map((event)=>{
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
        pageCount = Math.ceil(desiredEvents.length/eventsPerPage);
    }
   
  }else if(isLoading){
    events = <p>Loading...</p>
  }else if(isError){
    events = <p>{error.message}</p>
  }

  const changePage= ({selected})=>{
    setPageNumber(selected)
  }

  return (
    <>
      <div className="events">
        {events}

        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousbtn"}
        nextLinkClassName={"nextbtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
         />
        </div>
    </>
  );
};

export default Home1;

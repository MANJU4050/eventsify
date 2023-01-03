import React from 'react'
import './AddEvents.css'
import { useFormik } from "formik";
import { addValidation } from "../schema/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";

const initialValues = {
    title: "",
    place: "",
    category: "",
    startDate: "",
    endDate: "",
    price: "",
    favourite: false,
  };

const AddEvents = () => {

    const categories = [
        "Business Events",
        "Parties",
        "Performances",
        "Sports Events",
        "Festivals",
        "Workshops",
        "Music Events",
        "Exhibitions",
        "Food & Drink Events",
        "Health and wellness events",
        "Dance Events",
        "Fashion Events",
        "Arts Events",
        "Fine Arts Events",
        "Theatre Events",
        "Literary Arts Events",
        "Craft Events",
        "Photography Events",
        "Cooking Events",
        "Comedy Events",
        "Hackathons",
        "Webinars",
      ];
    
      const options = categories.map((item,index) => {
        return <option key={index} value={item}>{item}</option>;
      });
      const navigate = useNavigate();
    
      const token = localStorage.getItem("token");
    
      const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
          initialValues,
          validationSchema: addValidation,
          onSubmit: async (values, action) => {
            try {
              const {
                title,
                place,
                category,
                startDate,
                endDate,
                price,
                favourite,
              } = values;
    
              const eventid = nanoid();
    
              const response = await axios.post(
                "http://localhost:4000/api/addevent",
                { eventid, title, place, category, startDate, endDate, price,favourite },
                { headers: { authtoken: token } }
              );
    
              action.resetForm();
              navigate("/");
            } catch (error) {
              console.log(error);
            }
          },
        });
  return (
    <div className='addeventsnew'>
<form onSubmit={handleSubmit}>
    <div className='addeventsinnernew'>
    <h1>Add Event</h1>

            <div>
              <input
                type="text"
                autoComplete="off"
                name="title"
                id="title"
                placeholder="Enter event title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && touched.title ? (
                <p className="error">{errors.title}</p>
              ) : null}
            </div>

            <div>
              <input
                type="text"
                autoComplete="off"
                name="place"
                id="place"
                placeholder="Enter the event place"
                value={values.place}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.place && touched.place ? (
                <p className="error">{errors.place}</p>
              ) : null}
            </div>
            <div>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value= {values.category} 
              > 
                {options}
              </select>
              {errors.category && touched.category ? (
                <p className="error">{errors.category}</p>
              ) : null}
            </div>

            <div>
              <input
                type="datetime-local"
                autoComplete="off"
                name="startDate"
                id="startDate"
                placeholder="Select the start date"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.startDate && touched.startDate ? (
                <p className="error">{errors.startDate}</p>
              ) : null}
            </div>

            <div>
              <input
                type="datetime-local"
                autoComplete="off"
                name="endDate"
                id="endDate"
                placeholder="Select the event end date"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.endDate && touched.endDate ? (
                <p className="error">{errors.endDate}</p>
              ) : null}
            </div>

            <div>
              <input
                type="number"
                autoComplete="off"
                name="price"
                id="price"
                placeholder="Enter ticket price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.price && touched.price ? (
                <p className="error">{errors.price}</p>
              ) : null}
            </div>

            

            <div className="addeventbtn">
              <button type="submit">
                Add Event
              </button>
            </div>
            </div>
          </form>

    </div>
  )
}

export default AddEvents
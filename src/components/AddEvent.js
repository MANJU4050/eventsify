import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import addpic from "../assets/addevent.svg";
import markpic from "../assets/addevent2.svg";
import { useFormik } from "formik";
import { addValidation } from "../schema/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";
import Form from "react-bootstrap/Form";

const initialValues = {
  title: "",
  place: "",
  category: "",
  startDate: "",
  endDate: "",
  price: "",
  favourite: false,
};

const AddEvent = () => {
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
    <Container className="mt-3">
      <Row>
        <Col className="text-left" lg={6} md={8} sm={12}>
          <h3 className="font-weight-4 mt-4 mb-5 head ">
            Hey add your event here!!!
          </h3>
          <img className="w-75 mt-5" src={markpic} alt="icon" />
        </Col>

        <Col className="add" lg={6} md={6} sm={12}>
          <img src={addpic} alt="addpic" className="addexpense w-75 mb-1" />

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                autoComplete="off"
                name="title"
                id="title"
                placeholder="Enter event title"
                className="form-control mb-2"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && touched.title ? (
                <p className="form-error">{errors.title}</p>
              ) : null}
            </div>

            <div>
              <input
                type="string"
                autoComplete="off"
                name="place"
                id="place"
                className="form-control mb-2"
                placeholder="Enter the event place"
                value={values.place}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.place && touched.place ? (
                <p className="form-error">{errors.place}</p>
              ) : null}
            </div>
            <div>
              <Form.Select
                aria-label="Default select example"
                name="category"
                id="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value= {values.category} 
              > 
                {options}
              </Form.Select>
              {errors.category && touched.category ? (
                <p className="form-error">{errors.category}</p>
              ) : null}
            </div>

            <div>
              <input
                type="datetime-local"
                autoComplete="off"
                name="startDate"
                id="startDate"
                className="form-control mb-2"
                placeholder="Select the start date"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.startDate && touched.startDate ? (
                <p className="form-error">{errors.startDate}</p>
              ) : null}
            </div>

            <div>
              <input
                type="datetime-local"
                autoComplete="off"
                name="endDate"
                id="endDate"
                className="form-control mb-2"
                placeholder="Select the event end date"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.endDate && touched.endDate ? (
                <p className="form-error">{errors.endDate}</p>
              ) : null}
            </div>

            <div>
              <input
                type="number"
                autoComplete="off"
                name="price"
                id="price"
                placeholder="Enter ticket price"
                className="form-control mb-2"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.price && touched.price ? (
                <p className="form-error">{errors.price}</p>
              ) : null}
            </div>

            

            <div className="d-grid gap-2 mb-3">
              <Button variant="primary" size="md" type="submit">
                Add Event
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEvent;

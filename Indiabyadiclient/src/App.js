import React, { useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import { TextField, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com"
const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    Phone: "",
    message: "",
    subject:"Enquiry about indiabyadi"
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/contact/addcontact",
        baseURL: "http://localhost:8000/api",
        method: "post",
        headers: { "Content-type": "application/json" },
        data: {
          email: formData.email,
          name: formData.name,
          phone: formData.Phone,
          message: formData.message
        },
      };

      let response = await axios(config);

      if (response.status === 200) {
        emailjs
          .sendForm('service_0c4e5dw', 'template_mur6j98', e.target, 'Q7nXQWJ2D9APCTJs_')
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            }
          );
        alert("Message sent successfully");
        window.location.reload()
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (

    <Container maxWidth="sm" className="ContactContainer">
      <div className="aboutUsContainer01_01">
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span
            className="AboutUs_Container_01_Home"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span>{" / "}</span>
          <span className="AboutUs_Container_01_About">Contact Us</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={formData.name}
              onChange={handleInputChange}
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
            />
            {formErrors.name && (
              <p className="error-message">{formErrors.name}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
            {formErrors.email && (
              <p className="error-message">{formErrors.email}</p>
            )}
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              value={formData.Phone}
              onChange={handleInputChange}
              name="Phone"
              label="Phone"
              variant="outlined"
              fullWidth
            />
            {formErrors.phone && (
              <p className="error-message">{formErrors.phone}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={formData.message}
              onChange={handleInputChange}
              name="message"
              label="Message"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
            />
            {formErrors.message && (
              <p className="error-message">{formErrors.message}</p>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                background: "#fd9b0c",
                width: "7.5rem",
                textAlign: "center",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactUs;
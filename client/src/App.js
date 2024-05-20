
import "./App.css"

import React, { useState } from "react";
import axios from "axios";
function App() {

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    Phone: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        url: "/contact/addcontact",
        baseURL: "http://localhost:8000/api",
        method: "post",
        header: { "Content-type": "application/json" },
        data: {
          email: formData.email,
          name: formData.name,
          phone: formData.Phone,
          message: formData.message
        },
      };

      let response = await axios(config);

      if (response.status === 200) {
        alert("message sent  Succesfully");
        window.location.reload("")
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div className="form-container">
      <div className="form-input">
        <div className="form-input">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && (
            <p className="error-message">{formErrors.name}</p>
          )}
        </div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          autoComplete="off"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        {formErrors.email && (
          <p className="error-message">{formErrors.email}</p>
        )}
      </div>



      <div className="form-input">
        <label htmlFor="phone">Phone</label>
        <input
          id="Phone"
          name="Phone"
          type="text"
          value={formData.Phone}
          onChange={handleInputChange}
        />
        {formErrors.phone && (
          <p className="error-message">{formErrors.phone}</p>
        )}
      </div>
      <div className="form-input">
        <label htmlFor="message">Message</label>
        <textarea 
          id="message"
          name="message"
          type="text"
          value={formData.message}
          onChange={handleInputChange}
        />
        {formErrors.message && (
          <p className="error-message">{formErrors.message}</p>
        )}
      </div>
      <button onClick={handleSubmit} className="submit-btn">
        Submit
      </button>

    </div>
  );
}

export default App;

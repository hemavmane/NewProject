import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header"
import Moment from 'react-moment';
import moment from "moment";
export default function ContactDetails() {
  const [CDeatils, setCDeatils] = useState([]);
  let initialDate = {
    start: "",
    end: ""
  }
  const [SDate, setSDate] = useState(initialDate)
  console.log(SDate, "SDate")
  const handleChange = (e) => {
    let { name, value } = e.target
    setSDate(() => ({
      [name]: value
    }))
  }
  const columns = [
    {
      name: "Name",
      selector: row => row.name,
    },
    {
      name: "Email",
      selector: row => row.email,
    },
    {
      name: "Phone Number",
      selector: row => row.phone,
    },
    {
      name: "Date",
      selector: row =>
        <Moment format="DD-MM-YY">{row.createdAt}</Moment>
      ,
    },

    {
      name: "Message",
      selector: row => row.message,
    },
    {
      name: "Action",
      selector: row =>

        <img onClick={() => handleDelete(row._id)} 
        style={{ cursor: "pointer" }} width={15} height={15} src="../Assests/delete_6861294.png" alt="" />

    },

  ];
  const handleDelete = async (id) => {
    try {
      let response = await axios.post(`http://localhost:8000/api/contact/trash/${id}`)
      if (response.status === 200) {
        alert(response.data.message)
        window.location.reload("")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllcontact();
    let filtreData = CDeatils.filter((ele) => ele.createdAt)
  }, [SDate]);
  const getAllcontact = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8000/api/contact/getdata"
      );
      if (response.status === 200) {
        setCDeatils(response.data.reverse());
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const filterDateswise = (data) => {
    return data?.filter((item) => {
      const createdAtDate = moment(item?.createdAt, "YYYY-MM-DD");
      const startDate = SDate.start
        ? moment(SDate.start, "YYYY-MM-DD")
        : null;
      const endDate = SDate.end
        ? moment(SDate.end, "YYYY-MM-DD")
        : null;

      if (startDate && !createdAtDate.isSameOrAfter(startDate)) {
        return false;
      }

      if (endDate && !createdAtDate.isSameOrBefore(endDate)) {
        return false;
      }

      return true;
    });
  };

  const filteredData = filterDateswise(CDeatils);

  return (
    <>
      <Header />
      <div className="row m-auto">
        <div className="col-md-4">
          <label className="fw-bold" >Start Date</label>
          <input type="date" onChange={handleChange} name="start" />
        </div>
        <div className="col-md-4">
          <label className="fw-bold">End Date</label>
          <input type="date" name="end" onChange={handleChange} />
        </div>
      </div>
      <DataTable title="N.Rahman" columns={columns} data={filteredData}
        theme="solarized" selectableRows pagination={filteredData.length > 9 ? true : false} />
    </>
  );
}

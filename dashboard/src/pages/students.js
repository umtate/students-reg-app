import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Search from "../components/Search";

const Students = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((val) => setData(val.data));
  }, []);

  return (
    <>
      <Search />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>University</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <>
                <tr>
                  <td>{item.student_id}</td>
                  <td>{item.name}</td>
                  <td>{item.university}</td>
                  <td>{item.mark}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Students;

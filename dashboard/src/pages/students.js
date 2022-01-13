import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Search from "../components/Search";

const Students = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((val) => console.log(val.data));
  });

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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Students;

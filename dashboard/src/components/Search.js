import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
const Search = () => {
  return (
    <>
      {" "}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Lookup name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
    </>
  );
};

export default Search;

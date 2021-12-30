import { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function App() {
  const [userData, setUserData] = useState([]);
  const [errors, setErrors] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(e)) {
      let formData = new FormData(e.target);
      let data = Object.fromEntries(formData.entries());
      setUserData([...userData,data]);
      setErrors(null);
      formRef.current.reset();
    }
  };

  const validate = (e) => {
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());

    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let genderError = "";
    let hobbyError = "";

    if (!data.username) {
      nameError = "Name field is required";
    }

    const regName = /^[A-Z][a-z0-9_-]{4,19}$/;
    if (regName.test(data.username) === false) {
      nameError = "First letter capital and minimum 5 letters";
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.email || reg.test(data.email) === false) {
      emailError = "Email Field is Invalid ";
    }

    if (!data.password) {
      passwordError = "Password field is required";
    }

    const passReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (passReg.test(data.password) === false) {
      passwordError =
        "Minimum eight characters, at least one letter and one number";
    }

    if (!data.gender) {
      genderError = "Gender field is required";
    }

    if (!data.hobby) {
      hobbyError = "Hobby field is required";
    }

    if (emailError || nameError || passwordError || genderError || hobbyError) {
      setErrors({ nameError, emailError, passwordError, genderError, hobbyError });
      return false;
    }

    return true;
  };

  return (
    <Container fluid>
      <Row className="d-flex align-items-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="form" ref={formRef}>
            <div className="header"> Registration </div>
            <Form.Group className="mb-3 mt-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Enter Username"
                required
              />
              <Form.Text className="text-error">
                {errors?.nameError}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
              <Form.Text className="text-error">
                {errors?.emailError}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <Form.Text className="text-error">
                {errors?.passwordError}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Check
                label="Male"
                name="gender"
                type="radio"
                value="male"
                id={`gender-male`}
              />
              <Form.Check
                label="Female"
                name="gender"
                type="radio"
                value="female"
                id={`gender-female`}
              />
              <Form.Text className="text-error">
                {errors?.genderError}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicHobby">
              <Form.Label>Hobby</Form.Label>
              <Form.Check
                label="Cricket"
                name="hobby"
                type="checkbox"
                value="cricket"
                id="cricket"
              />
              <Form.Check
                label="Football"
                name="hobby"
                type={"checkbox"}
                value="football"
                id="football"
              />
              <Form.Check
                label="Hockey"
                name="hobby"
                type={"checkbox"}
                value="Hockey"
                id="Hockey"
              />
              <Form.Text className="text-error">
                {errors?.hobbyError}
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
        {userData &&
          userData.length > 0 &&
          userData.map((e) => (
            <div className="note" key={e.index}>
              <div className="header"> User's Details</div>
              <div>Email:- {e.email}</div>
              <div>Name:- {e.username}</div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;

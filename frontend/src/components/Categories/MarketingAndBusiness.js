import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";


export default function () {
  const [CoursesbyCategory, setCoursesbyCategory] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/courses/search_category/6599b39454d0b4e356435c9a/test`
      )
      .then((res) => {
        setCoursesbyCategory(res.data.courses);
        console.log(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Marketing and Business
      </h1>
      <hr style={{ margin: "10px 0" }} />
      <Container style={{ margin: "5px" }} fluid>
        <Row xs={1} md={3} className="g-4">
          {CoursesbyCategory.map((courses, indx) => (
            <Col key={indx}>
              <Card bg="light" className="h-100 d-flex flex-column">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{courses.courseTitle}</Card.Title>
                  <div style={{ flex: 1, marginLeft: "20px" }}>
                    <Card.Img
                      variant="top"
                      src={courses.coursePicture}
                      style={{ width: "90%", height: "400px" }}
                    />
                  </div>
                  <Card.Text style={{ textAlign: "left", fontSize: "20px" }}>
                    {" "}
                    By{"  "}
                    {courses.courseInstructor.firstName}{" "}
                    {courses.courseInstructor.lastName}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button
                      style={{ margin: "5px" }}
                      className="mb-2"
                      variant="primary"
                      onClick={() => {
                        console.log(test);
                        axios
                          .post(
                            `http://localhost:5000/courses/enrollCourse/${courses._id}`,
                            {},
                            {
                              headers: {
                                Authorization: `Bearer ${test}`,
                              },
                            }
                          )
                          .then((res) => {
                            console.log("res", res);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      Enroll Course
                    </Button>
                    <Button
                      style={{ margin: "5px" }}
                      className="mb-2"
                      variant="primary"
                    >
                      Go somewhere
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

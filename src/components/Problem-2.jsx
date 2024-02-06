import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';

const Problem2 = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [allContact, setallContact] = useState([]);
  const [usContact, setusContact] = useState([]);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    fetch('https://contact.mediusware.com/api/contacts/?page=1&page_size=600')
      .then((res) => res.json())
      .then((data) => setallContact(data.results));
  }, []);

  useEffect(() => {
    fetch('https://contact.mediusware.com/api/country-contacts/United%20States/?page=1&page_size=600')
      .then((res) => res.json())
      .then((data) => setusContact(data.results));
  }, []);

  // Step 2: Update mapping logic
  const filteredUsContact = onlyEvenChecked
    ? usContact?.filter((contact) => contact.id % 2 === 0)
    : usContact;
  // Step 2: Update mapping logic
  const filteredAllContact = onlyEvenChecked
    ? allContact?.filter((contact) => contact.id % 2 === 0)
    : allContact;

    // console.log(allContact, 'and', usContact)
    console.log(filteredUsContact)

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button onClick={handleShow} className="btn btn-lg btn-outline-primary" type="button">
            All Contacts
          </button>
          <button onClick={handleShow2} className="btn btn-lg btn-outline-warning" type="button">
            US Contacts
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>All Contact</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} style={{ backgroundColor: '#46139f' }}>
            All Contacts
          </Button>
          <Button onClick={() => { handleClose(); handleShow2(); }} variant="primary" style={{ backgroundColor: '#ff7f50' }}>
            US Contacts
          </Button>
          <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: '#46139f' }}>
            Close
          </Button>
          <Form.Check
            type="checkbox"
            label="Only Even"
            style={{ marginLeft: '10px' }}
            // Step 3: Attach event handler to update the state
            onChange={() => setOnlyEvenChecked(!onlyEvenChecked)}
            checked={onlyEvenChecked}
          />
        </Modal.Footer>
        <Modal.Body>
          <Container>
            <Row className="justify-content-center mt-5">
              <Col>
                <h4 className="text-center text-uppercase mb-4">Country Phone List</h4>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Country</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllContact?.map((data, index) => (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.country.name}</td>
                        <td>{data.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
                <Modal.Footer>
          <Button variant="primary" onClick={() => { handleClose2(); handleShow(); }} style={{ backgroundColor: '#46139f' }}>
            All Contacts
          </Button>
          <Button onClick={handleShow2} variant="primary" style={{ backgroundColor: '#ff7f50' }}>
            US Contacts
          </Button>
          <Button variant="secondary" onClick={handleClose2} style={{ backgroundColor: '#46139f' }}>
            Close
          </Button>
          <Form.Check
            type="checkbox"
            label="Only Even"
            style={{ marginLeft: '10px' }}
            onChange={() => setOnlyEvenChecked(!onlyEvenChecked)}
            checked={onlyEvenChecked}
          />
        </Modal.Footer>
        <Modal.Body>
          <Container>
            <Row className="justify-content-center mt-5">
              <Col>
                <h4 className="text-center text-uppercase mb-4">Country Phone List</h4>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Country</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsContact?.map((data, index) => (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.country.name}</td>
                        <td>{data.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

      </Modal>
    </div>
  );
};

export default Problem2;

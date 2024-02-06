import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';

const Problem2 = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [allContact, setallContact] = useState([]);
  const [usContact, setusContact] = useState([]);
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [allPage, setAllPage] = useState(1); // State to track current page for all contacts
  const [usPage, setUsPage] = useState(1); // State to track current page for US contacts

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // Effect to fetch all contacts based on the current page
  useEffect(() => {
    fetch(`https://contact.mediusware.com/api/contacts/?page=${allPage}&page_size=10`)
      .then((res) => res.json())
      .then((data) => setallContact(data.results));
  }, [allPage]);

  // Effect to fetch US contacts based on the current page
  useEffect(() => {
    fetch(`https://contact.mediusware.com/api/country-contacts/United%20States/?page=${usPage}&page_size=10`)
      .then((res) => res.json())
      .then((data) => setusContact(data.results));
  }, [usPage]);

  // Function to handle page change for all contacts
  const handleAllPageChange = (direction) => {
    if (direction === 'next') {
      setAllPage(allPage + 1);
    } else {
      setAllPage(allPage - 1);
    }
  };

  // Function to handle page change for US contacts
  const handleUsPageChange = (direction) => {
    if (direction === 'next') {
      setUsPage(usPage + 1);
    } else {
      setUsPage(usPage - 1);
    }
  };

  const filteredUsContact = onlyEvenChecked
    ? usContact?.filter((contact) => contact.id % 2 === 0)
    : usContact;

  const filteredAllContact = onlyEvenChecked
    ? allContact?.filter((contact) => contact.id % 2 === 0)
    : allContact;

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
                <div className="d-flex justify-content-between mt-3">
                  {/* Button for previous page, disabled if it's the first page */}
                  <Button onClick={() => handleAllPageChange('prev')} disabled={allPage === 1}>Previous</Button>
                  {/* Button for next page */}
                  <Button onClick={() => handleAllPageChange('next')}>Next</Button>
                </div>
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
                <div className="d-flex justify-content-between mt-3">
                  {/* Button for previous page, disabled if it's the first page */}
                  <Button onClick={() => handleUsPageChange('prev')} disabled={usPage === 1}>Previous</Button>
                  {/* Button for next page */}
                  <Button onClick={() => handleUsPageChange('next')}>Next</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Problem2;

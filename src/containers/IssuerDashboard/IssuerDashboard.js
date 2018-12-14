import React, { Component } from 'react';
import { Row, Col, CardBody, FormGroup, Label,
  Input,
  Badge, Card, CardHeader, Pagination, PaginationItem, PaginationLink, Table
} from 'reactstrap'
import Widget02 from './Widget02';


class IssuerDashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
          Issuer Dashboard
          </div>
          <div className="card-body">
          <CardBody>
                <Row>
                  <Col xs="12" lg="6">
                    <FormGroup>
                      <Label htmlFor="name">Web page</Label>
                      <Input type="text" id="name" placeholder="" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" lg="6">
                    <FormGroup>
                      <Label htmlFor="name">Email</Label>
                      <Input type="text" id="name" placeholder="" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" lg="6">
                    <FormGroup>
                      <Label htmlFor="email">Name</Label>
                      <Input type="text" id="email" placeholder="" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <Card>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i> Published Certificates
                      </CardHeader>
                      <CardBody>
                        <Table responsive striped size="xl">
                        <Row>
                          <Col xs="12" sm="6" lg="8">
                            <Widget02 header="Title" mainText="Description" icon="fa fa-cogs" color="primary" variant="1" footer="See request (10)"/>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" sm="6" lg="8">
                            <Widget02 header="Title" mainText="Description" icon="fa fa-cogs" color="primary" variant="1" footer="See request (10)"/>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" sm="6" lg="8">
                            <Widget02 header="Title" mainText="Description" icon="fa fa-laptop" color="info" variant="1" footer="See request (10)"/>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" sm="6" lg="8">
                            <Widget02 header="Title" mainText="Description" icon="fa fa-bell" color="info" variant="1" footer="See request (10)"/>
                          </Col>
                        </Row>
                        </Table>
                        <Pagination>
                          <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                          <PaginationItem active>
                            <PaginationLink tag="button">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                        </Pagination>
                      </CardBody>
                    </Card>
                    </Col>
                </Row>
              </CardBody>
          </div>
        </div>
      </div>
    );
  }
}

export default IssuerDashboard;

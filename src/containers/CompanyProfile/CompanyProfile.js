import React, { Component } from 'react';
import {
  Row, Col, CardBody, FormGroup, Label,
  Input, Button,
  Badge, Card, CardHeader, Pagination, PaginationItem, PaginationLink, Table
} from 'reactstrap'


class CompanyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      applicants: []
    }
  }

  componentDidMount() {
    const profile = {
      "id": 21,
      "email": "hr@fptsoftware.com",
      "name": "fpt software",
      "created_at": "2018-12-02T23:58:33.000Z",
      "role": 2
  }
    const applicants = [
      {
          "id": 20,
          "email": "qhquanghuy96@gmail.com",
          "name": "huy nguyen",
          "eth_address": null,
          "trusted_by_system_at": null,
          "created_at": "2018-12-02T04:17:34.000Z",
          "description": null,
          "role": 1,
          "last_time_open_notification": null,
          "applied_at": "2018-12-03T16:04:41.000Z"
      }
  ]
    this.setState({
      profile: profile,
      applicants: applicants
    })
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            Company Name
          </div>
          <div className="card-body">
            <CardBody>
              <Row>
                <Col xs="12" lg="6">
                  <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" placeholder="Enter your name" disabled value = {this.state.profile.name} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" lg="6">
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" placeholder="Enter your email" disabled value = {this.state.profile.email} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Card>
                    <CardHeader>
                      <i className="fa fa-align-justify"></i> Jobs
                      </CardHeader>
                    <CardBody>
                      <Table responsive striped size="xl">
                        <thead>
                          <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Date registered</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.applicants.map(applicant => {
                              return <tr>
                              <td>{applicant.name}</td>
                              <td>{applicant.email}</td>
                              <td>{applicant.applied_at}</td>
                              <td>
                                <Button block color="success">Accept</Button>
                              </td>
                              <td>
                                <Button block color="danger">Reject</Button>
                              </td>
                            </tr>
                            })
                          }
                          
                         
                        </tbody>
                      </Table>
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

export default CompanyProfile;

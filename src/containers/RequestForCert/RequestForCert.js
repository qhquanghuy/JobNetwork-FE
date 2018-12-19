import React, { Component } from 'react';
import { Row, Col, CardBody, FormGroup, Label,
  Input,
  Badge, Card, CardHeader, Button, Pagination, PaginationItem, PaginationLink, Table
} from 'reactstrap'


class RequestForCert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requests: []
    }
  }

  componentDidMount() { 
    const requests = [
      {
          "id": 20,
          "email": "qhquanghuy96@gmail.com",
          "name": "huy nguyen",
          "eth_address": null,
          "trusted_by_system_at": null,
          "created_at": "2018-12-04T02:37:25.000Z",
          "description": null,
          "role": 1,
          "last_time_open_notification": null,
          "status": "approved",
          "issuer_system_identifier": "B14DCCN069"
      }
    ]
    this.setState({
      requests: requests
    })
  }


  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            Request for Certificate
            <div className="card-header-actions">
                {/*eslint-disable-next-line*/}
                <a href="#" className="card-header-action btn btn-warning">Accept</a>
                {/*eslint-disable-next-line*/}
                <a className="card-header-action btn btn-danger" data-target="#collapseExample" onClick={this.toggle}>Reject</a>
                {/*eslint-disable-next-line*/}
              </div>
          </div>
          <div className="card-body">
          <CardBody>
          <Table responsive striped size="xl">
                          <thead>
                          <tr>
                            <th>
                              <input  type="checkbox" value=""/>
                            </th>
                            <th>Username</th>
                            <th>Date registered</th>
                            <th>Identifier</th>
                            {/* <th>Status</th> */}
                          </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.requests.map(request => {
                                return <tr>
                                <th>
                                  <input  type="checkbox" value=""/>
                                </th>
                                <td>{request.name}</td>
                                <td>{request.created_at}</td>
                                <td>{request.issuer_system_identifier}</td>
                                {/* <td>
                                  <Badge color="success">Active</Badge>
                                </td> */}
                              </tr>
                              })
                            }
                          
                          </tbody>
                        </Table>
                        {/* <Pagination>
                          <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                          <PaginationItem active>
                            <PaginationLink tag="button">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                        </Pagination> */}
              </CardBody>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestForCert;

import React, { Component } from 'react';
import { Row, Col, CardBody, FormGroup, Label,
  Input,
  Badge, Card, CardHeader, Pagination, PaginationItem, PaginationLink, Table
} from 'reactstrap'


class RequestForCert extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            Request for Certificate
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
                            <th>Status</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <th>
                              <input  type="checkbox" value=""/>
                            </th>
                            <td>Yiorgos Avraamu</td>
                            <td>2012/01/01</td>
                            <td>Member</td>
                            <td>
                              <Badge color="success">Active</Badge>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <input  type="checkbox" value=""/>
                            </th>
                            <td>Avram Tarasios</td>
                            <td>2012/02/01</td>
                            <td>Staff</td>
                            <td>
                              <Badge color="danger">Banned</Badge>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <input  type="checkbox" value=""/>
                            </th>
                            <td>Quintin Ed</td>
                            <td>2012/02/01</td>
                            <td>Admin</td>
                            <td>
                              <Badge color="secondary">Inactive</Badge>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <input  type="checkbox" value=""/>
                            </th>
                            <td>Enéas Kwadwo</td>
                            <td>2012/03/01</td>
                            <td>Member</td>
                            <td>
                              <Badge color="warning">Pending</Badge>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <input  type="checkbox" value=""/>
                            </th>
                            <td>Agapetus Tadeáš</td>
                            <td>2012/01/21</td>
                            <td>Staff</td>
                            <td>
                              <Badge color="success">Active</Badge>
                            </td>
                          </tr>
                          </tbody>
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
          </div>
        </div>
      </div>
    );
  }
}

export default RequestForCert;

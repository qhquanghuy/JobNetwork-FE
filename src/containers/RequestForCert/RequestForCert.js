import React, { Component } from 'react';
import { CardBody, Table } from 'reactstrap'

import axios from 'axios'

class RequestForCert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      requests: []
    }
  }

  componentDidMount() { 
    const id = this.props.match.params.id
    axios.get("http://localhost:8080/api/issuer/certs/" + id + "/requests", {
        headers: { authorization: "Bearer " + this.state.user.token }
      })
        .then(res => {
          this.setState({
            requests: res.data.requests
          })
        })
        .catch(err => console.log(err))
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

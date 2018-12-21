import React, { Component } from 'react';
import { CardBody, Table } from 'reactstrap'

import axios from 'axios'

class RequestForCert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      statefulRequests: []
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get("http://localhost:8080/api/issuer/certs/" + id + "/requests", {
      headers: { authorization: "Bearer " + this.state.user.token }
    })
      .then(res => {
        this.setState({
          statefulRequests: res.data.requests.map(request => {
            return {
              isChecked: false, 
              request: request
            }
          })
        })
      })
      .catch(err => console.log(err))
  }

  onCheckBoxChanged() {
    console.log(this.state)
  }


  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            Request for Certificate
            <div className="card-header-actions">
              {/*eslint-disable-next-line*/}
              <a onClick href="#" className="card-header-action btn btn-warning">Accept</a>
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
                      <input type="checkbox" value="" />
                    </th>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Identifier</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.statefulRequests.map(statefulRequest => {
                      const request = statefulRequest.request
                      return <tr>
                        <th>
                          <input onChange = {(event) => {
                            statefulRequest.isChecked = event.target.checked
                            this.onCheckBoxChanged()
                          }} type="checkbox" value="" />
                        </th>
                        <td>{request.name}</td>
                        <td>{request.created_at}</td>
                        <td>{request.issuer_system_identifier}</td>
                      </tr>
                    })
                  }

                </tbody>
              </Table>
            </CardBody>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestForCert;

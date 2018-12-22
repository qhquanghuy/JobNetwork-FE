import React, { Component } from 'react';
import { CardBody, Table, Button } from 'reactstrap'

import axios from 'axios'

class RequestForCert extends Component {

  constructor(props) {
    super(props);
    this.onClickAccept = this.onClickAccept.bind(this)
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
          statefulRequests: res.data.requests.reduce((acc, request) => {
            console.log(request)
            if (request.status === 'pending') {
              const stateObj =  {
                isChecked: false,
                request: request
              }
              return acc.concat([stateObj])
            }
            return acc          
          }, [])
        })
      })
      .catch(err => console.log(err))
  }

  onClickAccept() {
    const cert = this.props.location.state.cert
    const acceptedRequests = this.state.statefulRequests.filter(req => req.isChecked)
    const certs = acceptedRequests.map(statefulRequest => {
      return {
        issuedOn: (new Date()).getTime(),
        cert: {
          id: cert.id,
          title: cert.title,
          description: cert.description,
          icon: cert.badge_icon,
          createdAt: cert.created_at
        },
        issuer: {
          id: this.state.user.info.id,
          email: this.state.user.info.email,
          name: this.state.user.info.name,
          webPage: this.state.user.info.webPage,
          address: this.state.user.info.webPage + "/eth/address",
          revocationList: this.state.user.info.webPage + "/eth/revoked"
        },
        recipientProfile: {
          id: statefulRequest.request.id,
          email: statefulRequest.request.email,
          name: statefulRequest.request.name
        }
      }
    })
    const body = {
      certs: certs
    }
    axios.post("http://localhost:8080/api/issuer/certs/publish", body, {
      headers: { authorization: "Bearer " + this.state.user.token }
    })
      .then(res => {
        console.log(res)
        this.setState({
          statefulRequests: this.state.statefulRequests.filter(req => { 
            return !acceptedRequests.includes(req)
          })
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
              <Button onClick={this.onClickAccept} className="card-header-action btn btn-warning">Accept</Button>
              {/*eslint-disable-next-line*/}
              <Button className="card-header-action btn btn-danger" data-target="#collapseExample" onClick={this.toggle}>Reject</Button>
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
                          <input onChange={(event) => {
                            statefulRequest.isChecked = event.target.checked
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

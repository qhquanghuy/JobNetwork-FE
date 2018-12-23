import React, { Component } from 'react';
import {
  Row, Col, CardBody, FormGroup, Label, Button,
  Input,
  Badge, Card, CardHeader, Pagination, PaginationItem, PaginationLink, Table
} from 'reactstrap'
import Widget02 from './Widget02';
import axios from 'axios';


class IssuerDashboard extends Component {
  constructor(props) {
    super(props);
    this.onClickRequestMember = this.onClickRequestMember.bind(this)
    this.onClickRequestCert = this.onClickRequestCert.bind(this)
    const user = JSON.parse(localStorage.getItem('user'))
    this.state = {
      user: user,
      profile: {},
      certs: [],
      isBelongWithLoggedInUser: user === null ? false : user.info.id == this.props.match.params.id,
      isMember: false
    }
  }

  loadIssuerProfile(id, callBack) {
    axios.get("http://localhost:8080/api/users/" + id)
      .then(res => {
        callBack(res.data)
        this.setState({
          profile: res.data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    const id = this.props.match.params.id
    if (!this.state.user) {
      this.loadIssuerProfile(id, () => { })
    }

    if (!this.state.isBelongWithLoggedInUser && this.state.user) {
      axios.get("http://localhost:8080/api/issuers/" + id + "/members/check", {
        headers: { authorization: "Bearer " + this.state.user.token }
      })
        .then(res => {
          this.setState({
            isMember: true
          })
        })
        .catch(err => console.log(err))
    }

    if (this.state.user && !this.state.user.webPage) {
      this.loadIssuerProfile(id, (profile) => {
        this.state.user.info = {
          ...this.state.user.info,
          webPage: profile.webPage
        }
        localStorage.setItem('user', JSON.stringify(this.state.user))
      })
    }

    this.fetchCerts(id)

  }

  fetchCerts(issuerId) {
    const token = this.state.user ? this.state.user.token : ""
    axios.get("http://localhost:8080/api/issuers/" + issuerId + "/certs", {
      headers: { authorization: "Bearer " + token }
    })
      .then(res => {
        this.setState({
          certs: res.data.certs
        })
      })
      .catch(err => console.log(err))
  }

  onClickRequestMember() {
    axios.post("http://localhost:8080/api/user/member/request", {
      issuerId: this.props.match.params.id
    }, {
        headers: { authorization: "Bearer " + this.state.user.token }
      })
      .then(res => {
        const token = res.data.token
        window.open('http://localhost:3001/signin/' + token, "_self")
      })
      .catch(err => console.log(err))
  }
  onClickRequestCert(cert) {
    const issuerId = this.props.match.params.id
    axios.post("http://localhost:8080/api/user/certs/" + cert.id + "/request", {
      issuerId: issuerId
    }, {
        headers: { authorization: "Bearer " + this.state.user.token }
      })
      .then(() => {
        this.fetchCerts(issuerId)
      })
      .catch(err => console.log(err))
  }

  footerFor(cert) {
    console.log(cert)
    if (this.state.user) {
      return cert.isRequested == 0 ? "See all requests" : null
    } else {
      return null
    }
  }

  onClickSeeAll(cert) {
    this.props.history.push({
      pathname: "/issuer-dashboard-request/" + cert.id,
      state: { cert: cert }
    })
  }

  render() {
    const shouldShowRequestMember = !this.state.isBelongWithLoggedInUser && this.state.user
    const _header = this.state.isMember ? <Badge color="success" className="float-right">Member</Badge> : <Button onClick={this.onClickRequestMember} block color="primary">Request Member</Button>
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            Issuer Dashboard
            <div hidden={!shouldShowRequestMember} className="card-header-actions">

              {_header}

            </div>
          </div>
          <div className="card-body">
            <CardBody>
              <Row>
                <Col xs="12" lg="6">
                  <FormGroup>
                    <Label htmlFor="name">Web page</Label>
                    <Input type="text" id="name" placeholder="" required disabled value={this.state.profile.webPage} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" lg="6">
                  <FormGroup>
                    <Label htmlFor="name">Email</Label>
                    <Input type="text" id="name" placeholder="" required disabled value={this.state.profile.email} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" lg="6">
                  <FormGroup>
                    <Label htmlFor="email">Name</Label>
                    <Input type="text" id="email" placeholder="" required disabled value={this.state.profile.name} />
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
                        {this.state.certs.map(cert => {
                          let img = "data:image/jpeg;charset=utf-8;base64,"
                          img += cert.badge_icon
                          // return <img src={img}/>
                          return <Row>
                            <Col xs="12" sm="6" lg="8">
                              <Widget02 onClickRequestCert={() => this.onClickRequestCert(cert)} isBelongWithLoggedInUser={this.state.isBelongWithLoggedInUser} header={cert.title} mainText={cert.description} icon={img} color="primary" variant="1" footer={this.footerFor(cert)} onClickSeeAll={() => this.onClickSeeAll(cert)} />
                            </Col>
                          </Row>
                        })}
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

export default IssuerDashboard;

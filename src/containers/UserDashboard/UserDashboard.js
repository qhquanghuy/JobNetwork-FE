import React, { Component } from 'react';
import {
  Col, Nav, NavItem, NavLink, Row, TabContent, TabPane,
  CardBody, CardHeader,
  Card, CardHeaderProps, Table, Button
} from 'reactstrap';
import classnames from 'classnames';
import Widget02 from './Widget02';
import axios from 'axios'
import styles from './../../views/Dashboard/styles.css';
class UserDashboard extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      certs: [],
      jobs: [],
      tabName: "Certificates"
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get("http://localhost:8080/api/users/" + id + "/certs")
      .then(res => {
        console.log(res)
        this.setState({
          certs: res.data.certs.map(cert =>{
            return {
              verifyState: 0,
              cert: cert
          }
          })
        })
      })
      .catch(err => console.log(err))
    axios.get("http://localhost:8080/api/users/" + id + "/jobs")
      .then(res => {
        this.setState({
          jobs: res.data.jobs
        })
      })
      .catch(err => console.log(err))
  }

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {this.renderTabContent()}
        </TabPane>
        <TabPane tabId="2">
        {this.renderTabJob()}
        </TabPane>
        <TabPane tabId="3">
          {`3. ${this.lorem()}`}
        </TabPane>
      </>
    );
  }

  renderTabJob() {
    return (
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Applied Jobs
                      </CardHeader>
            <CardBody>
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    {/* <th className="text-center"><i className="icon-people"></i></th> */}
                    <th>Company Name</th>
                    <th>Job title</th>
                    <th>Quantity</th>
                    <th className="text-center">Location</th>
                    <th>Description</th>
                    <th>Prefer</th>
                    <th className="text-center">Applications</th>
                    <th>Status</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {this.state.jobs.map((job) => {
                    return <tr key = {job.id}>

                      <td>
                        {job.employerName}
                      </td>
                      <td className="text-center">
                        {job.title}
                      </td>
                      <td className="text-center">
                        {job.quantity}
                      </td>
                      <td className="text-center">
                        {job.location}
                      </td>
                      <td>
                        <div className={styles.descTruncate}>
                          {job.description}
                        </div>
                      </td>
                      <td>
                        <div className={styles.descTruncate}>
                          {job.skills.split('|').join(", ")}
                        </div>
                      </td>
                      <td className="text-center">
                        {job.applicants === null ? 0 : job.applicants}
                      </td>
                      <td className="text-center">
                      {job.status}
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
      
    )
  }

  onClickVerify(cert) {
    console.log(cert)
    axios.post("http://localhost:8080/api/cert/verify",{
      cert: cert.cert.blockCert
    })
      .then(res => {
        cert.verifyState = res.data.isValid ? 1 : 2
        console.log(this.state.certs)
        this.setState({
          certs: this.state.certs
        })
      })
      .catch(err => console.log(err))
  }

  renderTabContent = () => {
    return (
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Certificates
                      </CardHeader>
            <CardBody>
              <Table responsive striped size="xl">
                {
                  this.state.certs.map(statefulCert => {
                    const cert = statefulCert.cert
                    let img = "data:image/jpeg;charset=utf-8;base64,"
                    img += cert.badge_icon
                    return <Row>
                      <Col xs="12" sm="6" lg="8">
                        <Widget02 onClickVerify = {() => this.onClickVerify(statefulCert)} transaction={cert.blockCert.signature.txHash} hash={cert.blockCert.signature.targetHash} merkleRoot={cert.blockCert.signature.merkleRoot} header={cert.title} mainText={cert.description} icon={img} color= { statefulCert.verifyState === 1 ? "success" : statefulCert.verifyState === 2 ? "danger" : "primary" } variant="1" footer="Download" />
                      </Col>
                    </Row>
                  })
                }
              </Table>

            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-6">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[3] === '1'}
                  onClick={() => { this.toggle(3, '1'); }}
                >
                  <i className="icon-credit-card"></i>
                  <span className={this.state.activeTab[3] === '1' ? '' : 'd-none'}> Certificate </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[3] === '2'}
                  onClick={() => { this.toggle(3, '2'); }}
                >
                  <i className="icon-calendar"></i>
                  <span className={this.state.activeTab[3] === '2' ? '' : 'd-none'}> Applied jobs </span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[3]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserDashboard;

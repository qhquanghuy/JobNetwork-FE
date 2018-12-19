import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  InputGroupAddon,
  Input,
  InputGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
  Progress,
  Row,
  Table,
  Alert
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import styles from './styles.css';
import axios from 'axios'
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.fetchJobs = this.fetchJobs.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      dropdownOpen: false,
      radioSelected: 2,
      jobs: [],
      errorString: ""
    };
  }

  fetchJobs = () => {
    axios.get('http://localhost:8080/api/jobs')
      .then(response => {
        console.log(response)
        this.setState({
          jobs: response.data.jobs
        })
      })
  }
  
  componentDidMount() {
    this.fetchJobs()
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <FormGroup>
              <Label htmlFor="appendedInputButton">Looking for Issuer?</Label>
              <div className="controls">
                <InputGroup>
                  <Input id="appendedInputButton" size="16" type="text" placeholder="Enter issuer email" />
                  <InputGroupAddon addonType="append">
                    <Button color="secondary">Search!</Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
            <Alert color="warning" hidden = {this.state.errorString === ""}>
              <h4><i className="fa fa-warning"></i> Warning!</h4>
              {this.state.errorString}
              <p>
              <Button onClick = {
                () => {
                  this.setState({
                    errorString: ""
                  })
                }
              }>Ok</Button>
              </p>
            </Alert>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.jobs.map((job) => {
                    return <tr>

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
                      <td>
                        <Button block color="success" disabled={this.state.user === null}
                          onClick = {
                            () => {
                              const url = "http://localhost:8080/api/user/jobs/" + job.id + "/apply" 
                              console.log({authorization: "Bearer " + this.state.user.token})
                              axios.post(url,{}, {
                                headers: {authorization: "Bearer " + this.state.user.token}
                              })
                              .then(() => {
                                this.fetchJobs()
                              })
                              .catch(err => {
                                this.setState({
                                  errorString: "You applied this job before"
                                })
                              })

                            }
                          }
                        >Apply</Button>
                      </td>
                    </tr>
                  })
                  }

                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;

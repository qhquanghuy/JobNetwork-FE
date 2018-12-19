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
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import styles from './styles.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      jobs: []
    };
  }

  componentDidMount() {
    //should api call
    const jobs = [
      {
        "id": 7,
        "user_id": 21,
        "quantity": 5,
        "deadline": "2019-02-28T17:00:00.000Z",
        "created_at": "2018-12-03T16:18:57.000Z",
        "title": "iOS Developer",
        "description": "experience: 2year+, salary:20m",
        "applicants": null,
        "rejected_applicants": null,
        "accepted_applicants": null,
        "location": "Ha noi",
        "skills": "iOS|swift|mobile development",
        "employerName": "joe chen"
      },
      {
        "id": 6,
        "user_id": 21,
        "quantity": 10,
        "deadline": "2019-01-31T17:00:00.000Z",
        "created_at": "2018-12-03T03:30:49.000Z",
        "title": "Nodejs Developer",
        "description": "experience: 2year+, salary:20m",
        "applicants": 1,
        "rejected_applicants": null,
        "accepted_applicants": null,
        "location": "Ha noi",
        "skills": "nodeJs|web development",
        "employerName": "joe chen"
      }
    ]
    this.setState({
      jobs: jobs
    })
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
                  <Input id="appendedInputButton" size="16" type="text" placeholder="Enter issuer email"/>
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
              <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    {/* <th className="text-center"><i className="icon-people"></i></th> */}
                    <th>Company Name</th>
                    <th>Job title</th>
                    <th>Quantity</th>
                    <th className="text-center">Location</th>
                    <th>Description</th>
                    <th className="text-center">Applications</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.jobs.map((job) => {
                    return <tr>
                      {/* <td className="text-center">
                      <div className="avatar">
                        <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-success"></span>
                      </div>
                    </td> */}
                      <td>
                        {job.employerName}
                        {/* <div>job.employerName</div> */}
                        {/* <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015 */}
                      {/* </div> */}
                      </td>
                      <td className="text-center">
                        {job.title}
                    </td>
                      <td className="text-center">
                        {job.quantity}
                    </td>
                      <td className="text-center">
                        {job.location}
                      {/* <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i> */}
                      </td>
                      <td>
                        <div className={styles.descTruncate}>
                        {job.description}
                          {/* At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. */}
                      </div>
                      </td>
                      <td className="text-center">
                        {job.applicants === null ? 0 : job.applicants}
                    </td>
                      <td>
                        <Button block color="success">Apply</Button>
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

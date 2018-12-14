import React, {Component} from 'react';
import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane,
  CardBody,
  Card, CardHeader, Pagination, PaginationItem, PaginationLink, Table
} from 'reactstrap';
import classnames from 'classnames';
import Widget02 from './Widget02';

class UserDashboard extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
    };
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
          {`2. ${this.lorem()}`}
        </TabPane>
        <TabPane tabId="3">
          {`3. ${this.lorem()}`}
        </TabPane>
      </>
    );
  }

  renderTabContent = () => {
    return (
      <Row>
                  <Col xs="12">
                    <Card>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i> Published Certificates
                      </CardHeader>
                      <CardBody>
                        <Table responsive striped size="xl">
                        <Row>
                          <Col xs="12" sm="6" lg="8">
                            <Widget02 header="Title" mainText="Description" icon="fa fa-cogs" color="primary" variant="1" footer="See request (10)"/>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" sm="6" lg="8">
                            <Widget02 header="Title" mainText="Description" icon="fa fa-cogs" color="primary" variant="1" footer="See request (10)"/>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" sm="6" lg="8">
                            <Widget02 header="Title" mainText="Description" icon="fa fa-laptop" color="info" variant="1" footer="See request (10)"/>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" sm="6" lg="8">
                            <Widget02 header="Title" mainText="Description" icon="fa fa-bell" color="info" variant="1" footer="See request (10)"/>
                          </Col>
                        </Row>
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
                  <i className="icon-calculator"></i>
                  <span className={this.state.activeTab[3] === '1' ? '' : 'd-none'}> Jobs</span>
                  {'\u00A0'}<Badge color="success">New</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[3] === '2'}
                  onClick={() => { this.toggle(3, '2'); }}
                >
                  <i className="icon-basket-loaded"></i>
                  <span className={this.state.activeTab[3] === '2' ? '' : 'd-none'}> Certificate</span>
                  {'\u00A0'}<Badge pill color="danger">29</Badge>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  active={this.state.activeTab[3] === '3'}
                  onClick={() => { this.toggle(3, '3'); }} >
                    <i className="icon-pie-chart"></i>
                    <span className={this.state.activeTab[3] === '3' ? '' : 'd-none'}> Charts</span>
                </NavLink>
              </NavItem> */}
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

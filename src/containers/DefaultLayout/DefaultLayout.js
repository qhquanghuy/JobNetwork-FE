import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(localStorage.getItem('user'))
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    localStorage.removeItem('user')
    this.setState({
      user: null
    })
    this.props.history.push("/")
  }

  gotoProfile() {
    const user = this.state.user
    if (user) {
      const role = user.info.role
      if (role == 1) {
        this.props.history.push("/user-dashboard/" + user.info.id)
      } else if (role == 2) {
        this.props.history.push("/company/")
      } else {
        this.props.history.push("/issuer-dashboard/" + user.info.id)
      }
    }
  }

  render() {
    console.log("rerender")
    let userName = ""
    if (this.state.user) {
      userName = this.state.user.info.name
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader userName = {userName} onClickProfile = {() => this.gotoProfile()} onLogin = { () => this.props.history.push('/login') } onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;

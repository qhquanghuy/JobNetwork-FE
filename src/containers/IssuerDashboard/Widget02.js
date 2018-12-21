import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter, Button, CardHeader } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  footer: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  isBelongWithLoggedInUser: PropTypes.bool
};

const defaultProps = {
  header: '$1,999.50',
  mainText: 'Income',
  icon: 'fa fa-cogs',
  color: 'primary',
  variant: '0',
  link: '#',
  isBelongWithLoggedInUser: false
};

class Widget02 extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    const { onClickSeeAll, onClickRequestCert , isBelongWithLoggedInUser, className, cssModule, header, mainText, icon, color, footer, link, children, variant, ...attributes } = this.props;

    // demo purposes only
    const padding = (variant === '0' ? { card: 'p-3', icon: 'p-3', lead: 'mt-2' } : (variant === '1' ? {
      card: 'p-0', icon: 'p-4', lead: 'pt-3',
    } : { card: 'p-0', icon: 'p-4 px-5', lead: 'pt-3' }));

    const card = { style: 'clearfix', color: color, icon: icon, classes: '' };
    card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

    const lead = { style: 'h5 mb-0', color: color, classes: '' };
    lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

    const blockIcon = function (icon) {
      const classes = classNames(icon, 'bg-' + card.color, padding.icon, 'font-2xl mr-3 float-left');
      const data = icon
      // console.log(data)
      return (<img style={{ width: 48, height: 48, float: "left" }} id='base64image'
        src={data} />)
      // return (<i className={classes}></i>);
    };

    const cardHeader = () => {
      return <CardHeader hidden = {!isBelongWithLoggedInUser}>

      _header = <div className="card-header-actions">
        <a href="#" className="card-header-action btn btn-setting"><i className="icon-settings"></i></a>
        <a className="card-header-action btn btn-close"><i className="icon-close"></i></a>
      </div>
    </CardHeader>
    }

    const cardFooter = function () {
      let _footer
      if (isBelongWithLoggedInUser) {
        _footer = <Button onClick = {onClickSeeAll} className="font-weight-bold font-xs btn-block text-muted">
          {footer}
          <i className="fa fa-angle-right float-right font-lg"></i></Button>
      } else {
        _footer = <div className="card-header-actions">
          <Button onClick = {onClickRequestCert} block color="primary">Request This Certificate</Button>
        </div>
      }
      if (footer) {
        return (
          <CardFooter className="px-3 py-2">
            {_footer}
          </CardFooter>
        );
      }
    };



    return (
      <Card>
        {cardHeader()}

        <CardBody className={card.classes} {...attributes}>
          {blockIcon(card.icon)}
          <div className={lead.classes}>{header}</div>
          <div className="text-muted text-uppercase font-weight-bold font-xs">{mainText}</div>
        </CardBody>
        {cardFooter()}
      </Card>
    );
  }
}

Widget02.propTypes = propTypes;
Widget02.defaultProps = defaultProps;

export default Widget02;
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Account from '../userProfile'

const btnStyle = {
  fontSize: '16px',
  margin: '6px 10px'
}

export default class NavMenu extends React.Component<any, any> {

  public render() {
    return (
      <Navbar
        inverse
        fixedTop
        fluid
        collapseOnSelect
        style={{ zIndex: 1000 as any }}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>PGH Certs</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className='text-xs-center'>
          <Nav>
            <LinkContainer to={'/Admin'}>
              <NavItem><button className='btn btn-danger' style={btnStyle}>Admin</button></NavItem>
            </LinkContainer>
          </Nav>
          <Account />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
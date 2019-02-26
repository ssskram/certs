import * as React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import Account from '../userProfile'

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
          <Account />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
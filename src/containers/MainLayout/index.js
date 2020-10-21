import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Button, Row, Col, Avatar, Dropdown } from 'antd'
import './MainLayout.css'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import AddTicket from 'containers/Ticket/AddTicket'
import ButtonGroup from 'antd/lib/button/button-group'
import MyBreadcrumb from 'containers/Breadcrumb/MyBreadcrumb'
import axios from 'axios'

const { Header, Content, Footer } = Layout

class MainLayout extends Component {
  state = {
    collapsed: true,
    visibleOpenTicket: false,
  }

  handleOpenTicket = () => {
    this.setState({ visibleOpenTicket: true })
  }
  handleClose = () => {
    this.setState({ visibleOpenTicket: false })
  }
  handleLogOut = () => {
    axios({
      method: 'delete',
      url: `/api/1.0/auth/`,
    })
      .then((response) => {
        if (response.data.code === 204) {
          localStorage.removeItem('isLoggedIn', false)
          // history.push('/signin')
          window.location.replace('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {/* <Menu.Item key="0">
          <Link to="/user/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/">Settings</a>
        </Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="3">
          <Button type="link" onClick={this.handleLogOut}>
            Sign Out
          </Button>
        </Menu.Item>
      </Menu>
    )
    return (
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            height: '65px',
            borderBottom: ' solid 1px #f2f2f2',
            background: 'white',
          }}
          id="header"
        >
          <Row
          // style={{ flexFlow: 'nowrap' }}
          >
            <Col span={6}>
              <Link id="logo" to="/">
                HELPDESK
              </Link>
            </Col>
            {/* <div className="main-logo" /> */}
            <Col
              span={18}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              className="menu-row"
            >
              {/* <Search
                placeholder="Поиск"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              /> */}
              <Menu
                theme="light"
                mode="horizontal"
                // defaultSelectedKeys={['2']}
                style={{
                  lineHeight: '61px',
                  // float: 'right',
                  // borderBottom: ' solid 1px #f2f2f2',
                }}
                id="nav"
              >
                {/* <Menu.Item key="/ticket">
                  Доски <Link to="/ticket" />
                </Menu.Item> */}

                {/* <Menu.Item key="/reports">Отчеты</Menu.Item> */}
                <Menu.Item key="/users">
                  Пользователи <Link to="/users" />
                </Menu.Item>
                <Menu.Item key="/reports">
                  Отчеты <Link to="reports" />
                </Menu.Item>
                <Menu.Item key="/tickets">
                  Заявки <Link to="/tickets" />
                </Menu.Item>
              </Menu>
              <ButtonGroup>
                <Button type="link" onClick={this.handleOpenTicket}>
                  <PlusOutlined />
                </Button>
              </ButtonGroup>
              <Dropdown
                placement="bottomCenter"
                overlay={menu}
                trigger={['click']}
              >
                <Avatar
                  icon={<UserOutlined />}
                  // src={userphoto}
                  style={{
                    // color: '#f56a00',
                    // backgroundColor: '#fde3cf',
                    cursor: 'pointer',
                  }}
                >
                  {/* <img ></img> */}
                </Avatar>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <AddTicket
          visibleOpenTicket={this.state.visibleOpenTicket}
          handleClose={this.handleClose}
        ></AddTicket>
        <Content
          className="site-layout"
          style={{ padding: '0 50px', margin: '64px auto' }}
        >
          <MyBreadcrumb></MyBreadcrumb>

          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380, width: '1249px' }}
          >
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {/* Ant Design ©2018 Created by Ant UED */}
        </Footer>
      </Layout>
    )
  }
}
export default withRouter(MainLayout)

import React, { Component } from 'react'
import MainLayout from './index'
import { BreadcrumbProvider } from '../Breadcrumb/BreadcrumbContext'

class MainLayoutWithContext extends Component {
  state = {
    items: [],
    title: '',
    isDisplay: '',
  }
  changeItems = items => {
    this.setState({ items })
  }
  changeTitle = title => {
    this.setState({ title })
  }

  authRoleSet = () => {
    const role = JSON.parse(localStorage.getItem("authData")).role.id
      if ( role !== 1) {
        this.setState({isDisplay: 'none'})
      } else {
        this.setState({isDisplay: 'block'})
      }
  }

  render() {
    const { children } = this.props
    const { items, title } = this.state
    return (
      <BreadcrumbProvider
        value={{
          items,
          title,
          changeItems: this.changeItems,
          changeTitle: this.changeTitle,
        }}
      >
        <MainLayout>{children}</MainLayout>
      </BreadcrumbProvider>
    )
  }
}
export default MainLayoutWithContext

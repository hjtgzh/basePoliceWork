import React, { Component } from 'react'
import { Pagination } from 'antd'

// 声明组件  并对外输出
export default class houseCheckList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { 
      currentPage: 1,
      pageSize: 10,
    }
  }
  //pageSize改变的调用
  onShowSizeChange (e,pageSize){
    console.log(pageSize)
    this.props.onShowSizeChange(pageSize)
    this.setState({
      pageSize: pageSize
    })
  }
  //page改变的调用
  pageChange(currentPage) {
    console.log(currentPage);
    this.setState({
      currentPage: currentPage
    })
    this.props.pageChange(currentPage)
  }
  showTotal(){
    return `共 ${this.props.houseCheckSearchResult.list.length} 条`
  }
  render() {
    const { 
            houseCheckSearchResult,
            pageChange,
            onShowSizeChange,
            currentPage,
          } = this.props 
    return (
      <Pagination 
        current={this.state.currentPage || 1}
        total={houseCheckSearchResult.list.length}
        showSizeChanger
        onShowSizeChange={this.onShowSizeChange.bind(this)}
        onChange={this.pageChange.bind(this)}
        showTotal={this.showTotal.bind(this)}
        current={currentPage}
      />
    )
  }
}

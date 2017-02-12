import React, { Component } from 'react'
import { Row, Col, Pagination,Timeline } from 'antd'
import WindowSize from 'components/windowSize'
import './journal.css'


export default class Journal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
    this.OnChangePageSize = this.OnChangePageSize.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.renderLiCom = this.renderLiCom.bind(this)
  }
  //当组件加载完成是
  componentDidMount() {

  }
  //分页函数
  OnChangePageSize(current){
    const { changePageSize } = this.props
    changePageSize(current)
  }

  onShowSizeChange(current,size){
    const { onShowSizeChange } = this.props
    onShowSizeChange(current,size)
  }
  //展示列表内容
  renderLiCom(row,index){
    const { current } = this.props
    var dotE = null
    if (current == 1 && index == 0) {
      dotE=(<div className="circle-log circle-cor"><span></span></div>)
    }else{
      dotE=(<div className="circle-log"></div>)
    }

    return (
      <Timeline.Item key={index} dot={dotE}>
        <div className = "text-box">
         <em className ="addTime"> {row.czsjLabel} </em>
         <span className = "contentLog"> {row.opcontent || ''} </span>
         <span className = "userName"> {row.czr || ''} </span>
         <span className = "gxdwname"> {row.gxdwqc || ''} </span>
        </div>
      </Timeline.Item>
      )
  }

  render() {
    const { current,pageSize,total,dataSource=[],showSizeChanger, } = this.props
    if(dataSource.length == 0){
      dataSource.push({opcontent : "暂无数据"})
    }
    return (
      <div className="visitlog-tj">
        <div className="visitlogList">
          <Timeline>
          {
            dataSource.map((row, index) => (this.renderLiCom(row, index)))
          }
          </Timeline>
        </div>
        <Pagination 
          total = {total} 
          current = {current}
          pageSize = {pageSize} 
          showTotal = {(total,range) => `共 ${total} 条`}
          onChange = {this.OnChangePageSize}
          showSizeChanger ={ showSizeChanger }
          onShowSizeChange = { this.onShowSizeChange }
        />
      </div>
    )
  }
}

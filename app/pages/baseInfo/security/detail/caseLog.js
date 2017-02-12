import React, { Component } from 'react'
import { Row, Col,Spin } from 'antd'
import { connect } from 'react-redux'
import { fetchSecurityLogList } from 'actions/security'
import Journal from 'baseInfo/pop/visit/detail/journal'

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    securityLogListResult : state.securityLogListResult,
  })
)

export default class Log extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading : false
    }
    this.params = {
      pageNo : 1,
      pageSize : 10
    }
    this.onChangePageSize = this.onChangePageSize.bind(this)
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
  }
  componentDidMount() {
    this.securityId = this.props.securityId || this.props.params.securityId || 1
    this.setState({"loading" : true})
    this.props.dispatch(fetchSecurityLogList({...this.params, "id" : this.securityId}))
  }

    //props状态更新回调
  componentWillReceiveProps(nextProps){
    if(this.props.securityLogListResult !== nextProps.securityLogListResult) {
      this.setState({"loading" : false})
    }
  }

  onChangePageSize(current){
    this.params.pageNo = current
    this.props.dispatch(fetchSecurityLogList({...this.params, "id" : this.securityId}))
  }

  onShowSizeChange(current,size){
    this.params.pageNo = 1
    this.params.pageSize = size
    this.props.dispatch(fetchSecurityLogList({...this.params, "id" : this.securityId}))
  }


  render() {
    const { securityLogListResult } = this.props
    const { list,totalCount } = securityLogListResult

    return (
      <div className="detail-content">
        <Spin tip="Loading..." spinning={this.state.loading}>
            <div className="detail-box-lzr">
              {this.state.address}
            </div>
            <Journal
              total={totalCount}
              current={this.params.pageNo}
              pageSize={this.params.pageSize}
              dataSource={list}
              changePageSize = {this.onChangePageSize} //页数改变回调
              showSizeChanger = {true}  //显示改变每页数
              onShowSizeChange = {this.onShowSizeChange} //改变每页数回调
            />
        </Spin>
      </div>
    )
  }
}

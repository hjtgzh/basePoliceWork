import React, { Component } from 'react'
import { Button, Modal } from 'antd'
// 声明组件  并对外输出
export default class exportDataModal extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { 
      exportData: false,
      saveSuccess: false,
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchHouseCheckList({ currentPage: 1 }))
  }

  //新增地址
  addAddressModal() {
    this.setState({
      exportData: true,
    });
  }
  //取消导出
  cancelExport (){
    this.props.cancelExport()
  }
  //导出成功
  exportDataSuccess (){
    this.props.cancelExport()
  }
  exportDataTitle(){
    return(
        <p className="leaveFormTitle">
          <span>提示</span>
        </p>
      )
  }
  exportDataFooter() {
    return(<Button type="primary" onClick={this.exportDataSuccess.bind(this)}>确定</Button>)
  }

  //保存新增地址并发起请求
  saveAddress(){
    // this.props.dispatch(fetchAddRelyPower())
    this.setState({
      exportData: false,
      saveSuccess: true,
    });
  }

  
  render() {
    const { 
            isExportDataModal,
            cancelExport,
          } = this.props 
    return (
      <Modal visible={isExportDataModal} footer={this.exportDataFooter()}
        onCancel={this.cancelExport.bind(this)} title={this.exportDataTitle()}
        className="" width={350}
      >
      </Modal>
    )
  }
}

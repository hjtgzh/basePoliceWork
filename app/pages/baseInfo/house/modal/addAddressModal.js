import React, { Component } from 'react'
import { Button, Modal } from 'antd'
// 声明组件  并对外输出
export default class addAddressModal extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { 
      addNewAddress: false,
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
      addNewAddress: true,
    });
  }
  //取消新增地址
  cancleAdd (){
    this.props.cancelAdd()
  }
  addAddressTitle(){
    return(
        <p className="leaveFormTitle">
          <span>新增地址</span><Button onClick={this.saveAddress.bind(this)} type="primary" className="leaveFormBt">保存</Button>
        </p>
      )
  }
  //保存新增地址并发起请求
  saveAddress(){
    // this.props.dispatch(fetchAddRelyPower())
    this.setState({
      addNewAddress: false,
      saveSuccess: true,
    });
  }

  
  render() {
    const { 
            isAddAddressModal,
            cancelAdd,
          } = this.props 
    return (
      <Modal visible={isAddAddressModal} footer=""
        onCancel={this.cancleAdd.bind(this)} title={this.addAddressTitle()}
        className="" width={350}
      >
      </Modal>
    )
  }
}

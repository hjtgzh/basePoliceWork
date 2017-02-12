import React, { Component } from 'react'
import { Button, Modal } from 'antd'
//引入请求的模块
import { connect } from 'react-redux'

import {
  fetchRelyList,  
  fetchDeleteDetail,
  fetchExportData,
  fetchAddRelyPower,
  } from 'actions/rely'
const Option = Select.Option;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      relyListSearchResult: state.relyListSearchResult,
      deleteDetailResult: state.deleteDetailResult,
      amList: state.amList,
    })
)

export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      leaveReasonForm: false,
    }
  }
   // 组件已经加载到dom中
  componentDidMount() {//debugger
    this.props.dispatch(fetchRelyList({ currentPage: 1 ,pageSize: 10}))
  }

  //是否选中将要删除的条目
  deleteOk() {
    console.log('Clicked OK');   
    console.log(this.props.deleteArr);   
    if(this.props.deleteArr == ""){
      this.setState({
        visible: false,
        leaveReasonForm: false,
        pleaseChooseOne: true,  
      });
    }
    else{
      this.setState({
        visible: false,
        pleaseChooseOne: false,
        leaveReasonForm: true,        
      });
    }    
  }
  //批量删除的调用
  deleteModal() {
    this.setState({
      visible: true,
    });
  }
  cancelDelete() {
    // console.log(e);
    this.setState({
      visible: false,
      leaveReasonForm: false
    });
  }
  render() {
    const {
          deleteArr,
      } = this.props
    return (
      <div className="ifDelete">
        {/*批量删除-弹窗*/}
        <Button className="deleteBt" onClick={this.deleteModal.bind(this)}>批量删除</Button>
        <Modal visible={this.state.visible} title="提示"
          onOk={this.deleteOk.bind(this)} onCancel={this.cancelDelete.bind(this)}
          className="hjt-ifSure"
        >
        <p className="isDelete">是否删除</p>      
        </Modal>
      </div>
    )
  }
}

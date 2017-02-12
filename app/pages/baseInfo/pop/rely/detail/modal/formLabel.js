import React from 'react';

import {
  Form, Modal,
} from 'antd';

import StateBtn from '.././component/stateButton'


const formLabel = Form.create()(React.createClass({
  getInitialState: function () {
    return {
      // btnArr :this.props.btnArr, //存放按钮数据
    }
  },
  /* setBtnArr:function(btn){
    this.state.btnArr=this.props.btnArr;
     this.state.btnArr[btn.value]=btn;
     // this.props.setBtnArr(this.state.btnArr)
     // this.setState(this.state.btnArr)
  },*/
  getClass() {
    const showArr = [];   // 存放已选按钮
    for (const value in this.props.btnArr) {
      const obj = this.props.btnArr[value]
      if (obj.show) {
        showArr.push({ value: value, text: obj.text })
      }
    }
    showArr.length == 0 ? this.info() : this.props.setLabel(showArr)
  },
  info() {
    Modal.info({
      title: '请选择标签类型',
      content: (
        <div>
          <p>至少选择一种标签</p>
        </div>
      ),
      onOk() {},
    })
  },
  render() {
    return (
      <Modal
        className="modal-header"
        visible={this.props.visible}
        title="标签选项"
        onCancel={this.props.onCancel}
        onOk={this.getClass}
        confirmLoading={this.props.confirmLoading}
      >
        <Form horizontal onSubmit={this.handleSubmit} className="formLabel">
          <StateBtn name="1" btn={this.props.btnArr['1']} setBtnArr={this.props.setBtnArr}>志愿者</StateBtn>
          <StateBtn name="2" btn={this.props.btnArr['2']} setBtnArr={this.props.setBtnArr}>群防群治</StateBtn>
          <StateBtn name="3" btn={this.props.btnArr['3']} setBtnArr={this.props.setBtnArr}>治安信息员</StateBtn>
          <StateBtn name="4" btn={this.props.btnArr['4']} setBtnArr={this.props.setBtnArr}>社区(村)干部</StateBtn>
          <StateBtn name="5" btn={this.props.btnArr['5']} setBtnArr={this.props.setBtnArr}>社会知名人士</StateBtn>
        </Form>
      </Modal>
    );
  },
}));

export default formLabel;


import React from 'react';
import ReactDOM from 'react-dom';

import {
  Form, Select, Radio, Button,
} from 'antd';

import StateBtn from './stateButton'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Demo = Form.create()(React.createClass({
  getInitialState: function() {
    return {
      btnArr :{},
    };
  },
  setBtnArr:function(btn,show){
     this.state.btnArr[btn]=show;
  },
  getClass() {
    for(let name in this.state.btnArr){
      this.state.btnArr[name]?console.log(name):null;
    }
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form horizontal onSubmit={this.handleSubmit}>

        <div>
          标签选项<Button type="primary" onClick={this.getClass} style={{marginBottom:5,float:"right"}}>确定</Button>
        </div>
         <StateBtn name="1" setBtnArr={this.setBtnArr}>流浪乞讨人员</StateBtn>
          <StateBtn name="2" setBtnArr={this.setBtnArr}>大型群众性活动人员</StateBtn>
          <StateBtn name="3" setBtnArr={this.setBtnArr}>巡逻盘查人员</StateBtn>
          <StateBtn name="4" setBtnArr={this.setBtnArr}>涉疆人员</StateBtn>
          <StateBtn name="6" setBtnArr={this.setBtnArr}>低慢小持有人</StateBtn>
          <StateBtn name="7" setBtnArr={this.setBtnArr}>信鸽持有人</StateBtn>
          <StateBtn name="8" setBtnArr={this.setBtnArr}>烈性犬持有人</StateBtn>
          <StateBtn name="9" setBtnArr={this.setBtnArr}>境外重点关注人员</StateBtn>
          <StateBtn name="10" setBtnArr={this.setBtnArr}>其他人员</StateBtn>
      
      </Form>
    );
  },
}));

export default Demo;


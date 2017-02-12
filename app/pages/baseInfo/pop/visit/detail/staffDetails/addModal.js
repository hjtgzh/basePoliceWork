import React from 'react';
import ReactDOM from 'react-dom';

import FormInfo from './addStateMoadl'

import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Input
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Demo = Form.create()(React.createClass({
  getInitialState: function () {
    return {
      value: []
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  handleChange: function (event) {
    /*setState 是一个异步方法，所以需要操作缓存当前值*/
    // this.refs.myInput.focus();
    this.setState({})
  },

  aler(){
    console.log(this.refs.myTextInput.value)
  },
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  },

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const value = this.state.value;


    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="物品名称"
          hasFeedback
        >
          {
            <Input placeholder='' onChange={this.handleChange}/>
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="物品品牌"
          hasFeedback
        >
          {
            <Input placeholder='' onChange={this.handleChange}/>
          }
        </FormItem>
        <FormItem {...formItemLayout} label="物品种类">
          <Select
            id="fly"
            size="large"
            defaultValue=""
            onChange={this.handleSelectChange}
          >
            <Option value="10">无人机</Option>
            <Option value="20">滑翔机</Option>
            <Option value="30">三角翼</Option>
            <Option value="40">滑翔伞</Option>
            <Option value="50">动力伞</Option>
            <Option value="60">热气球</Option>
            <Option value="70">飞艇</Option>
            <Option value="80">航空模型</Option>
            <Option value="90">空飘气球</Option>
            <Option value="100">其他低慢小</Option>

          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="物品来源">
          <Select
            id="from"
            size="large"
            defaultValue=""
            onChange={this.handleSelectChange}
          >
            <Option value="10">自制</Option>
            <Option value="20">购买</Option>
            <Option value="30">租用</Option>

          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="物品持有人"
          hasFeedback
        >
          {
            <Input placeholder='' onChange={this.handleChange}/>
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="持有人身份证"
          hasFeedback
        >
          {
            <Input placeholder='' onChange={this.handleChange}/>
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="持有人电话"
          hasFeedback
        >
          {
            <Input placeholder='' onChange={this.handleChange}/>
          }
        </FormItem>
      </Form>
    );
  },
}));

export default Demo;


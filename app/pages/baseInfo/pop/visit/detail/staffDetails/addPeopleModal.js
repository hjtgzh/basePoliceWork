/**
 * Created by Administrator on 2016/12/15.
 */


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Input, Button, Tabs, Modal, message, Form, Select, DatePicker } from 'antd'
const FormItem=Form.Item
const Option=Select.Option
import {
  fetchSaveOperator,

} from 'actions/people'
@connect(
  (state, props) => ({
    config: state.config,

  })
)
class GroupSlowlySmallAddPeo extends Component{
  constructor(props){
    super(props)
    this.state={
      visible:false,
      loading:false
    }

    this.onCancel=this.onCancel.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)


  }

  handleSubmit(e) {
    console.log(this.props)
    //debugger
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const rangeTimeValue = fieldsValue['range-time-picker'];
      const values = {
        ...fieldsValue,
        'czsj': fieldsValue['czsj'] ? fieldsValue['czsj'].format('YYYY-MM-DD HH:mm:ss') : '',
      };
      console.log('Received values of form: ', values);
      this.props.dispatch(fetchSaveOperator({ ...values,wpId:this.props.wpId},(reslut)=>{
        console.log(reslut)
        if(reslut.status==1){
          message.success(reslut.msg)
          this.props.onCancel()
        }
      }))
    });
  }

  onCancel(){
    this.props.onCancel()
    // this.setState({
    //   visible:false
    // })
  }
  checkName(rule, value, callback){
    if(value){
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(!reg.test(value)){
        callback("请输入正确身份证号码")
      }
      // validateFields([''])
    }
    callback()
  }
  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit}>确定</Button>
        <Button type="" onClick={this.onCancel}>取消</Button>
      </div>
    )
  }
  render(){
    const {onOk,onCancel,title='低慢小操作人',visible=true}=this.props
    const {getFieldDecorator}=this.props.form
    const formItemLayout={
      labelCol:{span:5},
      wrapperCol:{span:15},
      hasFeedback:true
    }

    return (
      <div>
        <Modal  onOk={this.onhandleOk} onCancel={this.onCancel}
                className='modal-body modal-header ' visible={this.props.visible}
                title={title} footer={this.footer()}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label='姓名'
              {...formItemLayout}
            >
              {
                getFieldDecorator('czrxm',{ rules: [
                  {required: true, message:'请输入姓名'},
                ],})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
            <FormItem
              label='身份证'
              {...formItemLayout}
            >
              {
                getFieldDecorator(' czrsfz',{rules: [
                  {required: true, message:'请输入身份证'},{ validator: this.checkName}
                ],})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
            <FormItem
              label='工作单位'
              {...formItemLayout}

            >
              {
                getFieldDecorator(' czrgzdw',{

                })(
                  <Input />
                )
              }
            </FormItem>

            <FormItem
              label='联系电话'
              {...formItemLayout}
            >
              {
                getFieldDecorator('czrlxdh',{})(
                  <Input />
                )
              }
            </FormItem>
            <FormItem
              label='操作时间'
              {...formItemLayout}
            >
              {
                getFieldDecorator('czsj',{ })(
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                )
              }
            </FormItem>
            <FormItem
              label='有无航空器驾驶执照'
              {...formItemLayout}
            >
              {
                getFieldDecorator(' ywzz',{ })(
                  <Select placeholder="">
                    <Option value="1">有</Option>
                    <Option value="0">无</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem
              label='执照号码'
              {...formItemLayout}
            >
              {
                getFieldDecorator(' zzhm',{})(
                  <Input placeholder=""/>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default  GroupSlowlySmallAddPeo=Form.create({})(GroupSlowlySmallAddPeo)

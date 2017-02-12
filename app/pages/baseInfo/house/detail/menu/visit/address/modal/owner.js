import React, { Component } from 'react'
import {Button, Form, Input,Modal} from 'antd'
const createForm = Form.create
const FormItem = Form.Item
import { regExpConfig } from 'utils/config'

@Form.create({
  //onFieldsChange(props, items) {
  //  console.log(props)
  //  console.log(items)
  //  // props.cacheSearch(items);
  //},
})
export default class dimenCode extends Component{
  constructor(props){
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.props.handleOk(values)
    });
  }
  footer(){
    return(
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>取消</Button>
        <Button type="primary" size={'large'} onClick={this.handleSubmit}>确定</Button>
      </div>
    )
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {visible,onCancel }=this.props;
    return(
      <Modal
          title="添加产权人"
          visible={visible}
          onCancel={onCancel}
          footer={this.footer()}
      >
        <Form horizontal>
          <FormItem>
            {getFieldDecorator('sfzh',{
              rules: [
                {required: true, message:'请输入产权人身份证'},
                {pattern:regExpConfig.IDcard, message:'产权人身份证格式不正确'}
              ]
            })(
                <Input placeholder="产权人身份证"/>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
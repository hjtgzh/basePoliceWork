import React, { Component } from 'react'
import {Button, Form, Input,Modal} from 'antd'
import { fetchaddQrcode } from 'actions/houseVisitAddress'

const createForm = Form.create
const FormItem = Form.Item

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
        <Button type="primary" size={'large'} onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>
      </div>
    )
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const {visible,onCancel}=this.props;
    return(
    <Modal
      title="新增二维码"
      visible={visible}
      onCancel={onCancel}
      footer={this.footer()}>
      <Form horizontal>
        <FormItem>
          {getFieldDecorator('code',{
            rules: [
              {required: true, message:'请输入二维码号'},
            ]
          })(
            <Input placeholder="请输入二维码号"/>
          )}
        </FormItem>
      </Form>
    </Modal>
    )
  }
}

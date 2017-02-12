import React, { Component } from 'react'
import {Input,Form,Modal,message} from 'antd'
const FormItem = Form.Item

@Form.create({
  onFieldsChange(props, items) {
    console.log(items)
  },
})

export default class dimenCode extends Component{
	constructor(props){
		super(props)
		this.state = {
			value:''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.checkName = this.checkName.bind(this)
	}

	checkName(rule, value, callback) {
  if (value) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(value)) {
      callback("请输入正确身份证号码")
    }
    // validateFields([''])
  }
  callback()
}
  
  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.props.search(values.idnumber)
    });
  }

	render(){
		const {getFieldDecorator} = this.props.form
		return(
			<Modal 
				className="modal-header" 
				title={this.props.title} 
				visible={this.props.visible} 
				confirmLoading={this.props.loading}
				onCancel={this.props.onCancel}
				onOk={this.handleSubmit}>
				{
					<FormItem hasFeedback>
						{getFieldDecorator('idnumber', {
												  rules: [{required: true, message: '请输入正确身份证号码'}, {validator: this.checkName}]
												})(
												  <Input placeholder="产权人身份证"/>
												)}
					</FormItem>
				}
			</Modal>
		)
	}
}
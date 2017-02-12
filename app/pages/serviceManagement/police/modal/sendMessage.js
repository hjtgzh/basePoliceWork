import React, { Component } from 'react'
import {Form, Checkbox, Button,Input,Upload,Modal} from 'antd';
const createForm = Form.create
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

@Form.create({
  	/*onFieldsChange(props, items) {
    console.log(props)
    console.log(items)
    // props.cacheSearch(items);
  },*/
})

export default class sendMsgModal extends Component{
	constructor(props){
	    super(props)
	    this.state={
	    	
	    }
	}
	footer(){
		return(
				<div>
					<Button type="primary" size='large'>短信发送</Button>
        	<Button type="primary" size='large'>微信发送</Button>
        	<Button type="button" size='large' onClick={this.props.onCancel}>取消</Button>
				</div>
			)
	}
    render(){
    	return(
    		<Modal 
    		    className="modal-header"
           	title="信息发送"
           	visible={this.props.visible}
           	onCancel={this.props.onCancel}
           	footer={this.footer()}>
    		<Form>
    			<FormItem>
    				<textarea style={{width:"100%"}}></textarea>
    			</FormItem>
    			<FormItem>
    				<Input type="file"/>
    			</FormItem>
    			
    		</Form>
    		</Modal>
    	)
    }
}
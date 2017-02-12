import React, { Component } from 'react'
import {Input,Modal} from 'antd'

export default class remark extends Component{
	constructor(props){
		super(props)
		this.state = {

		}
		this.setText = this.setText.bind(this)
		this.search = this.search.bind(this)
	}

	setText(e){
		this.setState({value:e.target.value})
	}
	search(){
		this.props.search(this.state.value)
	}

	render(){
		return(
			<Modal 
				className="modal-header" 
				title={this.props.title} 
				visible={true} 
				confirmLoading={this.props.loading}
				onCancel={this.props.onCancel}
				onOk={this.search}>
				
				<Input placeholder="请输入备注" maxLength='20' value={this.state.value} onChange={this.setText}/>
			</Modal>
		)
	}
}
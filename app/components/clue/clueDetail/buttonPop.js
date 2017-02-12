import React,{Component} from 'react'
import {Button,Modal} from 'antd'

export default class buttonPop extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){

	}

	render(){
		return(
			<div>
				<Button type={this.props.type} onClick={this.props.onClick}>{this.props.children}</Button>
				<Modal visible={this.props.visible} onCancel={this.props.onCancel}> 
					{this.props.content}
				</Modal>
			</div>
		)
	}
}
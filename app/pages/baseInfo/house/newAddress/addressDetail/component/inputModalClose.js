import React, { Component } from 'react'
import {Input,Icon} from 'antd'

export default class dimenCode extends Component{
	constructor(props){
		super(props)
		this.state = {

		}
	}
	render(){
		const addonBefore = this.props.addonBefore
		const handle = this.props.handle
		const addHandle = this.props.addHandle
		const isHandle = this.props.isHandle
		const name = this.props.name
		const placeholder = this.props.placeholder
		return(
			<div>
				<Input addonBefore={addonBefore?addonBefore:null} 
					placeholder={placeholder} 
					onClick={isHandle[name]? handle:null} 
					name={name} readOnly />
				<Icon className={!isHandle[name]?"inputClose-lzr":"inputClose-hidden-lzr"} type='close' onClick={addHandle}/>
			</div>
		)
	}
}
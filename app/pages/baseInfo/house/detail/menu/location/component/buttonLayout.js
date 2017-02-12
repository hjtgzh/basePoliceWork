import React, { Component } from 'react'
import {Button,Row,Col,Spin} from 'antd'
import StateButton from './stateButton'

export default class buttonLayout extends Component{
	constructor(props){
		super(props)
		this.state = {
			show:{
			},
			grade:''
		}
		this.setBtnArr = this.setBtnArr.bind(this)
	}

	componentWillReceiveProps(nextProps){
		const arrs = nextProps.arrs
		if(this.props.arrs!=arrs){
			for(let i=0;i<arrs.length;i++){
				const code=arrs[i][this.state.grade]
				this.state.show[code]=arrs[i]
				if(code==this.props.selectCode)
					this.state.show[code].show=true
			}
		}
	}

	componentWillMount(){
		const arrs= this.props.arrs
		this.state.grade=this.props.grade
		for(let i=0;i<arrs.length;i++){
			const code=arrs[i][this.state.grade]
			this.state.show[code]=arrs[i]
			if(code==this.props.selectCode)
				this.state.show[code].show=true
		}
	}

	setBtnArr(btn){
		const show = this.state.show
		show[btn.value]=btn
		for(let n in show)
			show[n].show=n==btn.value? true:false
		this.setState({show:show})
		this.props.onClick(btn)
	}

	render(){
		const arrs=this.props.arrs
		const grade = this.state.grade
		const gradeName = this.props.gradeName
		const len = 8	
		
		return(
			<Spin spinning={this.props.loading}>
				<div style={{width:"500px"}} className="buttonLayout-lzr">
					<Row gutter={16}>
						{arrs.map((arr,i)=>
							<Col span={len} key={i} >
								<StateButton 
									setBtnArr={this.setBtnArr} 
									name={arr[grade]} 
									show={this.state.show[arr[grade]].show}>
									{arr[gradeName]}
								</StateButton>
							</Col>
						)}
					</Row>
				</div>
			</Spin>
		)
	}
}
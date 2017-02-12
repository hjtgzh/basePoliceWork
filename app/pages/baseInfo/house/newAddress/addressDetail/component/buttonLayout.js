import React, { Component } from 'react'
import {Button,Row,Col,Spin} from 'antd'
import StateButton from './stateButton'

export default class buttonLayout extends Component{
	constructor(props){
		super(props)
		this.state = {
			showList:{},
		}
		this.setBtnArr = this.setBtnArr.bind(this)
	}
	componentWillReceiveProps(nextProps){
		// debugger 
		// console.warn('componentWillReceiveProps')
		// console.log(nextProps.arrs)
		// console.log(this.state.showList)
		const arrs= nextProps.arrs
		const showList = {}
		for(let i=0;i<arrs.length;i++){
			showList[arrs[i].key]={...this.state.showList[arrs[i].key],...arrs[i]}
		}
		this.setState({showList : showList})
		// debugger
		// console.log(this.state.showList)
	}
	componentWillMount(){
		const arrs= this.props.arrs
		const showList = {}
		for(let i=0;i<arrs.length;i++){
			showList[arrs[i].key]={...this.state.showList[arrs[i].key],...arrs[i]}
		}
		this.setState({showList : showList})
	}
	setBtnArr(btn){
		// debugger
		// console.log(btn)
		const showList = this.state.showList
		showList[btn.value]=btn
		for(let n in showList)
			showList[n].show=n==btn.value? true:false
		this.setState({showList:showList})
		// console.log(showList)
		//会更新componentWillReceiveProps
		this.props.onClick(btn.value,btn.grade)
	}

	render(){
		// console.warn('render buttonLayout')
		const arrs=this.props.arrs
		// console.log(arrs)
		return(
			<Spin spinning={this.props.loading}>
				<div style={{width:"340px"}} className="hjt-addressList-listWrap">
					{arrs.map((arr,i)=>
						<div key={'a'+i} className="listItem">
							<StateButton key={i}
								setBtnArr={this.setBtnArr} 
								name={arr.key} 
								grade={arr.grade} 
								show={this.state.showList[arr.key].show || false}
								>
								{arr.content}
							</StateButton>	
							</div>
						)}
				</div>
			</Spin>
			
		)
	}
}

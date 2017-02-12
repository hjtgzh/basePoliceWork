import React, { Component } from 'react'
import {Card,Icon,Popconfirm} from 'antd'

export default class relaCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:'',
      title:'',
      content:'',
    }
    this.showData = this.showData.bind(this)
    this.delData = this.delData.bind(this)
    this.iconClick = this.iconClick.bind(this)
  }
  componentWillMount() {
    const value = this.props.dataSource
    switch(this.props.type){
      case 'alarm':
        this.state.type="jqarr"
        this.state.name='alarm'
        this.state.title="警情"
        this.state.content=value.jjdbh+','+value.bjlb || value.content ||''
        return
      case 'bike':
        this.state.type="ddcarr"
        this.state.name='bike'
        this.state.title="电动车"
        this.state.content=value.clph || value.content ||''
        return
      case 'car':
        this.state.type="jdcarr"
        this.state.name='car'
        this.state.title="机动车"
        this.state.content=value.clph || value.content ||''
        return
      case 'law':
        this.state.type="ajarr"
        this.state.name='law'
        this.state.title="案件"
        this.state.content=value.ajbh+','+value.ajlb1 || value.content ||''
        return
      case 'people':
        this.state.type="ryarr"
        this.state.name='people'
        this.state.title="人员"
        this.state.content=value.xm || value.content ||''
        return
      case 'unit':
        this.state.type="dwarr"
        this.state.name='unit'
        this.state.title="单位"
        this.state.content=value.dwmc || value.content ||''
        return
      case 'address':
        this.state.title="地址"
        this.state.content=value.dzmc || value.content || ''
        return
      case 'room':
        this.state.title='房间'
        this.state.content=value.dzmc || value.content || ''
        return
    }
  }
  showData(e){
    if(this.props.isbind){
      return
    }
    e.stopPropagation()
    e.preventDefault()
    const value = this.props.dataSource
    this.props.showHandle(this.state.name,value)
    console.log('open')
  }
  delData(e){
    const value = this.props.dataSource
    this.props.closeHandle(this.state.type,value.id)
  }
  iconClick(e){
    e.stopPropagation()
    e.preventDefault()
  }
  render(){
    const closeContent=(
      <Popconfirm title="是否删除" onConfirm={this.delData}>
        <Icon type='close' className="relationCard-close" onClick={this.iconClick}/>
      </Popconfirm>
    )
  	return (
      <div className="relationCard" onClick={this.showData}>
    		<Card extra={this.props.isbind?null:closeContent}>
    			<p>{this.state.title}</p>
    			<p>{this.state.content}</p>
    		</Card>
      </div>
  	)
  }
}
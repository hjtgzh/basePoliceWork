import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Input, Button, Tabs, Modal, message, Form, Select, DatePicker } from 'antd'
import ContactAddressModal from 'components/relateAddrModal/relateAddrModal'
import {searchLegalPersonByIdnumber} from 'actions/department'
import { regExpConfig } from 'utils/config'
const FormItem=Form.Item
const Option=Select.Option
const businessRegisterState=[
  {code:'0',name:'未注册'},
  {code:'1',name:'已注册'},
  {code:'2',name:'已注销'}
]

const startBusinessState=[
  {code:'0',name:'不在此处'},
  {code:'1',name:'开在此处'}
]

@connect(
    (state, props) => ({
    })
)
class AddDepartmentModal extends Component{
	constructor(props){
		super(props)
		this.state={
      visible:false,
      addressInfo:{},
      searchLoading:false
    }
    this.confirmContactAddressModal=this.confirmContactAddressModal.bind(this)
    this.showContactAddressModal=this.showContactAddressModal.bind(this)
    this.hideContactAddressModal=this.hideContactAddressModal.bind(this)
    this.onhandleOk=this.onhandleOk.bind(this)
    this.searchLegalPersonByIdnumber=this.searchLegalPersonByIdnumber.bind(this)
	}
  confirmContactAddressModal(addressInfo){
    this.hideContactAddressModal()
    addressInfo.bldid=addressInfo.bldid||addressInfo.buildingcode
    addressInfo.fjid=addressInfo.fjid||addressInfo.roomcode
    this.setState({addressInfo:addressInfo})
    this.props.form.setFieldsValue({realAddress:addressInfo.xzdz})
  }
  showContactAddressModal(){
    this.setState({visible:true})
    this.props.handleFisrtLevelModalHide()
  }
  hideContactAddressModal(){
    this.setState({visible:false})
    this.props.handleFisrtLevelModalShow()
  }
  onhandleOk(){
    this.props.form.validateFields((err,values)=>{
      const addressInfo=this.state.addressInfo
      if(err){
        console.log('error',err)
        return
      }
      // Object.keys(addressInfo).forEach((v,i)=>{
      //   values[v]=addressInfo[v]
      // })
      values={...values,...addressInfo}
      values.openTime=values.openTime?values.openTime._d.toLocaleDateString().replace(/\//g,'-'):''
      this.props.onOk(values)
    })
  }
  searchLegalPersonByIdnumber(){
    var idnumber=this.props.form.getFieldValue('frzjhm')
    if(!idnumber||!regExpConfig.IDcard.test(idnumber)){return}
    this.props.dispatch(searchLegalPersonByIdnumber({sfzh:idnumber},(response)=>{
      this.setState({searchLoading:false})
      if(response.msg!==''){
        message.error('查无此人')
        return
      }
      this.props.form.setFieldsValue({
        'frdb':response.data.xm,
        'frlxdh':response.data.dhhm
      })
    }))
    this.setState({searchLoading:true})
  }
	render(){
		const {onOk,onCancel,visible=true,title='组织机构信息采集'}=this.props
		const {getFieldDecorator}=this.props.form
		const formItemLayout={
			labelCol:{span:5},
			wrapperCol:{span:15},
      hasFeedback:true
		}

		return (
			<Modal 
        onOk={this.onhandleOk}
        onCancel={onCancel}
        className='modal-header modal-body'
        visible={visible}
        title={title}
        confirmLoading={this.props.btnLoading}
      >
			  <FormItem
			    label='机构名称'
			    {...formItemLayout}
			  >
			  {
			  	getFieldDecorator('dwmc',{
            rules:[{required:true,message:'请输入机构名称'}]
          })(
			  	  <Input placeholder="请输入机构名称" maxLength='30'/>
			  	)
			  }
			  </FormItem>
			  <FormItem
          label='实际名称'
          {...formItemLayout}
        >
        {
          getFieldDecorator('sjmc',{})(
            <Input placeholder="请输入实际名称" maxLength='30'/>
          )
        }
        </FormItem>
        <FormItem
          label='机构代码'
          {...formItemLayout}
        >
        {
          getFieldDecorator('dwbm',{
            rules:[{required:true,message:'请输入正确机构代码',pattern:regExpConfig['isNumAlpha']}]
          })(
            <Input placeholder="请输入机构代码" maxLength='30'/>
          )
        }
        </FormItem>
        <FormItem
          label='工商执照代码'
          {...formItemLayout}
        >
        {
          getFieldDecorator('gszzhm',{
            rules:[{required:true,message:'请输入正确的工商执照代码',pattern:regExpConfig['isNumAlpha']}]
          })(
            <Input placeholder="请输入工商执照代码" maxLength='30'/>
          )
        }
        </FormItem>
        <FormItem
          label='实际地址'
          {...formItemLayout}
        >
        {
          getFieldDecorator('realAddress',{})(
            <Input placeholder="点击查询实际地址" readOnly onClick={this.showContactAddressModal}/>
          )
        }
        </FormItem>
        <FormItem
          label='开设日期'
          {...formItemLayout}
        >
        {
          getFieldDecorator('openTime',{})(
            <DatePicker placeholder="请选择开设日期" format={'YYYY-MM-DD'}/>
          )
        }
        </FormItem>
        <FormItem
          label='法人身份证'
          {...formItemLayout}
          style={{position:'relative'}}
        >
        {
          getFieldDecorator('frzjhm',{
            rules:[
              {required:true,message:'请输入正确的法人身份证',pattern:regExpConfig.IDcard},
            ]
          })(
            <Input placeholder="请输入法人身份证"/>
          )
        }
        <Button type='primary' style={{position:'absolute',right:'-81px'}} loading={this.state.searchLoading} onClick={this.searchLegalPersonByIdnumber}>查询</Button>
        </FormItem>
        <FormItem
          label='法人代表'
          {...formItemLayout}
        >
        {
          getFieldDecorator('frdb',{
            rules:[{required:true,message:'请通过法人身份证查询'}]
          })(
            <Input placeholder="请通过法人身份证查询" disabled={true}/>
          )
        }
        </FormItem>
        <FormItem
          label='法人电话'
          {...formItemLayout}
        >
        {
          getFieldDecorator('frlxdh',{})(
            <Input placeholder="请通过法人身份证查询" disabled={true}/>
          )
        }
        </FormItem>
        <FormItem
          label='工商注册情况'
          {...formItemLayout}
        >
        {
          getFieldDecorator('sfzc',{})(
            <Select placeholder="请选择工商注册情况" style={{width:'100%'}}>
            {
              businessRegisterState.map((v,i)=><Option key={i} value={v.code}>{v.name}</Option>)
            }
            </Select>
          )
        }
        </FormItem>
        <FormItem
          label='开业情况'
          {...formItemLayout}
        >
        {
          getFieldDecorator('startBusinessState',{})(
            <Select placeholder="请选择开业情况" style={{width:'100%'}}>
            {
              startBusinessState.map((v,i)=><Option key={i} value={v.code}>{v.name}</Option>)
            }
            </Select>
          )
        }
        </FormItem>
        {
          this.state.visible?
          <ContactAddressModal
            visible={true}
            onOk={this.confirmContactAddressModal}
            onCancel={this.hideContactAddressModal}
          />:null
        }
			</Modal>
		)
	}
}

export default  AddDepartmentModal=Form.create({})(AddDepartmentModal)
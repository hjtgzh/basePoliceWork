/**
 * Created by Administrator on 2016/12/15.
 */


import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Table, Input, Button, Tabs, Modal, message, Form, Select, DatePicker} from 'antd'
const FormItem = Form.Item
const Option = Select.Option

import {
  fetchSearchBySfz,
  fetchBind
} from 'actions/people'
@connect(
  (state, props) => ({
    config: state.config,

  })
)
class GroupSlowlySmallRelated extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
      list: [],
    }

    this.onCancel = this.onCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchLegalPersonByIdnumber = this.searchLegalPersonByIdnumber.bind(this)
    this.searchInfo = this.searchInfo.bind(this)


  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.setState({loading: true})
      console.log('Submit!!!', values);


      this.setState({loading: false})
    });


  }
//根据身份证查询
  searchLegalPersonByIdnumber() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      let idNumber = values.idnumber
      if (idNumber) {
        this.props.dispatch(fetchSearchBySfz({ cyrsfz:idNumber},(reslut)=>{
          this.setState({
            list:reslut.data
          })
        }))
      }
    });
    /* let idNumber = this.props.form.getFieldValue('idnumber')
     if (idNumber) {
     console.log('111')
     }*/
  }
  searchInfo(id){//关联
    const self = this
    return function () {
      self.props.dispatch(fetchBind({ "wpId": id ,'bddwId':self.props.baseId},(result)=>{
        console.log(result)
        if(result.status==1){
          message.success(result.msg)
          console.log(self.props)
          self.onCancel()
        }
      }))
    }
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
  componentDidMount() {

  }
  onCancel() {
    this.props.form.resetFields()
    this.props.onCancel()
    this.setState({
      list:[]
    })
    // this.setState({
    //   visible:false
    // })
  }

  /*  footer() {
   return (
   <div>
   <Button type="primary" onClick={this.handleSubmit}>确定</Button>
   <Button type="" onClick={this.onCancel}>取消</Button>
   </div>
   )
   }*/

  render() {
    const self = this
    const columns = [
      {
        title: '物品名称',
        dataIndex: 'wpmc',
        key: 'wpmc',
      },
      {
        title: '物品种类',
        dataIndex: 'wpzl',
        key: 'wpzl',
      },
      {
        title: '管辖单位	',
        dataIndex: 'gxdw',
        key: 'gxdw',
      },
      {
        title: '持有人	',
        dataIndex: 'wpcyr',
        key: 'wpcyr',
      },
      {
        title: '持有人身份证	',
        dataIndex: 'cyrsfz',
        key: 'cyrsfz',
      },
      {
        title: '操作',
        dataIndex: 'dmxcz',
        key: 'dmxcz',
        render: function (text, record, index) {
          return ( <a onClick={self.searchInfo(record.id)}>关联</a> );
        }
      },

    ];
    const {onOk, onCancel, title = '关联低慢小'}=this.props
    const {getFieldDecorator}=this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15},
      hasFeedback: true
    }

    return (
      <div>

        <Modal onOk={this.props.onOk} onCancel={this.onCancel}
               className='modal-body modal-header ' visible={this.props.visible}
               title={title} footer={false}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label='身份证号码'
              {...formItemLayout}
              style={{position: 'relative'}}
            >
              {
                getFieldDecorator('idnumber', {
                  rules: [{required: true, message: '请输入身份证'}, {validator: this.checkName}]
                })(
                  <Input placeholder="请输身份证"/>
                )
              }
              <Button type='primary' style={{position: 'absolute', right: '-81px'}}
                      loading={this.state.searchLoading}
                      onClick={this.searchLegalPersonByIdnumber}>查询</Button>
            </FormItem>
            {/*<FormItem wrapperCol={{ span: 12, offset: 18 }}>
             <Button className='yu-Btn' type="primary" onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>
             </FormItem>*/}
            <Table
              visible={false}
              columns={columns}
              bordered
              dataSource={this.state.list}
              pagination={false}
              // loading={loading}
              // scroll={scroll}
            />
          </Form>
        </Modal>

      </div>
    )
  }
}

export default  GroupSlowlySmallRelated = Form.create({})(GroupSlowlySmallRelated)
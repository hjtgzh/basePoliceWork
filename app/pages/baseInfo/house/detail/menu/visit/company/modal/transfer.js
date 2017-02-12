import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

import { Button, Form, Input, Select, Modal } from 'antd'
import ModalTable from '../listType/modalTable'

const createForm = Form.create
const FormItem = Form.Item
const Option = Select.Option
import {
  fetchcompanyTransSearch,
} from 'actions/houseVisitCompany'


//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    transSearchListResult: state.transSearchListResult,
  })
)

@Form.create({
  //onFieldsChange(props, items) {
  //  console.log(props)
  //  console.log(items)
  //  // props.cacheSearch(items);
  //},
})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      isFirst: this.props.isFirst,
      list:[
        {
          id: 1,
          company: '宿迁萧山瓜沥重峰旅馆茶楼',
          license: '3301813893409',
          address: '瓜沥友谊路南42号',
          data: '2004-09-22',
          name: '胡丽英',
          phone: '82565372',
          datesource: '警务工作平台',
        },
      ]
    }
    //this.handleSubmit = this.handleSubmit.bind(this)
    this.companySearch = this.companySearch.bind(this)
    this.onInsert = this.onInsert.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
  }

  companySearch(key){
    let param={};
    param[key]=this.props.form.getFieldValue(key)
    this.props.dispatch(fetchcompanyTransSearch(param))
  }

  onInsert(onerecord){
    this.props.handleOkTrans(onerecord)
  }

  footer(){
    return(
      <div>
        <Button size={'large'} onClick={this.props.onCancel}>关闭</Button>
      </div>
    )
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    const {
      visible,
      onCancel,
      transSearchListResult
    }=this.props
    return (
      <Modal
        className="modal-header modal-body"
        size="large"
        visible={visible}
        title='机构名称查询'
        onCancel={onCancel}
        footer={this.footer()}
      >
        <div className="modalcontent">
          <FormItem {...formItemLayout} label="单位名称	">
            {getFieldDecorator('dwmc')(
              <Input  />
            )}
            <a className="secrchmodal-jxy" onClick={this.companySearch.bind(this,'dwmc')}>查询</a>
          </FormItem>
          <FormItem {...formItemLayout} label="工商执照代码	">
              {getFieldDecorator('gszzhm')(
                  <Input  />
              )}
            <a className="secrchmodal-jxy" onClick={this.companySearch.bind(this,'gszzhm')}>查询</a>
          </FormItem>
          <FormItem {...formItemLayout} label="法人代表	">
              {getFieldDecorator('frdb')(
                  <Input  />
              )}
            <a className="secrchmodal-jxy" onClick={this.companySearch.bind(this,'frdb')}>查询</a>
          </FormItem>
          <ModalTable
            dataSource={transSearchListResult.list}
            loading={transSearchListResult.loading}
            onInsert={this.onInsert}
          />
        </div>
      </Modal>
    )
  }
}

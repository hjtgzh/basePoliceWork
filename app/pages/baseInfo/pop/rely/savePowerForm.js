import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  Form, Select, Button, Upload, Icon, Input, Modal
} from 'antd';

import {  
  fetchIDcard,
  fetchRelyPower,
  fetchExportTemplate,
  // updateIDcardQuery, 
} from 'actions/rely'

const FormItem = Form.Item;
const Option = Select.Option;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      // IDcardSearchQuery: state.IDcardSearchQuery,
      IDcardDetailResult: state.IDcardDetailResult,
      addRelyPowerResult: state.addRelyPowerResult,
      //测试数据
      IDcardDetail: [
        {
          id: 1, 
          name: '闫大军', 
          sex: '男', 
          IDcard: '23425454334343534',
          mz: '汉',
          hksx: '新疆省乌鲁木齐',
          hkxz: '扎克乡',
          zdrylx: '重犯',
          sfzt: '是',
          ztsj: '2016-3',
          politics: '群众',
        }
      ],
      // amList: state.amList,
    })   
)
@Form.create({
    onFieldsChange(props, items) {
        console.log(props)
        console.log(items)
        // props.cacheSearch(items);
    },
})
export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      wrongIDcard: false,
    }
  }
  componentDidMount() {
    // console.dir(this.state.list[0])
  }

  valueChange(evt) {
    this.setState({
      value: evt.target.value,
      IDcardDetail: '',
      teamShow: false,
      messengerShow: false,
      cadreShow: false,
    })
  }
  //身份证查询
  IDsearch() {
    console.dir(this.props.IDcardDetail)
    this.setState({

    })
    // this.props.IDsearch(this.state.value)
    this.props.dispatch(fetchIDcard())
    //对身份证号码进行验证
    if(this.props.IDcardDetail != ''){
      this.setState({
        wrongIDcard: true,
      })
    }
  }
  rely(evt) {
    console.log(evt)
    if(evt == '群防群治'){
      this.setState({
        teamShow: true,
        messengerShow: false,
        cadreShow: false
      })
    }
    else if(evt == '治安信息员'){
      this.setState({
        teamShow: false,
        messengerShow: true,
        cadreShow: false
      })
    }
    else if(evt == '社区（村）干部'){
      this.setState({
        teamShow: false,
        messengerShow: false,
        cadreShow: true
      })
    }
    else{
      this.setState({
        teamShow: false,
        messengerShow: false,
        cadreShow: false
      })
    }
  }
  //导出模板
  exportTemplate() {
    console.dir("导出模板")
    this.props.dispatch(fetchExportTemplate())
  }
  rightIDcardFooter() {
    return(<Button type="primary" onClick={this.newIDcardOk.bind(this)}>确定</Button>)
  }
  newIDcardOk() {
    this.setState({
      wrongIDcard: false,
    });
  }
  render() {
    // const { getFieldDecorator } = this.props.form;
    const { 
            IDcardDetailResult, 
            addRelyPowerResult,
            IDcardDetail,
          } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <Modal visible={this.state.wrongIDcard} title="消息"
            onOk={this.newIDcardOk.bind(this)} footer={this.rightIDcardFooter()}
            className="ifSure"
          >
          <p className="isDelete">请输入正确的身份证号码</p>      
        </Modal>       
        <FormItem
          {...formItemLayout}
          label="身份证号"
          hasFeedback
        >
          {
            <div>
              <Input id="IDcard" type="text" ref="myTextInput" onChange={this.valueChange.bind(this)} />
              <Button className="IDcardSearch" type="primary" htmlType="submit" onClick={this.IDsearch.bind(this)}>查询</Button>
            </div>
          }
        </FormItem> 
        <FormItem
          {...formItemLayout}
          label="依靠类型"
          required
        >
          {
            <Select onChange={this.rely.bind(this)} defaultValue="志愿者">
              <Option value="志愿者" selected="selected">志愿者</Option>
              <Option value="群防群治">群防群治</Option>
              <Option value="治安信息员">治安信息员</Option>
              <Option value="社区（村）干部">社区（村）干部</Option>
              <Option value="社会知名人士">社会知名人士</Option>
            </Select>
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="姓名"
          hasFeedback
        >
          {<Input disabled value={this.props.IDcardDetail[0].name} />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
          hasFeedback
        >
          {<Input disabled value={this.props.IDcardDetail[0].sex} />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="身份证号"
          hasFeedback
        >
          {<Input disabled value={this.props.IDcardDetail[0].IDcard} />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="民族"
          hasFeedback
        >
          {<Input disabled value={this.props.IDcardDetail[0].mz} />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="户口省县"
          hasFeedback
        >
          {<Input disabled value={this.props.IDcardDetail[0].hksx} />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="户口详址"
          hasFeedback
        >
          {<Input disabled value={this.props.IDcardDetail[0].hkxz} />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重点人员类型"
          hasFeedback
        >
          {<Input disabled value={this.props.IDcardDetail[0].zdrylx} />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否在逃"
          hasFeedback
        >
          {<Input disabled value={this.props.IDcardDetail[0].sfzt} />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="在逃查询时间"
          hasFeedback
        >
          {<Input disabled value={this.props.IDcardDetail[0].ztsj} />}
        </FormItem>

        <div style={{display: this.state.teamShow ? 'block' : 'none'}}>
          <FormItem
            {...formItemLayout}
            label="使用部位"
            hasFeedback
            required
          >
            {
              <Select placeholder="请选择" defaultValue="志愿者">
                <Option value="志愿者">志愿者</Option>
                <Option value="群防群治">群防群治</Option>
                <Option value="治安信息员">治安信息员</Option>
                <Option value="社区（村）干部">社区（村）干部</Option>
                <Option value="社会知名人士">社会知名人士</Option>
              </Select>
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="人员类别"
            hasFeedback
            required
          >
            {<Input />}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="人员类别"
            hasFeedback
            required
          >
            {<Input />}
          </FormItem>
        </div>

        <div style={{display: this.state.messengerShow ? 'block' : 'none'}}>
          <FormItem
            {...formItemLayout}
            label="信息员类别"
            hasFeedback
            required
          >
            {<Input />}
          </FormItem>
        </div>

        <div style={{display: this.state.cadreShow ? 'block' : 'none'}}>
          <FormItem
            {...formItemLayout}
            label="职务"
            hasFeedback
            required
          >
            {<Input />}
          </FormItem>
        </div>

        <FormItem
          {...formItemLayout}
          label="政治面貌"
        >
          {
            <Select placeholder="请选择" defaultValue="群众">
              <Option value="中国共产党员">中国共产党员</Option>
              <Option value="中国共产党预备员">中国共产党预备员</Option>
              <Option value="中国共产主义青年团">中国共产主义青年团</Option>
              <Option value="中国革命委员会委员">中国革命委员会委员</Option>
              <Option value="中国民主同盟盟员">中国民主同盟盟员</Option>
              <Option value="中国民主建国会会员">中国民主建国会会员</Option>
              <Option value="中国民主促进会会员">中国民主促进会会员</Option>
              <Option value="中国农工民主党党员">中国农工民主党党员</Option>
              <Option value="中国致公党党员">中国致公党党员</Option>
              <Option value="九三学社社员">九三学社社员</Option>
              <Option value="台湾民主自治同盟盟员">台湾民主自治同盟盟员</Option>
              <Option value="无党派民主人士">无党派民主人士</Option>
              <Option value="群众">群众</Option>
              <Option value="民主党派">民主党派</Option>
            </Select>
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话号码"
          hasFeedback
        >
          {<Input placeholder='请输入' />}
        </FormItem><FormItem
          {...formItemLayout}
          label="现住地址"
          hasFeedback
        >
          {<Input placeholder='请输入' />}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工作单位"
          hasFeedback
        >
          {<Input placeholder='请输入' />}
        </FormItem>
        <div className="uploadWrap">
          <Upload name="logo" action="/upload.do" listType="picture" onChange={this.handleUpload}>
            <Button type="primary" className="upload">
              <Icon type="upload" /> 导入
            </Button>
          </Upload>
          <Button type="primary" className="upload" onClick={this.exportTemplate.bind(this)}>导出模板</Button>  
        </div>
      </Form>
    )
  }
};




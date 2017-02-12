import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Form,Input } from 'antd'
import {
  fetchSecurityDetail,
  fetchSecurityAdd
} from 'actions/security'
import Panel from 'components/panel'
import '../style.css'
import moment from 'moment'

const FormItem = Form.Item

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
    securityDetailSearchResult: state.securityDetailSearchResult,
  })
)

@Form.create({
  onFieldsChange(props, items) {
  },
})

// 声明组件  并对外输出
export default class caseReview extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {}
    this.handlesubmit = this.handlesubmit.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.dispatch(fetchSecurityDetail({id:this.props.securityId}))
  }

  //保存
  handlesubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, Values) => {
      if (!err) {
        console.log(Values)
      }
      this.props.dispatch(fetchSecurityAdd({...Values,id:this.props.securityId}, (response)=> {
        this.props.form.resetFields()
      }))
    });
  }

// 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
        width: '5%',
      },
      {
        title: '建筑物地址',
        dataIndex: 'address',
        key: 'address',
        width: '30%',
        render: function (text, record) {
          // debugger
          // console.log(record)
          return (
            <div>
              <Icon type="environment-o left" style={{color:
                record.houseStatus == "完成访查" ? "#0f0" :
                record.houseStatus == "已建房未访查" ? "#f0f" :
                record.houseStatus == "已标注未建房" ? "blue" : "gray"
                }}/>
              <span className="left">{text}</span>
              <Link className="right" to={`/house$Detail/${record.id}`}>详情</Link>
            </div>
          )
        }
      },
      {
        title: '行政区划',
        dataIndex: 'division',
        key: 'division',
        width: '25%',
      },
      {
        title: '管辖单位',
        dataIndex: 'institutions',
        key: 'institutions',
        width: '10%',
      },
      {
        title: '管辖警员',
        dataIndex: 'policeName',
        key: 'policeName',
        width: '10%',
      },
      {
        title: '房屋状态',
        dataIndex: 'houseStatus',
        key: 'houseStatus',
        width: '10%',
      },
      {
        title: '地址属性',
        dataIndex: 'addressType',
        key: 'addressType',
        width: '10%',
      },
    ]
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      securityDetailSearchResult
      } = this.props
    return (
      <div className="nav-second-nextContent">
        <div className="peopleDetail-info">
          <Form>
            <FormItem>
              <table className="table-review-trf">
                <tbody>
                <tr>
                  <td colSpan="2" className="table-review-title-ytt">{securityDetailSearchResult.ajlb}</td>
                </tr>
                <tr>
                  <td>案件编号：</td>
                  <td>{securityDetailSearchResult.ajbh}</td>
                </tr>
                {/*<tr>
                 <td>案件名称：</td>
                 <td>{securityDetailSearchResult.ajbh}</td>
                 </tr>*/}
                <tr>
                  <td>案发时间：</td>
                  <td>{moment(securityDetailSearchResult.fssj).format("YYYY-MM-DD")}</td>
                </tr>
                <tr>
                  <td>案发地点：</td>
                  <td>{securityDetailSearchResult.afdz}</td>
                </tr>
                <tr>
                  <td>简要案情：</td>
                  <td>{securityDetailSearchResult.jyaq}</td>
                </tr>
                <tr>
                  <td>回访记录：</td>
                  <td>
                    {getFieldDecorator('hfjl')(
                      <Input type="textarea" name="hfjl" autosize={{minRows:10,maxRows:14}}></Input>
                    )}
                  </td>
                </tr>
                </tbody>
              </table>
            </FormItem>
          </Form>
        </div>
        <div className="ability-button">
          <Button onClick={this.handlesubmit}>保存</Button>
        </div>
      </div>
    )
  }
}

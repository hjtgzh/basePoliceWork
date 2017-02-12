import React, {Component} from 'react'
import {
  Tabs,
  Row,
  Col,
  Button,
  Icon,
  Table,
  Form,
  Input,
  Select,
  Upload,
  Spin,
  notification,
  Modal,
  DatePicker,
  Popconfirm 
} from 'antd'
import {connect} from 'react-redux'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
import {fetchDeteSmallDetail} from 'actions/people'
import {updateTabList} from 'actions/tabList'
import './visitStyle.css'
// import './style.css'
// 
// 
// 
@connect(
  (state) => ({
    config: state.config,
    dateSmallSearchResult: state.dateSmallSearchResult,
  })
)
export default class detailSmall extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSub: 'list'
    }
  }

  componentDidMount() {
    const peopleId = this.props.peopleId || this.props.params.peopleId || 1
    console.log(this.props);
    if (this.props.params) {
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: `低慢小基本信息`,
        key: `/detailSmall/${peopleId}`,
      }))
    }
    this.props.dispatch(fetchDeteSmallDetail({peopleId: peopleId}))
  }


  render() {
    const {dispatch} = this.props
    const peopleId = this.props.peopleId || this.props.params.peopleId || 1
    const {
        dateSmallSearchResult,
    } = this.props
    const props = {
      action: '/upload.do',
      listType: 'picture',
      defaultFileList: [
        {
          uid: -1,
          name: 'aa.png',
          status: 'done',
        }
      ]
    }
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    return (
      <div className="list-tab" style={{backgroundColor: "#fff"}}>
        <Tabs tabPosition="top" onChange={this._typeChange}>
          <TabPane tab="基础信息" key="list">
            <div className="detail-content">
              <Form style={{marginTop: 20}}>
                <Row gutter={16}>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品名称">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品品牌">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品保管人">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品类型">
                      <Select
                        id="hao"
                        size="large"
                        defaultValue=""
                        onChange={this.handleSelectChange}
                      >
                        <Option value="00">低慢小</Option>
                        <Option value="10">刀具</Option>
                        <Option value="20">易制爆</Option>
                        <Option value="20">危化品</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品来源" style={{marginBottom: 0}}>
                      <Select
                        id="where"
                        size="large"
                        defaultValue=""
                        onChange={this.handleSelectChange}
                      >
                        <Option value="10">自制</Option>
                        <Option value="20">购买</Option>
                        <Option value="30">租用</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="保管人身份证">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="保管人电话">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品责任人">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="责任人身份证">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="责任人电话">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品所属单位">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品存放(封存)地">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品数量" style={{marginBottom: 0}}>
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品用途">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="添加时间" style={{marginBottom: 0}}>
                      <DatePicker/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="添加人">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="备注">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="关联情况">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="是否排查">
                      <Select
                        id="search"
                        size="large"
                        defaultValue=""
                        onChange={this.handleSelectChange}
                      >
                        <Option value="00">是</Option>
                        <Option value="10">否</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品种类">
                      <Select
                        id="where"
                        size="large"
                        defaultValue=""
                        onChange={this.handleSelectChange}
                      >
                        <Option value="10">无人机</Option>
                        <Option value="20">滑翔机</Option>
                        <Option value="30">三角翼</Option>
                        <Option value="40">滑翔伞</Option>
                        <Option value="50">动力伞</Option>
                        <Option value="60">热气球</Option>
                        <Option value="70">飞艇</Option>
                        <Option value="80">航空模型</Option>
                        <Option value="90">空飘气球</Option>
                        <Option value="100">其他低慢小</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="排查时间" style={{marginBottom: 0}}>
                      <DatePicker/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="持有人">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="持有人身份证">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="持有人电话">
                      <Input type="text"/>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="物品状态">
                      <Select
                        id="status"
                        size="large"
                        defaultValue=""
                        onChange={this.handleSelectChange}
                      >
                        <Option value="00">正常使用</Option>
                        <Option value="10">已报废</Option>
                        <Option value="10">已转让</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem {...formItemLayout} label="临时封存">
                      <Select
                        id="where"
                        size="large"
                        defaultValue=""
                        onChange={this.handleSelectChange}
                      >
                        <Option value="10">是</Option>
                        <Option value="20">否</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="24">
                    <FormItem wrapperCol={{span: 12, offset: 11}}>
                      <span> <Button type="primary" onClick={this.peopleSubmit}
                                     style={{float: 'right'}}>修改物品信息</Button>
                               <Popconfirm title="是否删除物品信息？">
                              <Button type="primary" onClick={this.deletedSubmit}
                                     style={{float: 'right',marginRight:5}}>删除物品信息</Button>
                                     </Popconfirm>
                      </span>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>


          </TabPane>
          <TabPane tab="物品照片" key="photo">
            <div style={{backgroundColor: "#fff"}}><Upload{...props}>
              <Button type="ghost">
                <Icon type="upload"/>上传
              </Button>
            </Upload>

            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
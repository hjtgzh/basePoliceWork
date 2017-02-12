/**
 * Created by 余金彪 on 2016/12/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Input, Button, Modal, message, Form} from 'antd'
import {regExpConfig} from 'utils/config'
import {
  fetchBindSlowlyIdnumber,
  fetchSlowlyIdnumber,
  fetchBindSlowlyIdnumberSearch,//低慢小绑定查询
} from 'actions/groupSlowlySmallUnit'
const FormItem = Form.Item
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
    this.searchLegalPersonByIdnumber = this.searchLegalPersonByIdnumber.bind(this)
    this.searchInfo = this.searchInfo.bind(this)
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
        this.props.dispatch(fetchSlowlyIdnumber({cyrsfz: idNumber}, (reslut)=> {
          this.setState({
            list: reslut.data
          })
        }))
      }
    });
  }

  searchInfo(id) {//关联
    const self = this
    return function () {
      self.props.dispatch(fetchBindSlowlyIdnumber({"wpId": id, 'bddwId': this.props.dptId}, (result)=> {
        console.log(result)
        if (result.status == 1) {
          message.success(result.msg)
          console.log(self.props)
          self.onCancel()
          self.props.onOk()
        }
      }))
    }
  }

  onCancel() {
    this.props.form.resetFields()
    this.props.onCancel()
    this.setState({
      list: []
    })
  }

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
    const {title = '关联低慢小'}=this.props
    const {getFieldDecorator}=this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15},
      hasFeedback: true
    }

    return (
      <div>
        <Modal
          onOk={this.props.onOk}
          onCancel={this.onCancel}
          className='modal-body modal-header '
          visible={this.props.visible}
          title={title}
          footer={false}
        >
          <Form>
            <FormItem
              label='身份证号码'
              {...formItemLayout}
              style={{position: 'relative'}}
            >
              {
                getFieldDecorator('idnumber', {
                  rules: [
                    {required: true, message: '请输入身份证'},
                    {pattern: regExpConfig.IDcard, message: '请输入正确的身份证'}
                  ]
                })(
                  <Input placeholder="请输入身份证"/>
                )
              }
              <Button type='primary' style={{position: 'absolute', right: '-81px'}}
                      loading={this.state.searchLoading}
                      onClick={this.searchLegalPersonByIdnumber}>查询</Button>
            </FormItem>
            <Table
              visible={false}
              columns={columns}
              bordered
              dataSource={this.state.list}
              pagination={false}
            />
          </Form>
        </Modal>

      </div>
    )
  }
}

export default  GroupSlowlySmallRelated = Form.create({})(GroupSlowlySmallRelated)
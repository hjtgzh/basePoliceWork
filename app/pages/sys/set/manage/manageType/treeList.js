import React, { Component } from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode

export default class TreeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: ['000'],
      defaultExpandedKeys: ['000'],
    }
    this.handleOnSelect = this.handleOnSelect.bind(this)
  }

  componentDidMount() {
    // debugger
  }

  onExpand = (expandedKeys) => {
    this.setState({ expandedKeys })
  }

  handleOnSelect(info, Nodes) {
    if (Nodes && Nodes.selectedNodes[0] && Nodes.selectedNodes[0].props && Nodes.selectedNodes[0].props.title) {
      const title = Nodes.selectedNodes[0].props.title
      this.props.onSelect(info, title)
    } else {
      this.props.onSelect()
    }
  }

  render() {
    const { trees } = this.props
    const loop = (data = []) => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.id} title={item.deptname}>{loop(item.children)}</TreeNode>
      }
      return <TreeNode key={item.id} title={item.deptname} />
    })
    const treeNodes = loop(trees)

    return (
      <div>
        <Tree
          onSelect={this.handleOnSelect}
          onExpand={this.onExpand}
          defaultExpandedKeys={this.state.defaultExpandedKeys}
        >
          {treeNodes}
        </Tree>
      </div>
    )
  }
}

import React from 'react'

class TodoItem extends React.Component {
  // 子组件如果想和父组件通信，子组件要调用父组件传递过来的方法
  handleDelete = () => { //删除
    const {deleteItem, index,id} = this.props
    deleteItem(index,id)
  }
  handleIsEnd = () => { // 是否完成
    const {handleIsEnd, index,id} = this.props
    handleIsEnd(index,id)
  }
  render() {
    const {content,index,isEnd,id} = this.props
    return (
      <li className="content notification is-primary">
        <label className="checkbox">
        <input
          onChange={this.handleIsEnd}
          checked={isEnd}
          type="checkbox"
        />
            <span className="tag">{index + 1}</span>
            {content}
            <span
              className={isEnd ? 'tag is-info' : 'tag is-warning'}
            >
              {isEnd ? '已完成' : '未完成'}
            </span>
        </label>
          <button onClick={this.handleDelete} className="delete is-small">删除</button>
      </li>
    )
  }
}
export default TodoItem
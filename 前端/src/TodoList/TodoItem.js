import React from 'react'

class TodoItem extends React.Component {

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
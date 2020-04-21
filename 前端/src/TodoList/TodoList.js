import React, { Component, Fragment } from 'react'
import TodoItem from './TodoItem' // 子组件
import './TodoList.scss';
import axios from 'axios'
class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      inputValue: ''
    }
    // 绑定 this对象
  }
  componentDidMount(){
    const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    axios.get('http://localhost:8181/event/findAll')
    .then(function (response) {
      _this.setState({
        list:response.data,
        isLoaded:true
      });
    })
    .catch(function (error) {
      console.log(error);
      _this.setState({
        isLoaded:false,
        error:error
      })
    })
  }
  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  handleClickAdd = () => {
    if (this.state.inputValue === '') {
      console.log('输入错误')
      return 0
    }
    axios.post('http://localhost:8181/event/save', {
      name: this.state.inputValue,
      complete: 0
    })
    .then(function (response) {
      if(response == "success") alert('添加成功')
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState({
      list: [...this.state.list,{
        name:this.state.inputValue,
        isEnd:0
      }],
      inputValue:''
    })
    

  }
  // 父组件通过属性的形式向子组件传递参数
  // 子组件通过props接收父组件传递过来的参数


  render() {
      let EndNum = this.state.list.filter(item => item.complete === 1)
      console.log(this.state.list)
      return (
        <Fragment>
          <div className='container ContentBox'>
            <section className="hero is-primary">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    TodoList
                  </h1>
                </div>
              </div>
            </section>
            <div className="notification action">
              <input
                type="text"
                className="input is-primary"
                value={this.state.inputValue}
                onChange={this.handleInputChange}
              />
              <button className="button is-primary" onClick={this.handleClickAdd}>add</button>
            </div>
            <ul className="notification list">{this.getTodoItem()}</ul>
            <footer className="footer">
              <p>共有:{this.state.list.length} 件事情</p>
              <p>已完成：{EndNum.length}</p>
              <p>未完成：{this.state.list.length - EndNum.length}</p>
            </footer>
          </div>
        </Fragment>
      )
  }
}
export default TodoList
import React, { Component, Fragment } from 'react'
// import React from 'react';
import { shallow } from 'enzyme';
import TodoItem from '../TodoList/TodoItem';
import TodoList from '../TodoList/TodoList';
import Adapter from 'enzyme-adapter-react-16';
  // 模拟 props
  const props = {
    list: ['test1','test2','test3'],//传入的初始化数据
    // Jest 提供的mock 函数
    handleDelete: jest.fn(),//测试删除方法
    handleIsEnd: jest.fn(),//测试完成方法
    handleClickAdd: jest.fn(),
    handleInputChange: jest.fn()
  };

const setup = () => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<TodoItem {...props} />)
  return {
    props,
    wrapper
  }
};

const setupByRender = () => {
  const wrapper = render(<TodoItem {...props} />);
  return {
    props,
    wrapper,
  };
};

const setupByMount = () => {
  const wrapper = mount(<TodoItem {...props} />);
  return {
    props,
    wrapper,
  };
};
//判断是否生成了按钮，主要用来判断是否成功渲染
it('should has add clickButton', () => {
  const { wrapper } = setup();
  expect(wrapper.find('button is-primary').length).toBe(1);
});
//检测否生成了任务
it('should render task equal', () => {
  const { wrapper } = setupByMount();
  wrapper.find('.notification list').forEach((index) => {
    expect(node.text()).toBe(wrapper.props().list[index])
  });
});
//检测是否删除，通过toBeCalled的回调来看
it('click button to be cancled', () => {
  const { wrapper } = setupByMount();
  wrapper.find('Button').at(0).simulate('click');
  expect(props.handleDelete).toBeCalled();
});

//检测是否完成，通过toBeCalled的回调来看
it('click tasks to be done', () => {
  const { wrapper } = setupByMount();
  wrapper.find('TodoItem checkbox').at(0).simulate('click');
  expect(props.handleIsEnd).toBeCalled();
});

//检测手动添加数据是否能够成功
it('click add button  to add task', () => {
  const { wrapper } = setupByMount();
  const mockEvent = {
    keyCode: 13, // enter 事件
    target: {
      value: 'Test'
    }
  }
  wrapper.find('TodoList input').at(0).simulate('keyup',mockEvent);
  wrapper.find('TodoItem checkbox').at(0).simulate('click');
  expect(props.handleIsEnd).toBeCalled();
});

//传入数据'test'
test('task add',()=>{
  const { wrapper } = setup();
  const item = shallow(<TodoItem content="test"/>); 
  expect(item.hasClass('content notification is-primary')).toBe(true)//判断是否有生成了事务
});

test('task get',()=>{
  const item = shallow(<TodoItem content="test"/>); //传入数据'test'
  expect(item.hasClass('content notification is-primary')).toBe(true)//判断是否有生成了事务
});

test('task Clicked',()=>{
  const { wrapper } = setupByMount();
  wrapper.find('delete is-small').at(0).simulate('click');
  expect(props.deleteTodo).toBeCalled();

  const item = shallow(<Item item="test" />)

  item.simulate('click')//对该事务进行点击操作
  expect(item.hasClass('tag is-info')).toBe(true)//事务是否变成了已完成字样
});

it('test delete functin ', () => {
  // 通过 Enzyme 提供的 simulate api 模拟 DOM 事件,//点击删除按钮
  wrapper.find('.delete is-small').simulate('click')
  // 判断 props.handleDelete 是否被调用
  expect(props.handleDelete).toBeCalled()
});

it('test complete functin ', () => {
  // mock input 输入和 Enter事件
  const mockEvent = {
    keyCode: 13, // enter 事件
    target: {
      value: 'jest test'
    }
  }
  // 通过 Enzyme 提供的 simulate api 模拟 DOM 事件
  wrapper.find('input').simulate('keyup',mockEvent)
  wrapper.find('.button is-primary').simulate('click')
  // 判断 props.onAddClick 是否被调用
  expect(props.handleInputChange).toBeCalled()
});


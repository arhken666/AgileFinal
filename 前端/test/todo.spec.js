describe('Todo List e2e test', function () {
    let page;
    let newTaskContent;

    before (async function () {
      page = await browser.newPage();//启动浏览器
      let random = new Date().getMilliseconds();
      newTaskContent = 'test for event';
      await page.goto('http://127.0.0.1:3000/');//访问域名
    });
  
    after (async function () {
      await page.close();
    });

    it('correct title', async function() {//测试页面head内容是否和html的head内容对应
        expect(await page.title()).to.eql('React App');
    });

    describe('add task', function () {
        it('create new event', async function() {
            await page.waitFor('.button is-primary');//等待此按钮的刷新出来
            let originalItemsCount = await page.$$('.notification list').then(item => item.length);//计算此页面目前的任务数量

            await page.type('.input is-primary', newTaskContent);//自动键入内容
            await page.click('.button is-primary');//点击增加任务按钮
            let newTask = await page.waitFor('.notification list.notification list:nth-child('+ (originalItemsCount + 1) +')');//得到总数加1的那个数据
            const expectInputContent = await page.evaluate(newTask => newTask.querySelector('content notification is-primary').textContent, newTask);
            expect(expectInputContent).to.eql(newTaskContent);//进行对比
          });
    });

    describe('ensure task', function () {//点击任务之后显示是否完成或者取消的测试
        it('ensure task', async function() {
            await page.waitFor('.notification list');//等待任务的class刷新出来
            await page.click('.content notification is-primary');//点击任务
            const expectInputContent = await page.evaluate(newTask => newTask.querySelector('tag is-info').textContent, newTask);//点击以后显示已完成
            expect(expectInputContent).to.eql('已完成');//进行对比
          });
    });

    describe('edit task', function () {
        it('should update task', async function() {
            const updatedContent = 'updated content';//更新的内容

            await page.click('content notification is-primary .edit-button');//找到更新按钮
            const textareaElement=await page.$('.notification list:last-child textarea');//在最新添加的任务中找到文本框
            await textareaElement.click( {clickCount: 3})//点击次数
            await textareaElement.type(updatedContent);//键入更新内容
            await page.$eval('.notification list:last-child textarea', textarea => textarea.blur());

            let theLastItem = await page.waitFor('.task-items .task-item:last-child');//定义变量等于最后一个任务
            const expectInputContent = await page.evaluate(task => task.querySelector('textarea').textContent, theLastItem);
            expect(expectInputContent).to.eql(updatedContent);//判断相等
          });
    });

    describe('delete task', function () {
        it('delete task', async function() {
            await page.waitFor('.delete is-small');//等待删除按钮出现
            let originalItemsCount = await page.$$('.task-item').then(item => item.length);//获取任务总量

            await page.click('.notification list:last-child .delete is-small');
            await page.waitFor(500);//等待一个删除过程避免太快，导致下面判断出错

            let itemsCount = await page.$$('.task-item').then(item => item.length);
            expect(originalItemsCount - itemsCount).to.eql(1);//剩余的和总量相减为1，代表减少了一个任务
          });
    });

  });
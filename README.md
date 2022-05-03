# sequence-async-func
并发的异步函数，包装成顺序的执行。场景为防止反爬虫的检测。


### 同步函数示例
```
let s = new SequenceAsyncFunc(console.log,1000);
[1,2,3,4,5].forEach(v=>s(v))
```

### 异步函数示例
```
let qcc = new QccService();
let queryInfo = new SequenceAsyncFunc(qcc.queryInfo,500, {
            pre: (name) => {
                appendLogger('企查查：' + name);
            },
            post: (info, name) => {
                let tableInfo = Object.keys(info).map(v => `<span style="padding-left:20px;"><strong>` + v + `</strong>：` + info[v] + `</span>`).join('');
                appendLogger(tableInfo);
            }
        });

"A公司|B有限公司|C有限公司|D有限公司".split('|').forEach(async v=>{
  let result = await queryInfo(v);
  console.log(result);
})
```

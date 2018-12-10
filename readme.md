##  简单介绍

 ### modal
 
 * 1.使用 js template 把模板和行为分离
 * 2.使用构造函数生成新的modal对象
 * 3.使用代理,把方法代理到对象上
 * 4.使用观察者模式,触发行为方法
 * 5.其他实现方式 webcomponent 等
 
 ### 使用说明
 
 ```javascript
    import Model from './model';
    let myModel = new Model(element,{
        
    })
    
```

  ### 属性值
  
  属性  | 类型(可选值) | 是否必须  
   ------------- | ------------- | ---
  template | string                       | true  |
  mode     | string(custom,confirm,alert) | false |  
  text     | string                       | false |
  success  | function                     | false |
  close    | function                     | false |

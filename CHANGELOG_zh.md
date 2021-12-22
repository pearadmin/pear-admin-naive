## [1.0.2](https://github.com/pearadmin/pear-admin-naive/releases/tag/1.0.2) (2021-12-20)

### Optimize
* **composables:**  优化 `useForm` 、` useTable `
* **useApi:** 新增设置 redo:true时,可指定 `debounce` 为number(ms)来开启函数节流请求 
* **useTableRequest:** 新增设置 redo:true时,可指定 `debounce` 为number(ms)来开启函数节流请求 

### Refactor
* **Component** 修改PearForm, PearTable内部注册组件的方式，修正开发模式下，热更新后不渲染的问题

### Feature
* **PearForm** PearFormItem支持函数式props传递
* **PearTable** PearTable查询表头新增`收起`、`展开`功能
* **pages:**  basisFormDemo页面优化，新增自定义查询表头功能，查询表头支持参数改变后自动请求功能


## [1.0.1](https://github.com/pearadmin/pear-admin-naive/releases/tag/1.0.1) (2021-12-15)

### Feature
* **composables:**  优化 `useContext`, 在`layout` 和 `BasicTable`使用
* **layout:**  移动端展示支持

## [1.0.0](https://github.com/pearadmin/pear-admin-naive/releases/tag/1.0.0) (2021-12-04)

* 初始化项目

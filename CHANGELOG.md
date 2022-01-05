## [1.0.3](https://github.com/pearadmin/pear-admin-naive/releases/tag/1.0.3) (2022-01-05)
### Feature
* **Docs** add docs site
* **PearForm**  more feature with `PearForm` demo
* **Route** add `lateral route mode` in router
* **ErrorPage** add `404`, `403`, `500` error pages
* **useApi:** setting `redo:true` with `hooks: useApi`, can specify `debounce` as number(ms) to enable function throttling requests 
* **useTableRequest:** setting `redo:true` with `tableHooks: useTableRequest`, can specify `debounce` as number(ms) to enable function throttling requests
* **routeTabs** add `close left`, `close right`, `close other` feature in RouteTab

### Fix
* **PageWrapper** fix `PageWrapper` only has default slot letTopRight padding

## [1.0.2](https://github.com/pearadmin/pear-admin-naive/releases/tag/1.0.2) (2021-12-20)

### Optimize
* **composables:**  optimize `useForm` 、` useTable `

### Refactor
* **Component** Modify the way to register components inside `PearForm`, `PearTable` to fix the problem of not rendering after hot update in development mode

### Feature
* **PearForm** `PearFormItem` supports functional props passing
* **PearTable** PearTable query table header adds `pick up` and `expand` feature
* **pages:**  `BasisFormDemo` page optimization, new custom query table header function, query table header support automatic request function after parameter change

## [1.0.1](https://github.com/pearadmin/pear-admin-naive/releases/tag/1.0.1) (2021-12-15)

### Feature
* **composables:**  Optimize `useContext`, used it in `layouts` Component and `BasicTable` Component
* **layout:**  Mobile view Support

## [1.0.0](https://github.com/pearadmin/pear-admin-naive/releases/tag/1.0.0) (2021-12-04)

* init project

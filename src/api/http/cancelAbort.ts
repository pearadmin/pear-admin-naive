const controller = new AbortController() // 创建一个控制器
const { signal } = controller

signal.addEventListener('abort', () => {
  // console.log('aborted!')
})

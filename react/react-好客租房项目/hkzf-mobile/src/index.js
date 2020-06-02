import React from 'react';
import ReactDOM from 'react-dom';

// 导入 antd-mobile 样式
// import 'antd-mobile/dist/antd-mobile.css';

// 导入字体图标库的样式文件
import './assets/fonts/iconfont.css'

// 导入 react-virtualized 组件的样式
import 'react-virtualized/styles.css'

// 注意：应该将 组件的导入放在样式导入后面，从而避免样式覆盖的问题
import App from './App';

// 注意，我们自己写的全局样式需要放在组件库样式后面导入，这样，样式才会覆盖生效，因为，后面的样式会覆盖前面同名的样式
import './index.css';

ReactDOM.render(<App />,document.getElementById('root'))

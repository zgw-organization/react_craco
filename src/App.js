import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from 'react';
import routes from '@/router';


function App() {

  // 这是的GetRoutes是函数组件首字母要大写
  const GetRoutes = () => useRoutes(routes);

  // Suspense 为路由懒加载内容
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading</h2>}>
        <GetRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

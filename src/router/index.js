import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthRoute from '@/components/authRoute';
import GeekLayout from '@/pages/layout';
import Login from '@/pages/login';
const Home = lazy(() => import('../pages/home'));
const Article = lazy(() => import('../pages/article'));
const Publish = lazy(() => import('../pages/publish'));

// 局部添加懒加载组件<Suspense><Home /></Suspense>


const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element:
      <AuthRoute>
        <GeekLayout />
      </AuthRoute>,
    children: [
      {
        index: true,
        element: <Navigate to={"home"} />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      }
    ]
  },
  {
    path: "*",
    element: <p>ERROR-PAGE;</p>
  }
];

export default routes;
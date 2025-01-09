import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Posts } from './pages/Posts'
import { AddEditPost } from './pages/AddEditPost'
import { Auth } from './pages/Auth'
import { NotFound } from './pages/NotFound'
import { PwReset } from './pages/PwReset'
import { Profile } from './pages/Profile'
import { Home } from './pages/Home'
import { Admin } from './pages/Admin'
import { Header } from './components/Header'
import Detail from './components/Detail'

const router = createBrowserRouter([
  {element: <Header />,
    children: [
      {path: '/', element: <Home />},
      {path: '/posts',element: <Posts />},
      {path: '/create',element: <AddEditPost />},
      {path: '/update/:id',element: <AddEditPost />},
      {path: '/auth/in',element: <Auth />},
      {path: '/auth/up',element: <Auth />},
      {path: '/pwreset',element: <PwReset />},
      {path: '/profile',element: <Profile />},
      {path: '/admin',element: <Admin />},
      {path:'/post/:id', element:<Detail />},
      {path: '*',element: <NotFound />}
    ]
  }
],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  }
)

function App() {

  return (
    <div>
      <RouterProvider router={router} future={{v7_startTransition: true}}/>
    </div>
  )
}

export default App

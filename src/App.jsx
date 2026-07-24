import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Gallery from './pages/Gallery.jsx'
import EssayDetail from './pages/EssayDetail.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Gallery />} />
        <Route path="ensayo/:id" element={<EssayDetail />} />
        <Route path="sobre" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

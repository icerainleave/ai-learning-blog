import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;

import "./index.css";
import { Navigate, Route, Routes } from "react-router";
import BlogPostPage from "./pages/BlogPostPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="blog/:slug" element={<BlogPostPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

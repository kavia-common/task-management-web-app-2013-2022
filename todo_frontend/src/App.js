import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import './styles/common.css';
import './styles/TODO_PAGE.css';
import './styles/EDIT_TODO.css';
import './styles/ADD_TODO.css';
import './styles/COMPLETED_TASK.css';
import { TodosProvider } from './context/TodosContext';
import TodoPage from './pages/TodoPage';
import AddTodoPage from './pages/AddTodoPage';
import EditTodoPage from './pages/EditTodoPage';
import CompletedPage from './pages/CompletedPage';

// PUBLIC_INTERFACE
function AppContainer() {
  /** Root container setting up providers and routes */
  return (
    <TodosProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/add" element={<AddTodoPage />} />
          <Route path="/edit/:id" element={<EditTodoPage />} />
          <Route path="/completed" element={<CompletedPage />} />
          {/* Fallback */}
          <Route path="*" element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </TodosProvider>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Wrapper to allow future top-level providers if needed */
  return <AppContainer />;
}

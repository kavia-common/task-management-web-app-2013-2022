import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../context/TodosContext';
import StatusBar from '../components/StatusBar';
import AppBar from '../components/AppBar';
import TodoCard from '../components/TodoCard';

// PUBLIC_INTERFACE
export default function TodoPage() {
  /** Home screen showing all todos with filter and actions */
  const { todos, deleteTodo, toggleComplete } = useTodos();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' | 'completed'

  const visible = useMemo(() => {
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  const onEdit = (id) => navigate(`/edit/${id}`);
  const onDelete = (id) => {
    if (window.confirm('Delete this to-do?')) deleteTodo(id);
  };
  const onToggle = (id) => toggleComplete(id);

  return (
    <main className="screen screen--todo" role="main" aria-label="TODO PAGE screen">
      <div className="todo-bg-rect" aria-hidden="true"></div>
      <StatusBar />
      <AppBar title="TODO APP" showCalendar />

      <section className="todos" role="list" aria-label="To-do items" aria-live="polite">
        {visible.map(t => (
          <TodoCard
            key={t.id}
            todo={t}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </section>

      <button className="fab" id="fab-add" aria-label="Add new to-do" title="Add" onClick={() => navigate('/add')}>
        <i className="plus" aria-hidden="true"></i>
      </button>

      <nav className="bottom-nav" role="navigation" aria-label="Bottom navigation">
        <div
          className="nav-item all"
          data-filter="all"
          data-active={filter === 'all' ? 'true' : 'false'}
          tabIndex={0}
          role="button"
          aria-pressed={filter === 'all' ? 'true' : 'false'}
          aria-label="Filter: All"
          onClick={() => setFilter('all')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFilter('all'); } }}
        >
          <div className="nav-icon" aria-hidden="true">☰</div>
          <span className="nav-label typo-6">All</span>
        </div>
        <div
          className="nav-item completed"
          data-filter="completed"
          data-active={filter === 'completed' ? 'true' : 'false'}
          tabIndex={0}
          role="button"
          aria-pressed={filter === 'completed' ? 'true' : 'false'}
          aria-label="Filter: Completed"
          onClick={() => setFilter('completed')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFilter('completed'); } }}
        >
          <div className="nav-icon" aria-hidden="true">✔</div>
          <span className="nav-label typo-7">Completed</span>
        </div>
      </nav>
    </main>
  );
}

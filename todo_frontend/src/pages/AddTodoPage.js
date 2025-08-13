import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import AppBar from '../components/AppBar';
import { useTodos } from '../context/TodosContext';

// PUBLIC_INTERFACE
export default function AddTodoPage() {
  /** Add todo screen following the design layout; uses underlined inputs. */
  const { addTodo } = useTodos();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const onAdd = () => {
    if (!title.trim()) return;
    const id = addTodo(title.trim(), detail.trim());
    navigate(`/edit/${id}`); // optional: navigate to edit or back home
  };

  return (
    <main className="screen screen--add-todo" role="main" aria-label="ADD TODO screen">
      <StatusBar />
      <AppBar title="Add Task" showBack />

      <section className="fields" aria-label="Add fields">
        <div className="field title-field">
          <label className="label typo-11" htmlFor="add-title">Title</label>
          <input
            id="add-title"
            aria-label="Title"
            className="field-input"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className="underline" aria-hidden="true"></div>
        </div>

        <div className="field detail-field">
          <label className="label typo-11" htmlFor="add-detail">Detail</label>
          <input
            id="add-detail"
            aria-label="Detail"
            className="field-input"
            type="text"
            value={detail}
            onChange={e => setDetail(e.target.value)}
          />
          <div className="underline" aria-hidden="true"></div>
        </div>
      </section>

      <div className="actions" role="group" aria-label="Actions">
        <button id="add-submit-btn" className="btn" aria-label="Add task" title="Add" onClick={onAdd}>
          <span className="btn-label typo-12">ADD</span>
        </button>
      </div>
    </main>
  );
}

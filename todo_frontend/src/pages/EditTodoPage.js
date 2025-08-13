import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import AppBar from '../components/AppBar';
import { useTodos } from '../context/TodosContext';

// PUBLIC_INTERFACE
export default function EditTodoPage() {
  /** Edit todo screen using tokens and underlined inputs. */
  const { id } = useParams();
  const { getById, updateTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  useEffect(() => {
    const t = getById(id);
    if (t) {
      setTitle(t.title);
      setDetail(t.detail);
    } else {
      // if not found, return home
      navigate('/');
    }
  }, [id, getById, navigate]);

  const onUpdate = () => {
    if (!id) return;
    updateTodo(id, { title: title.trim() || 'Untitled', detail: detail.trim() });
    navigate('/');
  };

  const onCancel = () => navigate(-1);

  return (
    <main className="screen screen--edit-todo" role="main" aria-label="EDIT TODO screen">
      <StatusBar />
      <AppBar title="Edit Task" showBack />

      <section className="fields" aria-label="Edit fields">
        <div className="field title-field">
          <label className="label typo-11" htmlFor="edit-title">Title</label>
          <input
            id="edit-title"
            aria-label="Title"
            className="field-input"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className="underline" aria-hidden="true"></div>
        </div>

        <div className="field detail-field">
          <label className="label typo-11" htmlFor="edit-detail">Detail</label>
          <input
            id="edit-detail"
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
        <button id="edit-update-btn" className="btn btn-accent" aria-label="Update task" title="Update" onClick={onUpdate}>
          <span className="btn-label typo-13">Update</span>
        </button>
        <button id="edit-cancel-btn" className="btn btn-accent" aria-label="Cancel editing" title="Cancel" onClick={onCancel}>
          <span className="btn-label typo-13">Cancel</span>
        </button>
      </div>
    </main>
  );
}

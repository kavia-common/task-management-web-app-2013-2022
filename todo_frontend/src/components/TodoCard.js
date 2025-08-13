import React from 'react';

// PUBLIC_INTERFACE
export default function TodoCard({ todo, onEdit, onDelete, onToggle }) {
  /** A to-do card with edit, delete, and complete actions (as in TODO page design). */
  return (
    <article className="todo-card" role="listitem" data-completed={todo.completed ? 'true' : 'false'}>
      <div className="todo-titles">
        <span className="todo-title typo-9">{todo.title}</span>
        <span className="todo-subtitle typo-10">{todo.detail}</span>
      </div>
      {onEdit && (
        <button className="todo-icon pencil icon-btn" aria-label="Edit to-do" title="Edit" onClick={() => onEdit(todo.id)}>
          <span aria-hidden="true">✎</span>
        </button>
      )}
      {onDelete && (
        <button className="todo-icon trash icon-btn" aria-label="Delete to-do" title="Delete" onClick={() => onDelete(todo.id)}>
          <span aria-hidden="true">🗑</span>
        </button>
      )}
      {onToggle && (
        <button className="todo-icon check icon-btn" aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'} title="Complete" onClick={() => onToggle(todo.id)}>
          <span aria-hidden="true">✓</span>
        </button>
      )}
    </article>
  );
}

import React, { useMemo } from 'react';
import { useTodos } from '../context/TodosContext';
import StatusBar from '../components/StatusBar';
import AppBar from '../components/AppBar';

// PUBLIC_INTERFACE
export default function CompletedPage() {
  /** Completed tasks screen; simplified cards without action icons to match design */
  const { todos } = useTodos();
  const completed = useMemo(() => todos.filter(t => t.completed), [todos]);

  return (
    <main className="screen screen--completed-task" role="main" aria-label="COMPLETED TASK screen">
      <div className="completed-bg-rect" aria-hidden="true"></div>
      <StatusBar />
      <AppBar title="Completed Task" showBack />

      <section className="todos" role="list" aria-label="Completed to-do items">
        {completed.map(t => (
          <article key={t.id} className="todo-card" role="listitem">
            <div className="todo-titles">
              <span className="todo-title typo-9">{t.title}</span>
              <span className="todo-subtitle typo-10">{t.detail}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

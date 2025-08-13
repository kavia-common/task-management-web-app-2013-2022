import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const STORAGE_KEY = 'todos';

// Types
/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} title
 * @property {string} detail
 * @property {boolean} completed
 * @property {number} createdAt
 */

const initialState = {
  todos: [],
};

function seedTodos() {
  /** Seed a few todos for first run to match design screens */
  const now = Date.now();
  return [
    { id: cryptoRandomId(), title: 'TODO TITLE', detail: 'TODO SUB TITLE', completed: false, createdAt: now - 30000 },
    { id: cryptoRandomId(), title: 'TODO TITLE', detail: 'TODO SUB TITLE', completed: false, createdAt: now - 20000 },
    { id: cryptoRandomId(), title: 'TODO TITLE', detail: 'TODO SUB TITLE', completed: false, createdAt: now - 10000 },
  ];
}

function cryptoRandomId() {
  try {
    return window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Math.random().toString(16).slice(2)}-${Date.now()}`;
  } catch {
    return `${Math.random().toString(16).slice(2)}-${Date.now()}`;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT': {
      return { ...state, todos: action.payload };
    }
    case 'ADD': {
      const todo = /** @type {Todo} */ (action.payload);
      return { ...state, todos: [...state.todos, todo] };
    }
    case 'UPDATE': {
      const { id, update } = action.payload;
      return {
        ...state,
        todos: state.todos.map(t => (t.id === id ? { ...t, ...update } : t)),
      };
    }
    case 'DELETE': {
      const id = action.payload;
      return { ...state, todos: state.todos.filter(t => t.id !== id) };
    }
    case 'TOGGLE': {
      const id = action.payload;
      return {
        ...state,
        todos: state.todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
      };
    }
    default:
      return state;
  }
}

const TodosContext = createContext(null);

// PUBLIC_INTERFACE
export function useTodos() {
  /**
   * Access Todos context.
   * Returns: { todos, addTodo, updateTodo, deleteTodo, toggleComplete, getById }
   */
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error('useTodos must be used within TodosProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function TodosProvider({ children }) {
  /**
   * Provider for todos state with localStorage persistence.
   */
  const [state, dispatch] = useReducer(reducer, initialState);

  // Init from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data)) {
          dispatch({ type: 'INIT', payload: data });
          return;
        }
      }
      const seeded = seedTodos();
      dispatch({ type: 'INIT', payload: seeded });
    } catch {
      dispatch({ type: 'INIT', payload: seedTodos() });
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
    } catch {
      // ignore persistence errors
    }
  }, [state.todos]);

  const value = useMemo(() => {
    return {
      todos: state.todos,
      // PUBLIC_INTERFACE
      addTodo: (title, detail) => {
        /** Add a new todo */
        const todo = { id: cryptoRandomId(), title: (title || '').trim(), detail: (detail || '').trim(), completed: false, createdAt: Date.now() };
        dispatch({ type: 'ADD', payload: todo });
        return todo.id;
      },
      // PUBLIC_INTERFACE
      updateTodo: (id, update) => {
        /** Update properties of a todo by id */
        dispatch({ type: 'UPDATE', payload: { id, update } });
      },
      // PUBLIC_INTERFACE
      deleteTodo: (id) => {
        /** Delete todo by id */
        dispatch({ type: 'DELETE', payload: id });
      },
      // PUBLIC_INTERFACE
      toggleComplete: (id) => {
        /** Toggle completion state of a todo */
        dispatch({ type: 'TOGGLE', payload: id });
      },
      // PUBLIC_INTERFACE
      getById: (id) => {
        /** Get a todo by id */
        return state.todos.find(t => t.id === id) || null;
      },
    };
  }, [state.todos]);

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

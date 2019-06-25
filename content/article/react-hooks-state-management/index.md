---
author: "Theo"
date: 2019-06-25
title: "Best ways to use React Hooks for state management"
summary: "How can we actually use React Hooks for state management?"
weight: -40
tags: [
    "typescript",
    "react",
    "javascript"
]
categories: [
   "typescript",
   "development"
]
---

React Hooks have been around in a while so I've taken the opportunity to explore how we can handle state management with them. My aim is to understand what works and what doesn't when we plan to use them in practice and at scale. 

I've reviewed some options and techniques that are out the wild together with some explanations and criticisms. You can find some of those examples in this [GitHub Repo](https://github.com/theodesp/react-hook-state-management).


{{< header title="Base Example" >}}

Before we start let's describe the initial components that we are going to use in the subsequent sections.

Let's say we have a Todo application. We have the following simplified structure of containers and components:

First is the `Header` that contains the input form for the TodoList.

{{< code-block typescript >}}
type HeaderProps = {
  addTodo?: (text: string) => void;
}

const Header = ({ addTodo }: HeaderProps ) => {
  const onSave = (text: string) => {
    if (text.length !== 0) {
      addTodo && addTodo(text);
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo={true}
        onSave={onSave}
        placeholder="Tell me what you want to do!"
      />
    </header>
  )
}
{{< /code-block >}}

Where:

{{< code-block typescript >}}
type TodoTextInputProps = {
  text?: string
  editing?: boolean;
  placeholder?: string;
  onSave: (text: string) => void;
  newTodo: boolean;
}
type TodoTextInputState = {
  text: string;
}

export class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState> {
  state = {
    text: this.props.text || ''
  };

  handleSubmit = (e: React.KeyboardEvent<any>) => {
    const text = e.currentTarget.value.trim();
    if (e.which === 13) { // Enter Key
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ text: e.currentTarget.value });
  };

  handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    if (!this.props.newTodo) {
      this.props.onSave(e.currentTarget.value);
    }
  };

  render() {
    return (
      <input
        className={classnames({
          edit: this.props.editing,
          "new-todo": this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}
{{< /code-block >}}

Then we have the `MainSection` where we display the Todos:

{{< code-block typescript >}}
type MainSectionProps = {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    editTodo: (id: number, text: string) => void;
    toggleTodo: (id: number) => void;
  }

  const MainSection = ({
    todos,
    deleteTodo,
    editTodo,
    toggleTodo,
  }: MainSectionProps) => {
    return (
      <section className="main">
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
        />
      </section>
    );
  };

type TodoListProps = MainSectionProps

  const TodoList = ({ todos, editTodo, deleteTodo, toggleTodo }: TodoListProps) => (
    <ul className="todo-list">
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
{{< /code-block >}}

Where:

{{< code-block typescript >}}
type TodoItemProps = Pick<MainSectionProps, 'toggleTodo' | 'deleteTodo' | 'editTodo'> & {
    todo: Todo;
  }
  type TodoItemPropsState = {
    editing: boolean;
  }

  export class TodoItem extends React.Component<TodoItemProps, TodoItemPropsState> {
    state = {
      editing: false
    };
  
    handleDoubleClick = () => {
      this.setState({ editing: true });
    };
  
    handleSave = (id: number, text: string) => {
      if (text.length === 0) {
        this.props.deleteTodo(id);
      } else {
        this.props.editTodo(id, text);
      }
      this.setState({ editing: false });
    };
  
    render() {
      const { todo, toggleTodo, deleteTodo } = this.props;
  
      let element;
      if (this.state.editing) {
        element = (
          <TodoTextInput
            text={todo.text}
            editing={this.state.editing}
            onSave={text => this.handleSave(todo.id, text)}
            newTodo={false}
          />
        );
      } else {
        element = (
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
            <button className="destroy" onClick={() => deleteTodo(todo.id)} />
          </div>
        );
      }
  
      return (
        <li
          className={classnames({
            completed: todo.completed,
            editing: this.state.editing
          })}
        >
          {element}
        </li>
      );
    }
  }
{{< /code-block >}}

This code is very typical that you can find on any TodoMVC example online. Notice that we defer any logic to higher components using callbacks.

Let's see now the most popular ways that you can use React hooks for state management.

### **Custom Hook State**

This is the most straightforward way. We provide a [Custom Hook](https://reactjs.org/docs/hooks-custom.html) that will offer all the necessary business logic that the container needs, for example:

{{< code-block typescript >}}
type Todo = {
  id: number;
  completed: boolean;
  text: string;
}

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text
      }
    ]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text } : todo)));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return [
    todos,
    {
      addTodo,
      deleteTodo,
      editTodo,
      toggleTodo,
    }
  ];
};

const App = () => {
  const [
    todos,
    { addTodo, deleteTodo, editTodo, toggleTodo }
  ]: any = useTodos();

  return (
    <div>
      <Header addTodo={addTodo} />
      <MainSection
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
};
{{< /code-block >}}

Here all the state management logic is encapsulated in a reusable `useTodos` hook. We return the list of todos and the list of operations that comes with them. When we call one of the modifying functions the list of todos is updated and the whole list gets re-rendered as shown in the example below:

![todo](https://thepracticaldev.s3.amazonaws.com/i/hjej8cmmyapwha6lj7fv.gif)

**Things I like:** The simplicity. There is no central storage or complex provisioning. We just take it and use it.

**Things I don't like:** The simplicity. It may not scale well in large applications or when we have a complex dataset. For small programs that deal with a small scoped domain it's perfect.

### **Custom Hooks + React Context**
This builds on top of the ideas explained in this [article](https://ricostacruz.com/til/state-management-with-react-hooks). We use a combination of a custom hook to manage state:

{{< code-block typescript >}}
import React from "react";
import { useState, useMemo, useContext } from "react";
import { Todo } from "../Example5";

const AppContext = React.createContext({});

/**
 * Our custom React hook to manage state
 */

type AppState = {
  todos: Todo[];
};

const useAppState = () => {
  const initialState: AppState = { todos: [] };
  // Manage the state using React.useState()
  const [state, setState] = useState<AppState>(initialState);

  // Build our actions. We'll use useMemo() as an optimization,
  // so this will only ever be called once.
  const actions = useMemo(() => getActions(setState), [setState]);

  return { state, actions };
};

// Define your actions as functions that call setState().
// It's a bit like Redux's dispatch(), but as individual
// functions.
const getActions = (
  setState: React.Dispatch<React.SetStateAction<AppState>>
) => ({
  deleteTodo: (id: number) => {
    setState((prevState: AppState) => ({
      ...prevState,
      todos: prevState.todos.filter((todo: Todo) => todo.id !== id)
    }));
  },
  editTodo: (id: number, text: string) => {
    setState((prevState: AppState) => ({
      ...prevState,
      todos: prevState.todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    }));
  },
  toggleTodo: (id: number) => {
    setState((prevState: AppState) => ({
      ...prevState,
      todos: prevState.todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  },
  addTodo: (text: string) => {
    setState((prevState: AppState) => ({
      ...prevState,
      todos: [
        ...prevState.todos,
        {
          id:
            prevState.todos.reduce(
              (maxId, todo) => Math.max(todo.id, maxId),
              -1
            ) + 1,
          completed: false,
          text
        }
      ]
    }));
  }
});

// Sub-components can use this function. It will pick up the
// `state` and `actions` given by useAppState() higher in the
// component tree.
const useAppContext = (): any => {
  return useContext(AppContext);
};

export { AppContext, useAppState, useAppContext };
{{< /code-block >}}

Then we can use it like:

{{< code-block typescript >}}
const TodoList: React.FC = () => {
  const { state, actions } = useAppContext();

  return (
    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection
        todos={state.todos}
        deleteTodo={actions.deleteTodo}
        editTodo={actions.editTodo}
        toggleTodo={actions.toggleTodo}
      />
    </div>
  );
};

const App: React.FC = () => {
  const { state, actions } = useAppState();
  return (
    <AppContext.Provider value={{ state, actions }}>
      <div>
        <TodoList />
      </div>
    </AppContext.Provider>
  );
};

export default App;
{{< /code-block >}}

In the above example we separate the actions from the state and we use a global `AppContext` as a Provider for those values. Then any component can invoke the `useAppContext` to retrieve that context for use.

**Things I like:** Separating actions from state. Using `React.Context` API as an improvement on the previous example. 

**Things I don't like:** We may need further customisation. For example we need to logically namespace the actions or the state. Overall its a good solution.

### **Redux + Hooks + Proxies**

The last example is based on top of the ideas explained in this
[article](https://frontarm.com/daishi-kato/redux-custom-hooks/). Here we keep our good old Redux store with all our reducers, initial state etc:

{{< code-block typescript >}}
import { createStore } from 'redux';
import { Todo } from './models';

export type AppState = {
  todos: Todo[];
};

const reducer = (state = AppState, action: any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [
        ...state.todos,
        {
          id: state.todos.reduce((maxId: number, todo: Todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ] };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((todo: Todo) => todo.id !== action.id) };
    case 'TOGGLE_TODO':
      return { ...state, todos: state.todos.map((todo: Todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      ) };
    case 'EDIT_TODO':
      return { ...state, todos: state.todos.map((todo: Todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      ) };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
{{< /code-block >}}

Then we need to create the following mumbo jumbo that performs all the logic:

{{< code-block typescript >}}
import React, { useContext, useEffect, useReducer, useRef, useMemo } from 'react';

const ReduxStoreContext = React.createContext({});

export const ReduxProvider = ({ store, children }: any) => (
  <ReduxStoreContext.Provider value={store}>
    {children}
  </ReduxStoreContext.Provider>
);

export const useReduxDispatch = () => {
  const store: any = useContext(ReduxStoreContext);
  return store.dispatch;
};

const forcedReducer = (state: any) => !state;
const useForceUpdate = () => useReducer(forcedReducer, false)[1];

export const useReduxState = () => { 
  const forceUpdate: any = useForceUpdate();
  const store: any = useContext(ReduxStoreContext);
  const state = useRef(store.getState());
  const used: any = useRef({});
  const handler = useMemo(() => ({
    get: (target: any, name: any) => {
      used.current[name] = true;
      return target[name];
    },
  }), []);
  useEffect(() => {
    const callback = () => {
      const nextState = store.getState();
      const changed = Object.keys(used.current)
        .find(key => state.current[key] !== nextState[key]);
      if (changed) {
        state.current = nextState;
        forceUpdate();
      }
    };
    const unsubscribe = store.subscribe(callback);
    return unsubscribe;
  }, []);
  return new Proxy(state.current, handler);
};
{{< /code-block >}}


A detailed explanation is written on the tutorial article. Once we have that logic we can use it like this:

{{< code-block typescript >}}
const App: React.FC = () => (
  <ReduxProvider store={store}>
    <TodoList />
  </ReduxProvider>
);

const TodoList: React.FC = () => {
  const state = useReduxState();
  const dispatch = useReduxDispatch();

  const addTodo = useCallback((text: string) => dispatch({ type: 'ADD_TODO', text: text, }), []);
  const deleteTodo = useCallback((id: number) => dispatch({ type: 'DELETE_TODO', id: id, }), []);
  const editTodo = useCallback((id: number, text: string) => 
    dispatch({ type: 'EDIT_TODO', id: id, text: text }), []);
  const toggleTodo = useCallback((id: number) => dispatch({ type: 'TOGGLE_TODO', id: id }), []);

  return (
    <div>
      <Header addTodo={addTodo} />
      <MainSection
        todos={state.todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
};
{{< /code-block >}}

Of course we can extract all the dispatch actions in a separate place, use selectors etc, but most of the functionality is similar.

**Things I like:** It plays well with existing Redux stores, actions and reducers.

**Things I don't like:** That mumbo jumbo over there looks strange. We are not sure what are the implications in terms of performance. Proxies are not available in IE11. Also, I'm not sure what we are gaining in terms of reducing our codebase by keeping all those redux stores, actions and reducers.

Phew that's it, I hope this article had demystified the usage of React hooks for managing the state. Overall I think that React hooks complement Redux in terms of suitability for purpose and convenience when handling state. Out of the three examples I kinda like the last one if as it let's me keep that redux store in place although I'm not sure if about the code bloat.

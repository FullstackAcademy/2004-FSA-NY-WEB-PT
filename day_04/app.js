const app = document.querySelector('#app');

let state = {
  taskTitle: '',
  taskComplete: false,
  todos: [],
};

const localTodos = localStorage.getItem('todos');

if (localTodos) {
  state = JSON.parse(localTodos);
}

const create = (type) => document.createElement(type);

const createInputForForm = () => {
  const inputContainer = create('div');
  inputContainer.classList.add('form_input')
  const titleLabel = create('label');
  titleLabel.innerText = 'Task Title';
  const titleInput = create('input');
  titleInput.setAttribute(
    'name',
    'input',
  );

  titleInput.addEventListener('input', ev => {
    state.taskTitle = ev.target.value;
  });

  inputContainer.append(titleLabel);
  inputContainer.append(titleInput);

  return inputContainer;
}

const createCheckboxForForm = () => {
  const completeCheckboxContainer = create('div');
  completeCheckboxContainer.classList.add('form_input');
  const completeCheckboxLabel = create('label');
  completeCheckboxLabel.innerText = 'Completed';
  const completeCheckbox = create('input');
  completeCheckbox.setAttribute(
    'type',
    'checkbox',
  );
  completeCheckbox.setAttribute(
    'name',
    'checkbox',
  );

  completeCheckbox.addEventListener('change', ev => {
    state.taskComplete = ev.target.checked;
  });

  completeCheckboxContainer.append(completeCheckboxLabel);
  completeCheckboxContainer.append(completeCheckbox);

  return completeCheckboxContainer;
}

const createButtonForForm = () => {
  const submitButton = create('button');
  submitButton.setAttribute(
    'type',
    'submit'
  );
  submitButton.innerText = 'Add Task';

  return submitButton;
}

const createForm = () => {
  const formContainer = create('div');
  formContainer.classList.add('form_container');

  const form = create('form');

  const inputContainer = createInputForForm();
  const completeCheckboxContainer = createCheckboxForForm();
  const submitButton = createButtonForForm();

  form.append(inputContainer);
  form.append(completeCheckboxContainer);
  form.append(submitButton);

  form.addEventListener('submit', ev => {
    ev.preventDefault();

    state.todos.push({
      title: state.taskTitle,
      complete: state.taskComplete,
    });

    reset();
    render();

    localStorage.setItem('todos', JSON.stringify(state));
  });

  formContainer.append(form);

  return formContainer;
};

const createTodoContainer = () => {
  const todoContainer = create('div');
  todoContainer.classList.add('todo_container');

  return todoContainer;
}

const createTodo = (todo) => {
  const container = create('div');

  container.innerText = todo.title;
  if (todo.complete) {
    container.classList.add('complete');
  }

  return container;
}

const todoContainer = createTodoContainer();

app.append(createForm());

app.append(todoContainer);

const render = () => {
  console.log(state);

  todoContainer.innerHTML = '';

  state.todos.forEach(todo => {
    const todoDiv = createTodo(todo);

    todoContainer.append(todoDiv);
  });
}

const input = document.querySelector('[name = "input"]');
const checkbox = document.querySelector('[name = "checkbox"]');

const reset = () => {
  state.taskTitle = '';
  state.taskComplete = false;
  input.value = '';
  checkbox.checked = false;
};

render();

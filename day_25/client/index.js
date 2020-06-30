import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  studentName: '',
  students: [],
};

const SET_STUDENT_NAME = 'SET_STUDENT_NAME';
const SET_STUDENTS = 'SET_STUDENTS';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT_NAME:
      return {
        ...state,
        studentName: action.text,
      };
    case SET_STUDENTS:
      return {
        ...state,
        students: action.students,
        studentName: '',
      };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

const app = document.querySelector('#app');

class Class2004 extends Component {
  componentDidMount() {
    const { getStudents } = this.props;

    getStudents();
  }

  render() {
    const {
      students,
      studentName,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <>
        <form
          onSubmit={(e) => handleSubmit(e, studentName)}
        >
          <label>
            Student Name:
            <input
              name="studentName"
              value={studentName}
              onChange={handleChange}
            />
          </label>
          <button>Add Student</button>
        </form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {
            students.map((student) => {
              return (
                <div
                  key={student}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'gray',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '2em',
                  }}
                >
                  {student.name.substr(0, 1)}
                </div>
              )
            })
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    studentName: state.studentName,
    students: state.students,
  };
}

const mapDispatchToProps = (dispatch, getState) => {
  return {
    getStudents: () => {
      dispatch(() => {
        return axios.get('/api/people')
          .then((res) => {
            const {data: {people}} = res;

            dispatch({
              type: SET_STUDENTS,
              students: people,
            });
          });
      })
    },
    handleChange: (e) => {
      store.dispatch({
        type: SET_STUDENT_NAME,
        text: e.target.value,
      });
    },
    handleSubmit: (e, studentName) => {
      e.preventDefault();

      dispatch(() => {
        axios.post('/api/people', { name: studentName })
          .then(() => {
            return axios.get('/api/people')
          })
          .then((res) => {
            dispatch({
              type: SET_STUDENTS,
              students: res.data.people,
            });
          })
      });
    }
  };
}

const ConnectedClass2004 = connect(mapStateToProps, mapDispatchToProps)(Class2004);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedClass2004 />
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  app,
  () => {
    console.log('Application rendered!');
  },
);

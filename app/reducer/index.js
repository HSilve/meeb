import { combineReducers } from 'redux'; // this should come in handy

const initialState = {}

studentsInitialState = {
	students: [],
	selectedStudent: {}
}

const rootReducer = combineReducers({students, campuses})

function(state = initialState, action) {
  switch(action.type) {
    default: return state
  }
};



export default rootReducer;

import Types from './taskBoardTypes'

export default {

  swithSprint: payload => ({
    type: Types.SWITCH_SPRINT,
    payload
  }),

  changeSortOrder: payload => ({
    type: Types.CHANGE_SORT_ORDER,
    payload
  }),

  setSortOrder: payload => ({
    type: Types.SET_SORT_ORDER,
    payload
  }),

  changeTaskStatus: payload => ({
    type: Types.CHANGE_TASK_STATUS,
    payload
  }),

  setTaskStatus: payload => ({
    type: Types.SET_TASK_STATUS,
    payload
  }),

  setTaskStatus: payload => ({
    type: Types.SET_TASK_STATUS,
    payload
  }),

  updateStory: payload => ({
    type: Types.UPDATE_STORY,
    payload
  }),

  setUpdatedStory: payload => ({
    type: Types.SET_UPDATED_STORY,
    payload
  }),
  
  addTasks: payload => ({
    type: Types.ADD_TASKS,
    payload
  }),

  setAddedTasks: payload => ({
    type: Types.SET_ADDED_TASKS,
    payload
  }),

  updateTask: payload => ({
    type: Types.UPDATE_TASK,
    payload
  }),

  setUpdatedTask: payload => ({
    type: Types.SET_UPDATED_TASK,
    payload
  }),

  deleteTask: payload => ({
    type: Types.DELETE_TASK,
    payload
  }),

  deleteTaskFromState: payload => ({
    type: Types.DELETE_TASK_FROM_STATE,
    payload
  })
  
}

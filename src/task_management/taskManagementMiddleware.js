import sprintBacklogActions from './sprint_backlog/sprintBacklogActions'
import sprintBacklogTypes from './sprint_backlog/sprintBacklogTypes'
import taskBoardActions from './task_board/taskBoardActions'
import taskBoardTypes from './task_board/taskBoardTypes'

import Service from './taskManagementService'

export default store => next => action => {
  const {dispatch} = store

  if (action.type === sprintBacklogTypes.GET_SPRINTS) {
    (async () => {
      const sprints = await Service.listSprints()
      dispatch(sprintBacklogActions.setSprints(sprints))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_SPRINT) {
    (async () => {
      const sprint = action.payload
      const response = await Service.createSprint(sprint)
      dispatch(sprintBacklogActions.setNewSprint({newSprint: response.sprint}))
    })()
  }

  if (action.type === sprintBacklogTypes.UPDATE_SPRINT) {
    (async () => {
      const sprint = action.payload
      await Service.updateSprint(sprint)
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_BACKLOG_CATEGORY) {
    (async () => {
      const backlogCategory = action.payload
      const response = await Service.createBacklogCategory(backlogCategory)
      dispatch(sprintBacklogActions.setNewBacklogCategory({newBacklogCategory: response.backlogCatgory}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_BACKLOG_CATEGORY_NAME) {
    (async () => {
      const backlogCategory = action.payload
      const response = await Service.updateBacklogCategory(backlogCategory)
      dispatch(sprintBacklogActions.setBacklogCategoryName({...action.payload, changedBacklogCategory: response.backlogCatgory}))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_STORY) {
    (async () => {
      const story = action.payload
      const response = await Service.createStoryToSprint(story)
      dispatch(sprintBacklogActions.setStory({newStory: response.story}))
    })()
  }

  if (action.type === sprintBacklogTypes.ADD_STORY_TO_BACKLOGCATEGORY) {
    (async () => {
      const story = action.payload
      const response = await Service.createStoryToBacklogCategory(story)
      dispatch(sprintBacklogActions.setStoryToBacklogCategory({newStory: response.story}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_NAME) {
    (async () => {
      const story = action.payload
      const response = await Service.updateStoryName(story)
      dispatch(sprintBacklogActions.setStoryName({...action.payload, changedStory: response.story}))
    })()
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_BELONGING) {
    Service.changeStoryBelonging(action.payload)
  }

  if (action.type === sprintBacklogTypes.CHANGE_STORY_SORT_ORDER) {
    Service.changeStorySortOrder(action.payload)
  }

  if (action.type === sprintBacklogTypes.DELETE_STORY) {
    (async () => {
      const story = action.payload
      await Service.deleteStory(story.id)
      dispatch(sprintBacklogActions.deleteStoryFromState({story}))
    })()
  }
  if (action.type === taskBoardTypes.CHANGE_TASK_STATUS) {
    (async () => {
      Service.changeTaskStatus(action.payload)
    })()
  }

  if (action.type === taskBoardTypes.CHANGE_SORT_ORDER) {
    (async () => {
      Service.changeTaskSortOrder(action.payload)
    })()
  }

  if (action.type === taskBoardTypes.ADD_TASKS) {
    (async () => {
      const response = await Service.createTasks(action.payload)
      dispatch(taskBoardActions.setAddedTasks({...action.payload, newTasks : response.newTasks}))
    })()
  }

  if (action.type === taskBoardTypes.UPDATE_STORY) {
    (async () => {
      const story = action.payload
      const response = await Service.updateStory(story)
      dispatch(taskBoardActions.setUpdatedStory({updatedStory: response.story}))
    })()
  }

  if (action.type === taskBoardTypes.UPDATE_TASK) {
    (async () => {
      const { task } = action.payload
      await Service.updateTask(task)
      dispatch(taskBoardActions.setUpdatedTask({...action.payload}))
    })()
  }

  if (action.type === taskBoardTypes.DELETE_TASK) {
    (async () => {
      const { taskId } = action.payload
      await Service.deleteTask(taskId)
      dispatch(taskBoardActions.deleteTaskFromState({...action.payload}))
    })()
  }

  next(action)
}

import Types from './sprintBacklogTypes'

export default {

  getSprints: () => ({
    type: Types.GET_SPRINTS
  }),

  setSprints: payload => ({
    type: Types.SET_SPRINTS,
    payload
  }),
  
  resetSprints: () => ({
    type: Types.RESET_SPRINTS
  }),

  addSprint: payload => ({
    type: Types.ADD_SPRINT,
    payload
  }),

  setNewSprint: payload => ({
    type: Types.SET_NEW_SPRINT,
    payload
  }),

  updateSprint: payload => ({
    type: Types.UPDATE_SPRINT,
    payload
  }),  

  addStory: payload => ({
    type: Types.ADD_STORY,
    payload
  }),

  setStory: payload => ({
    type: Types.SET_STORY,
    payload
  }),

  addStoryToBacklogCategory: payload => ({
    type: Types.ADD_STORY_TO_BACKLOGCATEGORY,
    payload
  }),

  setStoryToBacklogCategory: payload => ({
    type: Types.SET_STORY_TO_BACKLOGCATEGORY,
    payload
  }),

  changeStoryName: payload => ({
    type: Types.CHANGE_STORY_NAME,
    payload
  }),

  setStoryName: payload => ({
    type: Types.SET_STORY_NAME,
    payload
  }),

  changeStoryBelonging: payload => ({
    type: Types.CHANGE_STORY_BELONGING,
    payload
  }),

  changeStorySortOrder: payload => ({
    type: Types.CHANGE_STORY_SORT_ORDER,
    payload
  }),

  addBacklogCategory: payload => ({
    type: Types.ADD_BACKLOG_CATEGORY,
    payload
  }),

  setNewBacklogCategory: payload => ({
    type: Types.SET_NEW_BACKLOG_CATEGORY,
    payload
  }),

  changeBacklogCategoryName: payload => ({
    type: Types.CHANGE_BACKLOG_CATEGORY_NAME,
    payload
  }),

  setBacklogCategoryName: payload => ({
    type: Types.SET_BACKLOG_CATEGORY_NAME,
    payload
  }),

  deleteStory: payload => ({
    type: Types.DELETE_STORY,
    payload
  }),

  deleteStoryFromState: payload => ({
    type: Types.DELETE_STORY_FROM_STATE,
    payload
  })

}

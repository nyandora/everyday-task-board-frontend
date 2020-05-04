import ApiCommon from '../common/utils/api/apiCommon'

export default class TaskManagementApi {
  // === sprint_backlog ===

  static listSprints = async () => {
    return await ApiCommon.get("/sprints")
  }

  static createSprint = async request => {
    return await ApiCommon.post("/sprints/sprint", request)
  }
  
  static updateSprint = async (sprintId, request) => {
    return await ApiCommon.put(`/sprints/sprint/${sprintId}`, request)
  }

  static createBacklogCategory = async request => {
    return await ApiCommon.post("/sprints/backlogCategory", request)
  }

  static updateBacklogCategory = async (backlogCategoryId, request) => {
    return await ApiCommon.put(`/sprints/backlogCategory/${backlogCategoryId}`, request)
  }

  static createStoryToSprint = async request => {
    return await ApiCommon.post("/sprints/storyBelongingToSprint", request)
  }
  
  static createStoryToBacklogCategory = async request => {
    return await ApiCommon.post("/sprints/storyBelongingToBacklogCategory", request)
  }

  static updateStoryName = async (storyId, request) => {
    return await ApiCommon.put(`/sprints/storyName/${storyId}`, request)
  }

  static changeStoryBelonging = async request => {
    return await ApiCommon.post("/sprints/storyBelonging", request)
  }

  static changeStorySortOrder = async request => {
    return await ApiCommon.post("/sprints/storySortOrder", request)
  }

  static deleteStory = async storyId => {
    return await ApiCommon.delete(`/sprints/story?storyId=${storyId}`)
  }

  // === task_board ===

  static changeTaskStatus = async request => {
    return await ApiCommon.post("/sprints/taskStatus", request)
  }

  static changeTaskSortOrder = async request => {
    return await ApiCommon.post("/sprints/taskSortOrder", request)
  }

  static createTasks = async request => {
    return await ApiCommon.post("/sprints/tasks", request)
  }

  static updateStory = async (storyId, request) => {
    return await ApiCommon.put(`/sprints/story/${storyId}`, request)
  }

  static updateTask = async (taskId, request) => {
    return await ApiCommon.put(`/sprints/task/${taskId}`, request)
  }

  static deleteTask = async taskId => {
    return await ApiCommon.delete(`/sprints/task?taskId=${taskId}`)
  }









    static get = async taskId => {
      return await ApiCommon.get(`/tasks/${taskId}`)
    }


    static delete = async (taskId) => {
      return await ApiCommon.delete(`/tasks/${taskId}`, {})
    }
  
    static updateTaskOrders = async (request) => {
      return await ApiCommon.put("/taskorders", request)
    }
  }
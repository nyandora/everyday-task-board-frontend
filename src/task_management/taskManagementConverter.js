import { Sprint, Story, Task, BacklogCategory} from "./taskManagementModel"

export default class TaskManagementConverter {
  static toSprintCreateRequest = sprint => {
    return {
      sprintName: sprint.name,
      startDate: sprint.startDate,
      endDate: sprint.endDate
    }
  }

  static toModelAll = response => {

    const resSprints  = response.sprints

    const sprintsMap = new Map()
    for (const sprintId in resSprints) {
      const resSprint = resSprints[sprintId]
      sprintsMap.set(sprintId, TaskManagementConverter.toModelSprint(resSprint))
    }

    const resBacklogCategories = response.backlogCategories
    const backlogCategoriesMap = new Map()
    for (const backlogCategoryId in resBacklogCategories) {
      const resBacklogCategory = resBacklogCategories[backlogCategoryId]
      backlogCategoriesMap.set(backlogCategoryId, TaskManagementConverter.toModelBacklogCategory(resBacklogCategory))
    }

    return {sprints: sprintsMap, backlogCategories: backlogCategoriesMap}
  }

  static toModelSprint = resSprint => {
    return new Sprint (
      resSprint.sprintId,
      resSprint.sprintName,
      resSprint.sprintStatus,
      resSprint.startDate,
      resSprint.endDate,
      resSprint.sortOrder,
      TaskManagementConverter.toStoriesMap(resSprint)
    )
  }

  static toModelBacklogCategory = resBacklogCategory => {
    return new BacklogCategory (
      resBacklogCategory.backlogCategoryId,
      resBacklogCategory.backlogCategoryName,
      resBacklogCategory.status,
      TaskManagementConverter.toStoriesMap(resBacklogCategory),
      resBacklogCategory.sortOrder
    )
  }

  static toStoriesMap = parentOfStory => {
    const storiesMap = new Map()

    for (const storyId in parentOfStory.stories) {
      const resStory = parentOfStory.stories[storyId]
      storiesMap.set(storyId, TaskManagementConverter.toModelStory(resStory))
    }

    return storiesMap
  }

  static toModelStory = resStory => {
    return new Story (
      resStory.storyId,
      resStory.storyName,
      resStory.storyStatus,
      resStory.baseSprintId,
      resStory.backlogCategoryId,
      resStory.sortOrder,
      TaskManagementConverter.toTasksMap(resStory)
    )
  }

  static toTasksMap = resStory => {
    const tasksMap = new Map()

    for (const taskId in resStory.tasks) {
      const resTask = resStory.tasks[taskId]
      tasksMap.set(taskId, this.toModelTask(resTask))
    }

    return tasksMap
  }

  static toModelTask = resTask => {
    return new Task (
      resTask.taskId,
      resTask.taskName,
      resTask.taskStatus,
      resTask.baseStoryId,
      resTask.sortOrder
    )
  }

  static toUpdateSprintRequest = sprint => {
    return {
      sprintName: sprint.name,
      status: sprint.status,
      startDate: sprint.startDate,
      endDate: sprint.endDate
    }
  }

  static toBacklogCategoryCreateRequest = backlogCategory => {
    return {
      backlogCategoryName: backlogCategory.name
    }
  }

  static toUpdateBacklogCategoryRequest = backlogCategory => {
    return {
      backlogCategoryId: backlogCategory.id,
      backlogCategoryName: backlogCategory.name
    }
  }

  static toCreateStoryRequest = story => {
    return {
      storyName: story.name,
      sprintId: story.baseSprintId,
      backlogCategoryId: story.backlogCategoryId
    }
  }

  static toUpdateStoryRequest = story => {
    return {
      storyId: story.id,
      sprintId: story.baseSprintId,
      backlogCategoryId: story.backlogCategoryId,
      storyName: story.name,
      storyStatus: story.status
    }
  }

  static toChangeStoryBelongingRequest = param => {
    return {
      sourceId: param.sourceId,
      destinationId: param.destinationId,
      storyId: param.storyId,
      newIndex: param.newIndex
    }
  }

  static toChangeStorySortOrderRequest = param => {
    return {
      sourceId: param.sourceId,
      storyId: param.storyId,
      newIndex: param.newIndex
    }
  }

  static toChangeTaskStatusRequest = param => {
    return {
      sprintId: param.sprintId,
      storyId: param.storyId,
      taskId: param.taskId,
      newStatus: param.newStatus,
      newIndex: param.newIndex
    }
  }

  static toChangeTaskSortOrderRequest = param => {
    return {
      sprintId: param.sprintId,
      storyId: param.storyId,
      taskId: param.taskId,
      newIndex: param.newIndex
    }
  }

  static toCreateTasksRequest = param => {
    return {
      sprintId: param.sprintId,
      storyId: param.storyId,
      taskNames: param.taskNames
    }
  }

  static toUpdateTaskRequest = task => {
    return {
      taskName: task.name
    }
  }

}
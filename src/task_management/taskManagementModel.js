export class Sprint {
  constructor(
    id, name, status,
    startDate, endDate,
    sortOrder, stories
  ) {
    this.id = id
    this.name = name
    this.status = status
    this.startDate = startDate
    this.endDate = endDate
    this.sortOrder = sortOrder
    this.stories = stories
  }

  static createIdToSprintMap(sprints) {
    const result = {}
    sprints.forEach(sprint => {
      result[sprint.id] = sprint
    })
    return result
  }
}

export class BacklogCategory {
  constructor(
    id, name, status, stories, sortOrder
  ) {
    this.id = id
    this.name = name
    this.status = status
    this.stories = stories
    this.sortOrder = sortOrder
  }

  static createIdToBacklogCategoryMap(backlogCategories) {
    const result = {}
    backlogCategories.forEach(backlogCategory => {
      result[backlogCategory.id] = backlogCategory
    })
    return result
  }
}

export class Story {
  constructor(
    id, name, status,
    baseSprintId, backlogCategoryId,
    sortOrder, tasks
  ) {
    this.id = id
    this.name = name
    this.status = status
    this.baseSprintId = baseSprintId
    this.backlogCategoryId = backlogCategoryId
    this.sortOrder = sortOrder
    this.tasks = tasks
  }

  static createIdToStoryMap(stories) {
    const result = {}
    stories.forEach(story => {
      result[story.id] = story
    })
    return result
  }
}

export class Task {
  constructor(
    id, name, status,
    baseStoryId, sortOrder
  ) {
    this.id = id
    this.name = name
    this.status = status
    this.sortOrder = sortOrder
    this.baseStoryId = baseStoryId
  }

  static createIdToTaskMap(tasks) {
    const result = {}
    tasks.forEach(task => {
      result[task.id] = task
    })
    return result
  }
}
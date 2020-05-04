import sprintBacklogTypes from './sprint_backlog/sprintBacklogTypes'
import taskBoardTypes from './task_board/taskBoardTypes'

const initState = {
  sprints: undefined,
  backlogCategories: undefined,
  currentSprint: undefined
}

export default (state = initState, action) => {
  switch (action.type) {
    case sprintBacklogTypes.SET_SPRINTS: {
      const { sprints, backlogCategories } = action.payload
      return { ...state, sprints, backlogCategories }
    }
    case sprintBacklogTypes.RESET_SPRINTS: {
      return initState
    }
    case sprintBacklogTypes.SET_NEW_SPRINT: {
      const { newSprint } = action.payload

      // copySprintsMap()のために、空のMapを初期設定する
      newSprint.stories = new Map()
      
      const copiedSprints = copySprintsMap(state.sprints)

      copiedSprints.set(newSprint.sprintId, newSprint)

      return { ...state, sprints: copiedSprints}
    }
    case sprintBacklogTypes.UPDATE_SPRINT: {
      const reqSprint = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      const sprint = copiedSprints.get(reqSprint.id)
      sprint.name = reqSprint.name
      sprint.startDate = reqSprint.startDate
      sprint.endDate = reqSprint.endDate
      sprint.status = reqSprint.status

      return { ...state, sprints: copiedSprints}
    }
    case sprintBacklogTypes.SET_NEW_BACKLOG_CATEGORY: {
      const { newBacklogCategory } = action.payload
      const copiedBacklogCategories = copySprintsMap(state.backlogCategories)
      copiedBacklogCategories.set(newBacklogCategory.id, newBacklogCategory)
      return { ...state, backlogCategories: copiedBacklogCategories}
    }
    case sprintBacklogTypes.SET_BACKLOG_CATEGORY_NAME: {
      const { changedBacklogCategory } = action.payload
      const copied = copyBacklogCategoriesMap(state.backlogCategories) 
      copied.get(changedBacklogCategory.id).name = changedBacklogCategory.name
      return { ...state, backlogCategories: copied}
    }
    case sprintBacklogTypes.SET_STORY: {
      const { newStory } = action.payload
      const copiedSprints = copySprintsMap(state.sprints)
      copiedSprints.get(newStory.baseSprintId).stories.set(newStory.id, newStory)
      return { ...state, sprints: copiedSprints}
    }
    case sprintBacklogTypes.SET_STORY_TO_BACKLOGCATEGORY: {
      const { newStory } = action.payload
      const copiedBacklogCategories = copyBacklogCategoriesMap(state.backlogCategories)
      copiedBacklogCategories.get(newStory.backlogCategoryId).stories.set(newStory.id, newStory)
      return { ...state, backlogCategories: copiedBacklogCategories}
    }
    case sprintBacklogTypes.SET_STORY_NAME: {
      const { changedStory } = action.payload

      const isBacklogStory = !!changedStory.backlogCategoryId

      const copiedSideState = isBacklogStory 
              ? copyBacklogCategoriesMap(state.backlogCategories)
              : copySprintsMap(state.sprints)

      const parentId = isBacklogStory ? changedStory.backlogCategoryId : changedStory.baseSprintId
      copiedSideState.get(parentId).stories.get(changedStory.id).name = changedStory.name

      return isBacklogStory
               ?  { ...state, backlogCategories: copiedSideState}
               :  { ...state, sprints: copiedSideState}
    }
    case sprintBacklogTypes.CHANGE_STORY_BELONGING: {
      const { sourceId, destinationId, storyId, newIndex } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)
      const copiedBacklogCategories = copyBacklogCategoriesMap(state.backlogCategories)

      const srcSideCopy = sourceId.startsWith("backlogCategory") ? copiedBacklogCategories : copiedSprints
      const destSideCopy = destinationId.startsWith("backlogCategory") ? copiedBacklogCategories : copiedSprints

      const src = srcSideCopy.get(sourceId)
      const dest = destSideCopy.get(destinationId)

      const changedStory = src.stories.get(storyId)

      if (sourceId.startsWith("backlogCategory") && destinationId.startsWith("backlogCategory")) {
        changedStory.backlogCategoryId = destinationId
      } else if (sourceId.startsWith("backlogCategory") && destinationId.startsWith("sprint")) {
        changedStory.backlogCategoryId = null
        changedStory.baseSprintId = destinationId
      } else if (sourceId.startsWith("sprint") && destinationId.startsWith("backlogCategory")) {
        changedStory.baseSprintId = null
        changedStory.backlogCategoryId = destinationId
      } else {
        changedStory.baseSprintId = destinationId
      }

      changedStory.sortOrder = newIndex

      dest.stories.set(changedStory.id, changedStory)
      src.stories.delete(storyId)

      // 表示順を再設定する
      // 　1. 移動元のスプリント or バックログカテゴリーのストーリー群。移動されたストーリー分の抜け番ができる。その抜け番を詰める。
      Array.from(src.stories.values())
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .forEach((story, index) => (story.sortOrder = index))

      // 　2. 移動先のスプリント or バックログカテゴリーのストーリー群
      Array.from(dest.stories.values())
        .sort((a, b) => sortItems(a, a.id, b, b.id, storyId))
        .forEach((story, index) => (story.sortOrder = index))

      return { ...state, sprints: copiedSprints, backlogCategories: copiedBacklogCategories}
    }
    case sprintBacklogTypes.CHANGE_STORY_SORT_ORDER: {
      const { sourceId, storyId, newIndex } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)
      const copiedBacklogCategories = copyBacklogCategoriesMap(state.backlogCategories)

      const srcSideCopy = sourceId.startsWith("backlogCategory") ? copiedBacklogCategories : copiedSprints

      const src = srcSideCopy.get(sourceId)

      const changedStory = src.stories.get(storyId)
      const isUpForward = newIndex - changedStory.sortOrder > 0
      changedStory.sortOrder = newIndex

      // 表示順を再設定する
      Array.from(src.stories.values())
        .sort((a, b) => sortItemsByForwardDirection(a, a.id, b, b.id, storyId, isUpForward))
        .forEach((story, index) => story.sortOrder = index)

      return { ...state, sprints: copiedSprints, backlogCategories: copiedBacklogCategories}
    }
    case sprintBacklogTypes.DELETE_STORY_FROM_STATE: {
      const { story } = action.payload

      const isBacklogStory = !!story.backlogCategoryId

      const copiedSideState = isBacklogStory 
              ? copyBacklogCategoriesMap(state.backlogCategories)
              : copySprintsMap(state.sprints)

      const parentId = isBacklogStory ? story.backlogCategoryId : story.baseSprintId
      copiedSideState.get(parentId).stories.delete(story.id)

      return isBacklogStory
               ?  { ...state, backlogCategories: copiedSideState}
               :  { ...state, sprints: copiedSideState}
    }
    case taskBoardTypes.SWITCH_SPRINT: {
      const { sprintId } = action.payload

      return {...state, currentSprint: state.sprints.get(sprintId)}
    }
    case taskBoardTypes.CHANGE_SORT_ORDER: {
      // CHANGE_TASK_STATUSと同様の理由で、DBへの永続化が完了する前に、先行して新しいソート順をstateに反映させる。
      const { sprintId, storyId, taskId, newIndex } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      const tasks = copiedSprints.get(sprintId).stories.get(storyId).tasks

      const changedTask = tasks.get(taskId)

      // 現在のステータス
      const currentStatus = changedTask.status

      const isUpForward = newIndex - changedTask.sortOrder > 0

      // 新たな表示位置を指定
      changedTask.sortOrder = newIndex

      // タスク順を再設定する
      Array.from(tasks.values())
        .filter(task => task.status === currentStatus)
        .sort((a, b) => sortItemsByForwardDirection(a, a.id, b, b.id, taskId, isUpForward))
        .forEach((task, index) => task.sortOrder = index)

      return { ...state, sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
    }
    case taskBoardTypes.CHANGE_TASK_STATUS: {
      /*
      DBへの永続化が完了する前に、先行して新ステータスをstateに反映させる。
      先行して反映させないと、タスクのオブジェクトが旧ステータスの位置に一瞬だけ戻ってしまう。
      */
      const { sprintId, storyId, taskId, newStatus, newIndex } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      const tasks = copiedSprints.get(sprintId).stories.get(storyId).tasks

      const changedTask = tasks.get(taskId)

      const oldStatus = changedTask.status

      // ステータス変更
      changedTask.status = newStatus

      // 新ステータスでの表示位置を指定
      changedTask.sortOrder = newIndex

      // ステータスごとにタスク順を再設定する
      // 　1. 変更前のステータス
      // 　　　　ステータス変更されたタスクが無くなると、抜け番ができる。その抜け番を詰める。
      Array.from(tasks.values())
        .filter(task => task.status === oldStatus)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .forEach((task, index) => (task.sortOrder = index))
      
      // 　2. 変更後のステータス
      Array.from(tasks.values())
        .filter(task => task.status === newStatus)
        .sort((a, b) => sortItems(a, a.id, b, b.id, taskId))
        .forEach((task, index) => (task.sortOrder = index))

      return { ...state, sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
      
    }
    case taskBoardTypes.SET_UPDATED_STORY: {
      const { updatedStory } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      const targetStory = copiedSprints.get(updatedStory.baseSprintId).stories.get(updatedStory.id)

      targetStory.name = updatedStory.name
      targetStory.status = updatedStory.status

      return { ...state, sprints: copiedSprints, currentSprint: copiedSprints.get(updatedStory.baseSprintId)}
    }
    case taskBoardTypes.SET_ADDED_TASKS: {
      const { sprintId, storyId, newTasks } = action.payload
      
      const copiedSprints = copySprintsMap(state.sprints)

      const tasks = copiedSprints.get(sprintId)
                          .stories.get(storyId)
                          .tasks

      newTasks.forEach(newTask => {tasks.set(newTask.id, newTask)});

      return { ...state, sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
      
    }
    case taskBoardTypes.SET_UPDATED_TASK: {
      const { task, sprintId } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      const targetTask = copiedSprints.get(sprintId).stories.get(task.baseStoryId).tasks.get(task.id)

      targetTask.name = task.name

      return { ...state, sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
    }
    case taskBoardTypes.DELETE_TASK_FROM_STATE: {
      const { taskId, storyId, sprintId } = action.payload

      const copiedSprints = copySprintsMap(state.sprints)

      copiedSprints.get(sprintId).stories.get(storyId).tasks.delete(taskId)

      return { ...state, sprints: copiedSprints, currentSprint: copiedSprints.get(sprintId)}
    }
    default:
      return state
  }
}

const copySprintsMap = srcSprintsMap => {
  const copiedSprintsMap = new Map()

  for (const [srcSprintId, srcSprint] of srcSprintsMap.entries()) {
    const copiedStories = new Map()

    for (const [srcStoryId, srcStory] of srcSprint.stories.entries()) {
      const copiedTasks = new Map()

      for (const [srcTaskId, srcTask] of srcStory.tasks.entries()) {
        copiedTasks.set(srcTaskId, {...srcTask})
      }

      copiedStories.set(srcStoryId, {...srcStory, tasks: copiedTasks})
    }

    copiedSprintsMap.set(srcSprintId, {...srcSprint, stories: copiedStories})
  }

  return copiedSprintsMap
}

const copyBacklogCategoriesMap = srcBacklogCategoriesMap => {
  const copiedBacklogCategoriesMap = new Map()

  for (const [srcBacklogCategoryId, srcBacklogCategory] of srcBacklogCategoriesMap.entries()) {
    const copiedStories = new Map()

    for (const [srcStoryId, srcStory] of srcBacklogCategory.stories.entries()) {
      const copiedTasks = new Map()

      for (const [srcTaskId, srcTask] of srcStory.tasks.entries()) {
        copiedTasks.set(srcTaskId, {...srcTask})
      }

      copiedStories.set(srcStoryId, {...srcStory, tasks: copiedTasks})
    }

    copiedBacklogCategoriesMap.set(srcBacklogCategoryId, {...srcBacklogCategory, stories: copiedStories})
  }

  return copiedBacklogCategoriesMap
}

const sortItemsByForwardDirection = (a, aId, b, bId, sortTargetId, isUpForward) => {
  // 同じ表示順の場合、順番の変更方向によって変更対象（ストーリー、タスク）を優先的に前 or 後に並べる
  if(a.sortOrder === b.sortOrder){
    if (isUpForward) {
      if(aId === sortTargetId) return 1
      if(bId === sortTargetId) return -1
    } else {
      if(aId === sortTargetId) return -1
      if(bId === sortTargetId) return 1
    }
  } 
  
  // その他の場合は単純に昇順に並べる
  return a.sortOrder - b.sortOrder
}

const sortItems = (a, aId, b, bId, sortTargetId) => {
  // 同じ表示順の場合、変更対象（ストーリー、タスク）を優先的に前に並べる
  if(a.sortOrder === b.sortOrder){
    if(aId === sortTargetId) return -1
    if(bId === sortTargetId) return 1
  } 
  
  // その他の場合は単純に昇順に並べる
  return a.sortOrder - b.sortOrder
}

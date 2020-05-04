import Converter from './taskManagementConverter'
import API from './taskManagementApi'
import ApiErrorConverter from '../common/utils/api/apiErrorConverter'
import I18n from '../common/utils/i18n'

export default class TaskManagementService {
  static listSprints = async () => {
    return await API.listSprints()
      .then(res => {
        if (res.ok) {
          return Converter.toModelAll(res.json)
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("スプリントの取得に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static createSprint = async sprintToCreate => {
    const request = Converter.toSprintCreateRequest(sprintToCreate)

    return await API.createSprint(request)
      .then(res => {
        if (res.ok) {
          return { sprint: Converter.toModelSprint(res.json) }
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("スプリントの追加に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static updateSprint = async sprintToUpdate => {
    const request = Converter.toUpdateSprintRequest(sprintToUpdate)

    return await API.updateSprint(sprintToUpdate.id, request)
      .then(res => {
        if (res.ok) {
          return
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("スプリントの追加に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static createBacklogCategory = async bcToCreate => {
    const request = Converter.toBacklogCategoryCreateRequest(bcToCreate)

    return await API.createBacklogCategory(request)
      .then(res => {
        if (res.ok) {
          return { backlogCatgory: Converter.toModelBacklogCategory(res.json) }
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("バックログカテゴリーの追加に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static updateBacklogCategory = async bgToUpdate => {
    const request = Converter.toUpdateBacklogCategoryRequest(bgToUpdate)

    return await API.updateBacklogCategory(bgToUpdate.id, request)
      .then(res => {
        if (res.ok) {
          return { backlogCatgory: Converter.toModelBacklogCategory(res.json) }
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("バックログカテゴリーの変更に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static createStoryToSprint = async storyToCreate => {
    const request = Converter.toCreateStoryRequest(storyToCreate)

    return await API.createStoryToSprint(request)
      .then(res => {
        if (res.ok) {
          return { story: Converter.toModelStory(res.json) }
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("ストーリーの追加に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static createStoryToBacklogCategory = async storyToCreate => {
    const request = Converter.toCreateStoryRequest(storyToCreate)

    return await API.createStoryToBacklogCategory(request)
      .then(res => {
        if (res.ok) {
          return { story: Converter.toModelStory(res.json) }
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("ストーリーの追加に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static updateStoryName = async storyToUpdate => {
    const request = Converter.toUpdateStoryRequest(storyToUpdate)

    return await API.updateStoryName(storyToUpdate.id, request)
      .then(res => {
        if (res.ok) {
          return { story: Converter.toModelStory(res.json) }
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("ストーリー名の変更に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static changeStoryBelonging = async param => {
    const request = Converter.toChangeStoryBelongingRequest(param)

    return await API.changeStoryBelonging(request)
      .then(res => {
        if (res.ok) {
          return
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("ストーリーの移動に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static changeStorySortOrder = async param => {
    const request = Converter.toChangeStorySortOrderRequest(param)

    return await API.changeStorySortOrder(request)
      .then(res => {
        if (res.ok) {
          return
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("ストーリーの並び替えに失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static deleteStory = async storyId => {
    return await API.deleteStory(storyId)
      .then(res => {
        if (res.ok) {
          return
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("ストーリーの削除に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static changeTaskStatus = async param => {
    const request = Converter.toChangeTaskStatusRequest(param)

    return await API.changeTaskStatus(request)
      .then(res => {
        if (res.ok) {
          return
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("タスクのステータス変更に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }


  static changeTaskSortOrder = async param => {
    const request = Converter.toChangeTaskSortOrderRequest(param)

    return await API.changeTaskSortOrder(request)
      .then(res => {
        if (res.ok) {
          return
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("タスクの並び替えに失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static createTasks = async param => {
    const request = Converter.toCreateTasksRequest(param)

    return await API.createTasks(request)
      .then(res => {
        if (res.ok) {
          const tasks = []
          res.json.newTasks.forEach(newTask => tasks.push(Converter.toModelTask(newTask)));
          return { newTasks: tasks }
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("タスクの追加に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static updateStory = async storyToUpdate => {
    const request = Converter.toUpdateStoryRequest(storyToUpdate)

    return await API.updateStory(storyToUpdate.id, request)
      .then(res => {
        if (res.ok) {
          return { story: Converter.toModelStory(res.json) }
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("ストーリー名の変更に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static updateTask = async task => {
    const request = Converter.toUpdateTaskRequest(task)

    return await API.updateTask(task.id, request)
      .then(res => {
        if (res.ok) {
          return
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("タスクの変更に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

  static deleteTask = async taskId => {
    return await API.deleteTask(taskId)
      .then(res => {
        if (res.ok) {
          return
        }
        
        return { error: ApiErrorConverter.createApiErrMsg(res, I18n.get("タスクの削除に失敗しました")) }
      })
      .catch((error) => {
        return { error: ApiErrorConverter.createSysErrMsg(error) }
      })
  }

}
import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'

import Modal from '../../../common/component/Modal'
import BacklogCategory from './BacklogCategory'
import BacklogCategoryForm from './form/BacklogCategoryForm'
import Actions from '../sprintBacklogActions'


class BacklogColumn extends Component {

  state = {
    isOpenBacklogCategoryAdd: false
  }

  render() {
    const {backlogCategories, dispatch, isClosedView} = this.props

    const addBacklogCategory = (param) => {
      dispatch(Actions.addBacklogCategory(param))
      closeAddBacklogCategory()
    }

    const closeAddBacklogCategory = () => {
      this.setState({isOpenBacklogCategoryAdd: false})
    }

    return (
      <div style={{display: "flex", flexDirection: "column", width: "50%", marginLeft: "10px" }}>
        <div style={{margin: "3px"}}>
            {!isClosedView ? 
              <img src="imgs/plus.png" style={{cursor: "pointer"}}
                    onClick={() => this.setState({isOpenBacklogCategoryAdd: true})}/>
            : null}
            <span style={{verticalAlign: "middle", marginLeft: "3px"}}>バックログ</span>
        </div>
    
        {backlogCategories ? (
            <Fragment >
              {
                Array.from(backlogCategories.values())
                  .filter(backlogCategory => !isClosedView ? backlogCategory.status !== "end" : backlogCategory.status === "end")
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map(backlogCategory => (
                    <BacklogCategory backlogCategory={backlogCategory} key={backlogCategory.id}/>
                ))
              }
            </Fragment>
          ) : null}
        
          <Modal
            visible={this.state.isOpenBacklogCategoryAdd}
            onCancel={closeAddBacklogCategory}
            footer={null}
            destroyOnClose
            width={700}>
            <BacklogCategoryForm onSaveButtonClick={addBacklogCategory}/>
          </Modal>


      </div>
    )
  }
}

export default connect()(BacklogColumn)

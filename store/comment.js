import cloneDeep from 'lodash/cloneDeep'
export const state = () => ({
  comments: [],
})

export const mutations = {
  SET_COMMENTS(state, payload) {
    state.comments = state.comments.concat(payload)
  },
  UPDATE_COMMENT(state, payload) {
    editComment(payload.comment, state.comments, payload.level)
  },
  DELETE_COMMENT(state, payload) {
    let comments = cloneDeep(state.comments)
    deleteComment(payload.comment, comments, payload.level)
    state.comments = comments
  },
  CREATE_COMMENT(state, payload) {
    let comments = cloneDeep(state.comments)
    createComment(payload.comment, comments, payload.level)
    state.comments = comments
  },
}

function createComment(comment, comments, level, currentLevel = 0) {
  if (level === 0) {
    comments.push(comment)
  } else {
    for (let singleComment of comments) {
      if (!singleComment.hasOwnProperty('children')) {
        singleComment['children'] = []
      }
      if (comment.parent_id === singleComment.id) {
        singleComment.children.push(comment)
      } else {
        createComment(comment, singleComment.children, level, ++currentLevel)
      }
    }
  }
  return comments
}

function editComment(comment, comments, level, currentLevel = 0) {
  if (level === 0) {
    let commentIndex = comments.findIndex(
      (singleComment) => singleComment.id === comment.id
    )
    comments[commentIndex].body = comment.body
  } else {
    for (let singleComment of comments) {
      if (currentLevel === level) {
        if (comment.id === singleComment.id) {
          singleComment.body = comment.body
        }
      } else {
        if (singleComment.children)
          return editComment(
            comment,
            singleComment.children,
            level,
            ++currentLevel
          )
      }
    }
    return comments
  }
}

function deleteComment(comment, comments, level, currentLevel = 0) {
  if (level === 0) {
    let commentIndex = comments.findIndex(
      (singleComment) => singleComment.id === comment.id
    )
    comments.splice(commentIndex, 1)
  } else {
    for (let [i, singleComment] of comments.entries()) {
      if (comment.id === singleComment.id) {
        comments.splice(i, 1)
      } else {
        if (singleComment.children)
          deleteComment(comment, singleComment.children, level, ++currentLevel)
      }
    }
  }
  return comments
}

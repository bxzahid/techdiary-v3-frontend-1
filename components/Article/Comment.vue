<template>

  <div v-if='comment.children' class='my-3 pl-3 ml-5 border border-dashed border-gray-300 dark:border-gray-800 border-opacity-25 rounded'>
    <article-comment-body :comment='comment' :level='level'
                          :showReplyButton='showReplyButton' />
    <ArticleComment v-for='childComment in comment.children'
                    :comment='childComment'
                    :key='childComment.id'
                    :level='level + 1' />
  </div>
  <div class='my-3 pl-3 ml-5 border border-dashed border-gray-300 dark:border-gray-800 border-opacity-25 rounded' v-else>
    <article-comment-body :comment='comment'
                          :showReplyButton='showReplyButton' :level='level' />
  </div>

</template>

<script>
export default {
  props: ['comment', 'level'],
  data() {
    return {
      showReplyButton: this.level < 2
    }
  }
  // methods: {
  //   onReply(comment) {
  //     console.log({ currentComment: this.currentComment.id, parentId: comment.parent_id })
  //     if (this.currentComment.id === comment.parent_id) {
  //       if (!this.children) this.children = []
  //       this.children.push({
  //         ...comment,
  //         user: {
  //           id: this.$auth.user.id,
  //           name: this.$auth.user.name,
  //           profilePhoto: this.$auth.user.profilePhoto,
  //           username: this.$auth.user.username
  //         }
  //       })
  //     }
  //   },
  //   onDelete(comment) {
  //     this.currentComment.children = this.currentComment.children.filter(cmnt => cmnt.id !== comment.id)
  //   },
  //   onParentReply(comment) {
  //     this.$emit('reply', comment)
  //   },
  //   onParentDelete(comment) {
  //     this.$emit('delete', comment)
  //   }
  // }
}
</script>

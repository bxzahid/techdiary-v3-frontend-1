<template>

  <div v-if='comment.children' class='ml-5'>
    <article-comment-body :comment='comment' :showReplyButton='showReplyButton' />
    <ArticleComment v-for='childComment in comment.children' :comment='childComment' :key='childComment.id'
                    :level='level + 1' />
  </div>
  <div class='my-3 pl-3' v-else>
    <article-comment-body :comment='comment' :showReplyButton='showReplyButton' />
  </div>

</template>

<script>
export default {
  props: ['comment', 'level'],
  data() {
    return {
      showReplyButton: true
    }
  }
}
</script>

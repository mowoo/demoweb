var vm = new Vue({
  el: '#app',
  data: {
    keyword: '',
    loading: false,
    allPosts: [],
    selectedPosts: selectedPosts,
    currentPage: 1,
    has_next_page: false,
    end_cursor: ''
  },
  // computed: {
  //   selectedPosts() {
  //     return this.allPosts.filter(function (item, index, array) {
  //       return item.selected;
  //     });
  //   }
  // },
  methods: {
    change(e){
      this.keyword = e.target.value;
      this.allPosts = [];
      this.getData(`https://www.instagram.com/explore/tags/${this.keyword}/?__a=1`);
    },
    getData(url) {
      var self = this;
      self.loading = true;

      $.ajax({
        url: url,
        dataType: 'json',
        success: function(data){
          var posts = data.graphql.hashtag.edge_hashtag_to_media.edges;
          posts.forEach(function (item, index, array) {
            item['selected'] = false;

            var id = item.node.id;
            // 檢查是否在已選擇的名單中
            for(let i=0; i<self.selectedPosts.length; i++){
              if(id == selectedPosts[i].id){
                item['selected'] = true;
              }
            }

            self.allPosts.push(item);
          });

          self.has_next_page = data.graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page;
          self.end_cursor = data.graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor;
        
          self.loading = false;
        },
        error: function(err){
          self.loading = false;
          self.has_next_page = false;
          self.end_cursor = '';
          alert('無資料');
        }
      });
    },
    wrapTag(str) {
      return str
        .replace(/(?:#)([A-Za-z0-9_\u4e00-\u9fa5](?:(?:[A-Za-z0-9_\u4e00-\u9fa5]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_\u4e00-\u9fa5]))?)/g, '<span class="tag">#$1</span>')
        .replace(/(?:\r\n|\r|\n)/g, '<br>');
    },
    selected(idx, id, e) {
      this.allPosts[idx].selected = !this.allPosts[idx].selected;

      if(this.allPosts[idx].selected){ // 選取
        this.selectedPosts.push({
          id: this.allPosts[idx].node.id,
          time: this.allPosts[idx].node.taken_at_timestamp,
          pic: this.allPosts[idx].node.thumbnail_src,
          content: this.allPosts[idx].node.edge_media_to_caption.edges[0].node.text
        });
      }else{ // 取消
        let index = 0;
        for(let i=0; i<this.selectedPosts.length; i++){
          if(id == this.selectedPosts[i].id){
            index = i;
            break;
          }
        }
        this.selectedPosts.splice(index, 1);
      }
    },
    loadmore(){
      if(this.loading){
        return;
      }
      this.getData(`https://www.instagram.com/explore/tags/${this.keyword}/?__a=1&max_id=${this.end_cursor}`);
    },
    save() {
      // 排序
      var final = this.selectedPosts.sort(function (a, b) {
        return b.time - a.time;
      });

      $.post("save.php", { data: JSON.stringify(final) }, function (result) {
        if (result == 'success') {
          alert('已儲存');
        } else {
          alert('ERROR!!!!!!')
        }
      });
    }
  }
});
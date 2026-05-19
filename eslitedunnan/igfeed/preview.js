var vm = new Vue({
    el: '#app',
    data: {
        list: [],
        msnry: null
    },
    mounted() {
        this.getRandomData();
    },
    methods: {
        getRandomData() {
            fetch(`https://www.instagram.com/explore/tags/%E6%95%A6%E5%8D%97%E8%AA%A0%E5%93%81/?__a=1`)
                .then(response => response.json())
                .then(data => {
                    this.list = data.graphql.hashtag.edge_hashtag_to_media.edges;
                    this.$nextTick(() => {
                        if (!this.msnry) {
                            this.initMasonry();
                        } else {
                            this.msnry.reloadItems();
                            this.msnry.layout();
                        }
                        var self = this;
                        imagesLoaded('.grid').on('progress', () => self.msnry.layout());
                    });
                })
                .catch((err) => {
                    console.log('error:', err);
                });
        },
        initMasonry() {
            this.msnry = new Masonry('.grid', {
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
            });
        },
        wrapTag(str) {
            // return str.replace(/\#([^*]+) /g , '<span class="tag">$1</span> ');
            return str.replace(/(?:#)([A-Za-z0-9_\u4e00-\u9fa5](?:(?:[A-Za-z0-9_\u4e00-\u9fa5]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_\u4e00-\u9fa5]))?)/g , '<span class="tag">#$1</span>');
        },
        dateFormat(timestamp) {
            var d = new Date(timestamp * 1000);
            var year = d.getFullYear();
            var month = d.getMonth()+1;
            var date = d.getDate();
            var hours = d.getHours();
            var minutes = "0" + d.getMinutes();
            var seconds = "0" + d.getSeconds();
            return year + '/' + month + '/' + date + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        }
    }
})
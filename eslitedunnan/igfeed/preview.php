<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <title>Document</title>
    <style>
    * {
    box-sizing: border-box;
    font-family: 'Microsoft JhengHei';
    }

    body {
        background: #f8f8f8;
    }
    h1 {
        text-align: center;
    }

    .list {
        max-width: 800px;
        margin: 0 auto;
    }
    .list .grid {
        width: 100%;
        overflow: hidden;
    }
    .list .grid .grid-sizer {
        width: 33.333%;
    }
    .list .grid .grid-item {
        float: left;
        width: 33.333%;
        padding: 0 5px;
    }
    .list .grid .grid-item > div {
        margin-bottom: 10px;
        background: #ffffff;
        box-shadow: 0 0 4px #d4d4d4;
    }

    .post-photo {
        display: block;
        width: 100%;
    }
    .info {
        padding: 15px 10px 0 10px;
        color: gray;
    }
    .text {
        padding: 5px 10px 10px 10px;
        color: #4b4b4b;
        font-size: 15px;
        word-break: break-all;
    }
    span.tag {
        color: #00376b;
        word-wrap: break-word;
        display: inline-block;
    }
    </style>
</head>
<body>
    <h1>#敦南誠品</h1>
    <div id="app">
        <div class="list">
            <div class="grid">
                <div class="grid-sizer"></div>
                <div v-for="d in list" class="grid-item">
                    <div>
                        <img :src="d.node.thumbnail_src" class="post-photo">
                        <div class="info">
                            <i class="far fa-heart"></i> {{d.node.edge_liked_by.count}}　
                            <i class="far fa-comment"></i> {{d.node.edge_media_to_comment.count}}
                        </div>
                        <div class="text" v-html="wrapTag(d.node.edge_media_to_caption.edges[0].node.text)">{{wrapTag(d.node.edge_media_to_caption.edges[0].node.text)}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js"></script>
    <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.js"></script>
    <script src="preview.js?<?=time()?>"></script>

</body>
</html>
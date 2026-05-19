<?php
$data = file_get_contents("../ig/data.json");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name='robots' content='noindex, nofollow, noarchive'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <title>IG貼文篩選</title>
    <style>
    body { font-size: 14px; }
    #app { padding: 100px 0 40px 0; }
    .photo { width: 100px; height: 100px; position: relative; /*padding-top: 100%;*/ }
    .photo img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; }
    .tag { color: #00376b; word-wrap: break-word; display: inline-block; }
    .fix { position: fixed; bottom: 50px; right: 30px; }
    </style>
</head>
<body>

    <nav class="navbar navbar-expand-sm bg-light navbar-light fixed-top justify-content-center">
        <!-- <a class="navbar-brand" href="#">Logo</a> -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="./">最新</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="./current.php">已選擇</a>
            </li>
        </ul>
    </nav>

    <div id="app">
        <div class="container">
            <center>
                <h2>已選擇</h2><br>
            </center>
            <table class="table table-hover">
                <tr v-for="(d, idx) in data">
                    <td>{{idx+1}}</td>
                    <td>
                        <div class="photo">
                            <img :src="d.pic">
                        </div>
                    </td>
                    <td>
                        <div class="text" v-html="wrapTag(d.content)">{{wrapTag(d.content)}}</div>
                    </td>
                    <td width="75">
                        <button class="btn btn-outline-danger btn-sm" @click="deleteItem(idx)">刪除</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script>
    new Vue({
        el: '#app',
        data: {
            data: <?= $data ?>
        },
        methods: {
            wrapTag(str) {
                return str
                    .replace(/(?:#)([A-Za-z0-9_\u4e00-\u9fa5](?:(?:[A-Za-z0-9_\u4e00-\u9fa5]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_\u4e00-\u9fa5]))?)/g, '<span class="tag">#$1</span>')
                    .replace(/(?:\r\n|\r|\n)/g, '<br>');
            },
            deleteItem(idx){
                this.data.splice(idx, 1);
                var self = this;
                $.post("save.php", { data: JSON.stringify(self.data) }, function (result) {
                    if (result == 'success') {
                        alert('已刪除');
                    } else {
                        alert('ERROR!!!!!!')
                    }
                });
            }
        }
    });
    </script>
</body>
</html>
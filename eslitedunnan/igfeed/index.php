<?php
$data = file_get_contents("../ig/data.json");
// $data = json_decode($data, true);
// $data = array_column($data, 'id');
// $data = json_encode($data);
// echo '<pre>'; print_r($data); echo '</pre>';
// die();
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
            <li class="nav-item active">
                <a class="nav-link" href="./">最新</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./current.php">已選擇</a>
            </li>
        </ul>
    </nav>

    <div id="app">
        <div class="container">
            <center>
                <h2>最新</h2>
                <select @change="change($event)">
                    <option value="">-- 選擇 hashtag --</option>
                    <option value="誠品敦南">誠品敦南</option>
                    <option value="敦南熄燈">敦南熄燈</option>
                    <option value="敦南誠品">敦南誠品</option>
                    <option value="再見敦南">再見敦南</option>
                </select><br><br>
            </center>
            <table class="table table-hover">
                <tr :class="{ 'table-warning': d.selected }" v-for="(d, idx) in allPosts">
                    <td>
                        <input type="checkbox" @change="selected(idx, d.node.id, $event)" :checked="d.selected">
                    </td>
                    <td>
                        <div class="photo">
                            <img :src="d.node.thumbnail_src" class="post-photo">
                        </div>
                    </td>
                    <td>
                        <div class="text" v-if="d.node.edge_media_to_caption.edges.length>0" v-html="wrapTag(d.node.edge_media_to_caption.edges[0].node.text)">{{wrapTag(d.node.edge_media_to_caption.edges[0].node.text)}}</div>
                    </td>
                </tr>
            </table>

            <p v-if="loading">loading...</p>

            <center>
                <button 
                    type="button" 
                    :class="{
                        'btn': true,
                        'btn-lg': true,
                        'btn-primary': !loading,
                        'btn-secondary': loading
                    }" 
                    v-if="has_next_page"
                    @click="loadmore()"
                >
                    繼續載入
                </button>
            </center>
        </div>
        
        <div class="fix">
            <!-- <div>已選{{selectedPosts.length}}則</div> -->
            <button class="btn btn-danger" @click="save()">儲存</button>
        </div>

    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script>var selectedPosts = <?= $data ?>;</script>
    <script src="main.js?<?=time()?>"></script>
</body>
</html>
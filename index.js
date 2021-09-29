const express = require('express')
const app = express()
const port = 3000


//디비연결을 위해 모델 폴더에 요청함
const connect = require('./models');
connect();

//미들웨어 사용을위한코드 req.body를 하기위해서 
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
//ejs를 랜더탬플릿해주기 위한 코드
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//board 게시글 라우터
const boardRouter = require("./routers/board");
app.use('/api', [boardRouter]);


// 최초 접속 화면은 로그인 화면이어야 하므로 그냥 둠
app.get('/', (req, res) => {
    let e_date = new Date()
    let date = e_date.getFullYear() + '-' + ('0' + (e_date.getMonth() + 1)).slice(-2) + '-' + ('0' + e_date.getDate()).slice(-2) +
        '-' + e_date.getHours() + '-' + e_date.getMinutes() + '-' + e_date.getSeconds()
    console.log(date)
    console.log(e_date)
    res.send(date)
})

//전체 게시판
app.get('/home', (req, res) => {
    res.render('index');
})

//특정 게시글 상세 페이지
app.get('/detail', (req, res) => {
    res.render('detail');
})

//게시글 작성 페이지
app.get('/post', (req, res) => {
    res.render('post');
})

//게시글 수정 및 삭제 페이지
app.get('/edit', (req, res) => {
    res.render('edit');
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
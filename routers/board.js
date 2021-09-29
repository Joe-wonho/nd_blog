const express = require("express");
const Boards = require("../models/board");
const router = express.Router();

router.get("/board", async (req, res, next) => {
    try {
        const boards = await Boards.find().sort("-date");
        res.json({
            boards: boards
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get("/board/:boardId", async (req, res) => {
    const {
        boardId
    } = req.params;
    boards = await Boards.findOne({boardId: boardId});
    res.json({ detail: boards});
});

//글쓰기 저장 기능
router.post('/board', async (req, res) => {
    const {
        title,
        username,
        post_pw,
        contents
    } = req.body;

    const e_date = new Date();
    const boardId = e_date;
    const date = e_date.getFullYear() + '-' + ('0' + (e_date.getMonth() + 1)).slice(-2) + '-' + ('0' + e_date.getDate()).slice(-2) +
        '-' + e_date.getHours() + '-' + e_date.getMinutes() + '-' + e_date.getSeconds()

    isExist = await Boards.find({
        boardId
    });

    if (isExist.length == 0) {
        await Boards.create({
            boardId,
            title,
            username,
            post_pw,
            date,
            contents
        });
    }
    res.send({ result: "success" });
});

//게시글 삭제기능
router.delete("/board/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const { post_pw } = req.body;
    const deleteBoard = await Boards.findOne({boardId:boardId});
    isExist=deleteBoard;
    let action = "";

    if (isExist && deleteBoard["post_pw"] == post_pw) {
        await Boards.deleteOne({boardId});
        res.send({action: "success"});

    } else{
        res.send({action: "fail"});
    }
    
});

//게시글 수정기능
router.patch("/board/:boardId", async (req, res) => {
    const {  boardId   } = req.params;
    const {  title,   username,  post_pw, contents } = req.body;
    const updating_Board = await Boards.findOne({boardId:boardId});
    isExist=updating_Board;
    let action = "";

    if (updating_Board["post_pw"] == post_pw && isExist ) {
           
        await Boards.updateOne({ boardId }, { $set: { title, username, contents } });
        
            res.send({action: "success"});
        } else {
            res.send({action: "fail"});
        }
})





// goEdit버튼 누르면 id값을 받아서 edit페이지로 이동하기 위한 라우터 설정 질문해봐야곘다
// router.get("/board/:boardId", async (req, res) => {
//     const {
//         boardId
//     } = req.params;
//     boards = await Boards.findOne({
//         boardId: boardId
//     });
//     res.json({edit: boards});
// });


module.exports = router;
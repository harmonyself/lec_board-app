import React from 'react';
import {Row, Col, Button, ButtonGroup, ListGroup} from 'react-bootstrap';

import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

export default function BoardDetail({match, history}) {
    
    const boardId = parseInt(match.params.boardId);
    const [targetBoard, setTargetBoard] = React.useState({title: '', content: ''});
    // const [targetBoard, setTargetBoard] = React.useState([]);
        
    React.useEffect(()=>{
        fetch(`/api/board/${boardId}`, {
            method: 'GET',
        }).then(response=>{
            return response.json();
        }).then(data=>{
            setTargetBoard(data.result[0])
        })
    }, []);
 
    const onDelete = function(boardId) {
        fetch(`/api/board/${boardId}`, {
            method: 'DELETE'
        }).then(resp=>{
            return resp.json();
        }).then(data=>{
            if (data.status === 'success'){
                history.push('/board')
            }
        })
    }

    const postComment = function(comment) {
        fetch(`/api/board/${boardId}/comment`, {
            method: 'POSt',
            headers: {
                'CONTENT-TYPE': 'application/json'
            },
            body: JSON.stringify({
                comment: comment
            })
        }).then(resp=>{
            return resp.json()
        }).then(data=>{
            console.log(data);
        })
    }

    const [commentList, setCommentList] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);
    
    React.useEffect(() => {
        fetch(`/api/board/${boardId}/comment`, {
            method: 'GET',
        }).then(resp=>{
            return resp.json();
        }).then(data=>{
            console.log(data);
            setCommentList(data.result);
        })
    }, []); // 바뀔때마다 보낸다.

    return (
        <div>
            <Row>
                <Col>
                    <h3>{targetBoard.title}</h3>
                    <div style={{border:"1px solid black", padding:10, minHeight:250}}>
                        {targetBoard.content}
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop: 20}}>
                <Col>
                <ButtonGroup style={{float:'right'}}>
                    <Button onClick={()=>{history.push(`/boardEdit/${boardId}`)}} variant='info'>수정</Button>
                    <Button onClick={()=>{onDelete(boardId);}} variant='danger'>삭제</Button>
                </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CommentInput onPost={postComment} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CommentList onDelete={()=>{}} commentList={commentList} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {commentList.map(comment=>(
                            <ListGroup.Item action>
                                {comment.comment}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}
import React from 'react';
import {Row, Col, Form, Button, ButtonGroup} from 'react-bootstrap'

export default function BoardWrite({history}){
    const [titleInput, setTitleInput] = React.useState('');
    const [contentInput, setContentInput] = React.useState('');

    const onPost = function(boardData){
        const {title, content} = boardData;
        console.log(title, content)
        fetch('/api/board', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then(response=>{
            return response.json()          
        }).then(data=>{
            console.log(data);
            history.push('/board');
        })
    }

    return (
        <div>
            <Row>
                <Col>
                <div>
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" value={titleInput} onChange={(e)=>{
                        setTitleInput(e.target.value);
                    }} />
                </div>
                <div>
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={7} value={contentInput} onChange={(e)=>{
                        setContentInput(e.target.value);
                    }} />
                </div>
                </Col>
            </Row>
 
            <Row style={{marginTop: 20}}>
                <Col>
                <ButtonGroup style={{float:'right'}}>
                    <Button onClick={
                        ()=>{
                            console.log(titleInput)
                            onPost({title:titleInput, content:contentInput})
                            history.push('/board');
                        } 
                    }
                    variant='info'>작성</Button>
                </ButtonGroup>
                </Col>
            </Row>
        </div>
    )
}
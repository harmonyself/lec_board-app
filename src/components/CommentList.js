import React from 'react';
import {ListGroup} from 'react-bootstrap';

export default function CommentList({commentList, onDelete}) {

    return (
        <ListGroup>
            {commentList.map(comment=>(
                <ListGroup.Item action>
                    {comment.comment}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
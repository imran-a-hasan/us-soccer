import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';


function MatchVideos({matchId}) {

    const [showForm, setShowForm] = useState(false);

    return (
        <span>
            <Button className='match-videos' onClick={() => setShowForm(!showForm)}>
                &#127909;
            </Button>
        {showForm && 
            <Form className='match-videos-form'>
                <span className='match-videos-form-title'>Have a link to a goal/assist/highlight video? Send it in here!</span>
                <Form.Group>
                    <Form.Control className='match-videos-form-text' placeholder={`Title (e.g. 1st goal [27'])`} />
                </Form.Group>
                <Form.Group>
                    <Form.Control className='match-videos-form-text' placeholder='Link' />
                </Form.Group>
                <Button className='match-videos-form-text' variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
        }
        </span>
        
    );
}

export default MatchVideos;
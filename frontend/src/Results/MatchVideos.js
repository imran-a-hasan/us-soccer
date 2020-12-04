import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';


function MatchVideos({matchId, playerName, homeTeamName, awayTeamName}) {

    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [links, setLinks] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (!links) {
            fetch(encodeURI(`https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetAcceptedLinks?matchId=${matchId}&playerName=${playerName}`))
                .then(res => res.json())
                .then(res => {
                    setLinks(res);
                });
        }
    }, [matchId, playerName, links]);

    useEffect(() => {
        if (submitted) {
            setTimeout(() => {
                setSubmitted(false);
            }, 1500)
        }
    }, [submitted])

    const submitLink = event => {
        event.preventDefault();
        const formData = new FormData(event.target),
                formDataObj = Object.fromEntries(formData.entries())
        fetch('https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/SubmitLink', {
            method: 'POST',
            body: JSON.stringify({
                matchId: matchId,
                title: formDataObj.title,
                url: formDataObj.link,
                playerName: playerName,
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName
            })
        });
        formRef.current.reset();
        setSubmitted(true);
    };

    function showLinks() {
        if (links) {
            const linksList = [];
            links.forEach(link => {
                linksList.push
                (
                    <div className='match-video-link-container'>
                        <a className='match-video-link' href={link.url}>{link.title}</a>
                    </div>
                );
            });
            return <div className='match-video-links-list'> {linksList} </div>;
        }
    }

    return (
        <span>
            <Button className='match-videos' onClick={() => setShowForm(!showForm)}>
                <span role='img' aria-label='highlights'>&#127909;</span>
            </Button>
            <div className='match-videos-container'>
                {showForm && links && showLinks()}
                {showForm && 
                    <Form ref={formRef} className='match-videos-form' onSubmit={submitLink}>
                        <span className='match-videos-form-title'>Have a link to a goal/assist/highlight video? Send it in here!</span>
                        <Form.Group>
                            <Form.Control name='title' className='match-videos-form-text' required placeholder={`Title (e.g. 1st goal [27'])`} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control name='link' className='match-videos-form-text' required placeholder='Link' />
                        </Form.Group>
                        <Button className='match-videos-form-text' variant="dark" type="submit">
                            {submitted ? 'Thanks!' : 'Submit'}
                        </Button>
                    </Form>
                }
            </div>
            
        </span>
        
    );
}

export default MatchVideos;
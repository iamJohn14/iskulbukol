//AddCourse.js


import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddCourse({ fetchData }) {

    //Add state for the forms of adding a course
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    //States for opening and closing the modals
    const [showAdd, setShowAdd] = useState(false);

    //Functions to handle opening and closing of our Modal
    const openAdd = () => setShowAdd(true);
    const closeAdd = () => setShowAdd(false);

    //function for adding a course
    const addCourse = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/courses/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data) {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Course successfully added'
                    })

                    //Close our modal
                    closeAdd()
                    // you can use this as an alternative to refresh the whole document and get the updated data
                    // window.location.reload()
                    fetchData()
                } else {
                    Swal.fire({
                        title: 'error',
                        icon: 'error',
                        text: 'Please try again'
                    })

                    fetchData()
                }

                //reset all states input
                setName('')
                setDescription('')
                setPrice(0)
            })


    }

    return (
        <>
            <Button variant="primary" onClick={openAdd}>Add New Course</Button>

            {/* Add Modal */}

            <Modal show={showAdd} onHide={closeAdd}>
                <Form onSubmit={e => addCourse(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Course</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAdd}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </>











    )
}
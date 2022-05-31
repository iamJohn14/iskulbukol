import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2'

export default function EditCourse({ course, fetchData }) {

    // states for editCourse modal
    const [showEdit, setShowEdit] = useState(false)

    // state hook for the course data
    const [courseId, setCourseId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // function openEdit to still get the data to the form while opening the modal

    const openEdit = (courseId) => {
        fetch(`https://iskulbukol.herokuapp.com/courses/${courseId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                // populate all input values with the course information that we fetched
                setCourseId(data._id)
                setName(data.name)
                setDescription(data.description)
                setPrice(data.price)
            })

        setShowEdit(true)
    }

    // Function to handle the closing of the modal and reset all relevant states back to their default value

    const closeEdit = () => {
        setShowEdit(false)
        setName('')
        setDescription('')
        setPrice(0)
    }

    // Function to change or update the specific course
    const editCourse = (e, courseId) => {
        e.preventDefault();

        fetch(`https://iskulbukol.herokuapp.com/courses/${courseId}`, {
            method: 'PUT',
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
                if (data === true) {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Course successfully updated'
                    })
                    fetchData()
                    closeEdit()
                } else {
                    Swal.fire({
                        title: 'error',
                        icon: 'error',
                        text: 'Please try again'
                    })
                    fetchData()
                    closeEdit()
                }
            })
    }

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => openEdit(course)}>Update
            </Button >


            {/* Edit Modal */}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editCourse(e, courseId)}>
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
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>

                </Form>
            </Modal>



        </>
    )
}


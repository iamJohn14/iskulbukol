import { useState, useContext, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { useParams, Link, useNavigate } from 'react-router-dom';
//useParams() contains any values we are trying to pass in the URL stored
//useParams is how we receive the courseId passed via the URL

export default function SpecificCourse() {

    const navigate = useNavigate();

    const { courseId } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);


    useEffect(() => {

        fetch(`https://iskulbukol.herokuapp.com/courses/${courseId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name)
                setDescription(data.description)
                setPrice(data.price)
            })

    }, [])

    const { user } = useContext(UserContext);


    //enroll function
    const enroll = (courseId) => {

        fetch('https://iskulbukol.herokuapp.com/users/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                courseId: courseId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data) {
                    Swal.fire({
                        title: 'Successfully enrolled!',
                        icon: 'success',
                        text: `You have successfully enrolled for this ${name}`
                    })

                    navigate('/courses')
                } else {
                    Swal.fire({
                        title: 'error!',
                        icon: 'error',
                        text: 'Something went wrong, please try again'
                    })
                }
            })
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <h4>{name}</h4>
                </Card.Header>

                <Card.Body>
                    <Card.Text>{description}</Card.Text>
                    <h6>Price: Php {price} </h6>
                </Card.Body>

                <Card.Footer>
                    {user.accessToken !== null ?
                        <Button variant="primary" onClick={() => enroll(courseId)}>Enroll</Button>
                        :
                        <Button variant="warning" as={Link} to="/login">Login to Enroll</Button>
                    }


                </Card.Footer>
            </Card>
        </Container>

    )
}
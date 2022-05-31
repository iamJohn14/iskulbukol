// React bootsrap components
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';




export default function Banner(props) {
    return (
        <Row>
            <Col className='p-5'>

                <h1> Hello! {props.name} {props.age}</h1>

                <h1 className='mb-3'>Zuitt Coding Bootcamp</h1>
                <h3 className='mb-3'>Batch 176</h3>
                <p className='mb-3'>Opportunities for everyone, everywhere.</p>
                <Button variant="primary" as={Link} to='/courses'>Enroll now!</Button>
            </Col>
        </Row>




    )
}
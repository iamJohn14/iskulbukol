import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveCourse({ course, isActive, fetchData }) {

    const archiveToggle = (courseId) => {
        fetch(`http://localhost:4000/courses/${courseId}/archive`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    Swal.fire({
                        title: 'success',
                        icon: 'success',
                        text: 'Course successfully disabled'
                    })
                    fetchData()
                } else {
                    Swal.fire({
                        title: 'error',
                        icon: 'error',
                        text: 'Something went wrong'
                    })
                    fetchData()
                }
            })
    }

    const activateToggle = (courseId) => {
        fetch(`http://localhost:4000/courses/${courseId}/activate`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    Swal.fire({
                        title: 'success',
                        icon: 'success',
                        text: 'Course successfully enabled'
                    })
                    fetchData()
                } else {
                    Swal.fire({
                        title: 'error',
                        icon: 'error',
                        text: 'Something went wrong'
                    })
                    fetchData()
                }
            })
    }

    return (

        <>

            {isActive ?
                <Button variant="danger" size="sm" onClick={() => archiveToggle(course)}>Disable</Button>

                :

                <Button variant="success" size="sm" onClick={() => activateToggle(course)}>Enable</Button>

            }

        </>
    )
}
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AddCourse from './AddCourse';




export default function AdminView(props) {

    const { coursesData, fetchData } = props;

    const [courses, setCourses] = useState([])


    useEffect(() => {

        const coursesArr = coursesData.map(course => {
            return (
                <tr key={course._id}>
                    <td>{course._id}</td>
                    <td>{course.name}</td>
                    <td>{course.description}</td>
                    <td>{course.price}</td>
                    <td className={course.isActive ? "text-success" : "text-danger"}>{course.isActive ? "Available" : "Unavailable"}</td>

                </tr>
            )
        })

        setCourses(coursesArr)
    }, [coursesData])

    return (
        <>
            <div className='text-center my-4'>
                <h1> Admin Dashboard</h1>
                <AddCourse fetchData={fetchData} />
            </div>
            <Table striped bordered hover responsive>
                <thead className='bg-dark text-white'>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>AVAILABILITY</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {courses}
                </tbody>
            </Table>
        </>
    )
}
import CourseCard from './CourseCard';
import { useState, useEffect } from 'react';


export default function UserView({ coursesData }) {

    const [courses, setCourses] = useState([])

    // we write our .map inside the useEffect to render the rapid changes of the data
    useEffect(() => {

        const coursesArr = coursesData.map(course => {
            // Only render the active courses
            if (course.isActive === true) {
                return (
                    <CourseCard key={course._id} courseProp={course} />
                )
            } else {
                return null
            }
        })

        // set the courses state to the result of our map function, to bring our return course component outside of the scope of our useEffect where our return statement below can see.

        setCourses(coursesArr)

    }, [coursesData])



    return (

        <>
            {courses}
        </>
    )
}
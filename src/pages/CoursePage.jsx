import UserView from "../components/UserView.jsx";
import AdminView from "../components/AdminView.jsx";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";




export default function CoursePage() {
    /*  // Check if the mock data was captured
     // console.log(coursesData);
 
     // PHP Laravel
     // console.log(coursesData[0]);
 
     // For us to be able to display all the courses from the data file we are going to use the map() method
     const courses = coursesData.map(individualCourse => {
         return (
             <CourseCard key={individualCourse.id} courseProp={individualCourse} />
 
             // add key property to keep track the number of courses and to avoid duplication
         )
     }) */


    const [allCourses, setAllCourses] = useState([])


    const fetchData = () => {
        fetch('http://localhost:4000/courses/all')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // storing all the data to our useState allCourses
                setAllCourses(data)
            })
    }

    // it renders the function fetchData() => it gets the updated data coming from the fetch
    useEffect(() => {
        fetchData()
    }, [])
    // if the useEffect has no variables, it will only render one time

    const { user } = useContext(UserContext);

    return (
        <>
            <h1>Courses</h1>
            {(user.isAdmin === true) ?
                <AdminView coursesData={allCourses} fetchData={fetchData} />

                :

                <UserView coursesData={allCourses} />
            }


        </>
    )
}
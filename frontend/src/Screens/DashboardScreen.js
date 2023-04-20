import axios from "axios";
import { useEffect, useReducer, useState } from "react"
import Chart from 'react-google-charts'
import {baseUrl} from '../lib';



export const DashboardScreen = () => {

    const [empData, setEmpData] = useState([]);


    const fetchData = async () => {

        try {

            const {data} = await axios.get(
                `${baseUrl}/api/emp/summary`
            )
            console.log('data', data);

            setEmpData(data);
        }

        catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="dashboardScreen">


        <h1>Dashboard</h1>

        <div className="emps">
            <h3>No of Employee</h3>
            {
                empData && empData.emp && 
                empData.emp[0].numEmp ? empData.emp[0].numEmp : 0
            }
        </div>


        <div className="ageChart">
            <h3>Age Distribution</h3>
            {
                empData && empData.ageCategories &&
                <Chart
                width="100%"
                height="400px"
                chartType="Bar"
                loader={<div>Loading Chart...</div>}
                data={[
                    ['Category', 'Age'],
                    ...empData.ageCategories.map((x) => [x._id, x.countAge]),
                ]}
                options={{chart: {
                    title: "Employee Age Chart",
                    subtitle: "Different Age Groups",
                }}}   
                ></Chart>
            }
        </div>


        <div className="departmentChart">
            <h3>Department Distribution</h3>
            {
                empData && empData.departmentCategories &&
                <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                    ['Category', 'Department'],
                    ...empData.departmentCategories.map((x) => [x._id, x.countDepartment]),
                ]}
                options={{chart: {
                    title: "Employee Department Chart",
                    subtitle: "Different Departments",
                }}}   
                ></Chart>
            }
        </div>



        <div className="departmentChart">
            <h3>Status Distribution</h3>
            {
                empData && empData.statusCategories &&
                <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                    ['Category', 'Status'],
                    ...empData.statusCategories.map((x) => [x._id, x.countStatus]),
                ]}
                options={{chart: {
                    title: "Employee Status Chart",
                    subtitle: "Different Status",
                }}} 
                ></Chart>
            }
        </div>

        </div>
    )
}
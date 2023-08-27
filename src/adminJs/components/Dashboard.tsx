import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

export default function Dashboard() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const [data, setData] = useState({
        labels: [""],
        datasets: [{
            label: "Alunos por Curso",
            data: [0],
            borderWidth: 1
        }]
    });

    const api = axios.create({
        baseURL: "http://localhost:3333/courses/dashboard"
    });

    interface CourseDashboar {
        description: string,
        numberOfSubscribers: number
    }


    useEffect(() => {
        const labels: string[] = [];
        const data: number[] = [];
        api.get<CourseDashboar[]>("")
            .then(result => {
                result.data.forEach(course => {
                    labels.push(course.description);
                    data.push(course.numberOfSubscribers);
                });

                setData(
                    {
                        labels,
                        datasets: [{
                            label: "Alunos por Curso",
                            data,
                            borderWidth: 1
                        }]
                    }
                );
            });
    }, []);

    return (
        <Bar data={data} />
    );
}
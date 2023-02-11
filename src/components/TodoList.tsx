import React  from 'react'
import type { Todo } from '@prisma/client'
import { useQuery } from "react-query";
import axios from "axios"

export const TodoList = () => {
    
    const fetchTodos = async () => {
        return axios("http://localhost:3000/api/listTodos").then(res => res)
    }
    const { isSuccess, isLoading, isError, data } = useQuery("todos", fetchTodos)
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (isError) {
        return <h1>ERROR!!!!</h1>
    }
    if (isSuccess) {
        console.log(data)
        const res: Todo[] = data.data
        return (
            <>
                <h1>Todos:</h1>
                {res.map((item) => {
                        return (
                        <>
                        <h1 key={item.id}>{item.title}</h1>
                        <h1 key={item.id}>{item.desc}</h1>
                        <h1 key={item.id}>{item.status}</h1>
                        </>
                        )
                    })}
            </>
        )
    }
}

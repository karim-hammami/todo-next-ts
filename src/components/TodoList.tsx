import React from 'react'
import type { Todo } from '@prisma/client'
import { useQuery } from "react-query";
import axios from "axios"
import { Box, Button, Center, Flex, Tag, Text } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

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
            <Center flex="true" alignItems="center" justifyContent="center">
                <Flex alignItems="center" justify="center" direction="column" >
                    {res.map((item) => {
                        return (
                            <>
                                <Box borderWidth="1px" borderRadius="xl" m="5" p="5" display="flex" justifyContent="space-between" gap="10" w={900}>
                                    <Tag key={item.id} variant="solid" colorScheme="teal" fontSize="3xl">{item.status}</Tag>
                                    <Text key={item.id} fontSize="3xl">{item.title}</Text>
                                    <Box >
                                    <Button mx="5" leftIcon={<EditIcon />} colorScheme="teal">Edit</Button>
                                    <Button mx="5" leftIcon={<DeleteIcon />} colorScheme="red">Delete</Button>
                                    </Box>
                                </Box>
                            </>
                        )
                    })}

                </Flex>
            </Center>
        )
    }
}

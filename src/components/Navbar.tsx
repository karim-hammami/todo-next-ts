import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export const Navbar = () => {
    return (
        <Box p="10" backgroundColor="teal" shadow="md">
           <Text fontSize="4xl" color="white" textAlign="center">Todo</Text> 
        </Box>
    )
}

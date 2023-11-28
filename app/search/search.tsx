'use client'

import { SearchProps, UsersData } from "@/types"
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Input, Text, useDisclosure } from "@chakra-ui/react"
import * as yup from 'yup';
import { useFormik } from "formik"
import { useState } from "react";
import UserDetails from "./userDetail";

const validationSchema = yup.object().shape({
    search: yup.string().email('Invalid email'),
})

const Search: React.FC<SearchProps> = ({ data }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [list, setList] = useState<UsersData[]>([])
    const form = useFormik({
        initialValues: {
            search: ''
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        },
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        form.handleChange(e)
        
        const result = data.filter(user => user.email.includes(value))
        setList(result)
    }

    return(
        <Box>
            <Box w={'50%'}>
                <Input 
                    w='100%' 
                    variant='outline' 
                    type='email' 
                    border={`1px solid ${form.errors.search ? 'red' : '#777'}`}
                    placeholder='e.g. john.smith@gmail.com'
                    value={form.values.search}
                    onChange={handleSearch}
                    onBlur={form.handleBlur}
                    name="search"
                />
                {
                    list && list.map(item => (
                        <Card mt={8}>
                            <CardHeader>
                                <Heading size='md'>{item.name}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>{item.email}</Text>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={onOpen}>View User Profile</Button>
                            </CardFooter>
                            <UserDetails data={item} isOpen={isOpen} onClose={onClose} />
                        </Card>
                    ))
                }
            </Box>
        </Box>
    )
}

export default Search
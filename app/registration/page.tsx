'use client'

import Header from "@/components/header"
import { postUser } from "@/services/users"
import { PostUser, UsersData } from "@/types"
import { Button, Flex, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import * as yup from 'yup';
import { useFormik } from "formik"

const postUserData = async (data: PostUser) => {
    const user = await postUser(data)
    const res = user.data.data as UsersData
    return res
}

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    name: yup.string().required('Name is required'),
})

const RegistrationPage: React.FC = () => {
    const form = useFormik({
        initialValues: {
            name: "",
            email: ""
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            
            submitForm(values as UsersData)
        },
        isInitialValid: false
    })
    const toast = useToast()
    
    const mutation = useMutation({
        mutationFn: (data: UsersData) => postUserData(data)
    })

    const submitForm = (values: UsersData) => {
        mutation.mutate(values, {
            onSuccess: (data, variables, context) => {
                toast({
                    title: 'Register successfully!',
                    description: "We've successfully registered a new user.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            },
            onError: (error, variables, context) => {
                toast({
                    title: 'Register failed!',
                    description: "We've failed registered a new user.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            },
        })
    }

    return(
        <>
            <Header title="Registration Dashboard" description="" />
            <Flex align='left' flexDirection='column'>
                <FormControl isRequired mt={4} px={4}>
                    <FormLabel>Name</FormLabel>
                    <Input 
                        variant='outline' 
                        type='text' 
                        border={`1px solid ${form.errors.name ? 'red' : '#777'}`}
                        placeholder='e.g. John Smith'
                        value={form.values.name}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name='name'
                    />
                    {form.errors.name && form.touched.name ? <Text color='red' size='sm' mt={2}>{form.errors.name}</Text> : null}
                </FormControl>
                <FormControl isRequired mt={4} px={4}>
                    <FormLabel>Email address</FormLabel>
                    <Input 
                        variant='outline' 
                        type='email' 
                        border={`1px solid ${form.errors.email ? 'red' : '#777'}`}
                        placeholder='e.g. john.smith@gmail.com'
                        value={form.values.email}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        name='email'
                    />
                    {form.errors.email && form.touched.email ? <Text color='red' size='sm' mt={2}>{form.errors.email}</Text> : null}
                </FormControl>
                <Button 
                    type='submit'
                    colorScheme='teal' 
                    size='md' 
                    mt={8} 
                    mx={4}
                    w={60}
                    onClick={(e) => form.handleSubmit()}
                    isDisabled={!form.isValid}
                    isLoading={mutation.isPending}
                >
                    Submit
                </Button>
            </Flex>
        </>
    )
}

export default RegistrationPage
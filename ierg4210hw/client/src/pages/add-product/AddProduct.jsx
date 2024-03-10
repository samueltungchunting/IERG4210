/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
// import { Navigate } from 'react-router-dom'
import './AddProduct.css'
import { Form, Formik, Field } from 'formik';
import CustomSelect from './components/CustomSelect';
import { MenuItem } from '@mui/material';
import CustomInput from './components/CustomInput';
import {useDropzone} from 'react-dropzone'
import CustomTextarea from './components/CustomTextArea';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const AddProduct = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const pid = searchParams.get('pid')

    const categoryList = useSelector((state) => state.category.categoryList)

    const [catagory, setCatagory] = useState('')
    const [initialFormValues, setInitialFormValues] = useState(null)
    const [image, setImage] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)


    useEffect(() => {
        if (pid) {
            axios.get(`/product/get_product/${pid}`).then((res) => {
                const {cid, name, price, photos, description, stock} = res.data
                const category = categoryList.find((cat) => cat.cid === cid)
                // console.log(photos);
                // !!!!!!!!!!!!!!!!!!
                // here will be some error where the photo link is not the same, 
                // suppose is a 32bit name but if fetch like this then it will be a s3 link
                // !!!!!!!!!!!!!!!!!!
                setInitialFormValues({
                    catagory: category.name,
                    name: name,
                    price: price,
                    photo: photos[0],
                    description: description,
                    stock: stock,
                })
                setImage(photos[0])
            })
        } else {
            setInitialFormValues({
                catagory: '',
                name: '',
                price: null,
                photo: '',
                description: '',
                stock: null,
            })
        }
        axios.get('/catagory/get_catagories').then((res) => {
            setCatagory(res.data)
        })
    }, [pid, categoryList])


    const onDrop = useCallback((acceptedFiles) => {
        // console.log(acceptedFiles, "acceptedFiles")
        setUploadedImage(acceptedFiles[0])

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result)
        }

        reader.readAsDataURL(acceptedFiles[0]);
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.png', '.jpg', '.webp'],
        },
    })

    async function handleSubmitAddProductForm(values) {
        // console.log("values", values);
        // console.log("uploadedImage", uploadedImage);
        const formData = new FormData();
        formData.append('catagory', values.catagory);
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('stock', values.stock);
        formData.append('photo', uploadedImage);

        const {data} = await axios.post('/product/add_product', formData, {
            headers: {'Content-type': 'multipart/form-data'}
        })
        if(data) {
            alert('Product added successfully')
            // return <Navigate to='/admin/view-products' />
        }
    }

    async function handleAddNewCatagory() {
        const newCatagory = prompt('Enter new catagory name')
        if(newCatagory) {
            const {data} = await axios.post('/catagory/add_catagory', {name: newCatagory})
            if(data) {
                alert('New catagory added successfully')
                setCatagory(prev => [...prev, data])
            }
        }
    }

    return (
        <div className='addProduct_page'>
            <div>
                <button onClick={handleAddNewCatagory}>Add Catagory!!</button>
            </div>
            {initialFormValues &&
            <Formik
                initialValues={initialFormValues}
                validationSchema={null}
                onSubmit={(values) => handleSubmitAddProductForm(values)}
            >
                {(props) => (
                    <Form className='addProduct_form'>
                        <h2 className='addProduct_form_title'>Add new product</h2>
                        <div className='addProduct_form_input_col'>
                            <CustomSelect
                                label="Catagory"
                                name="catagory"
                                placeholder="Select a catagory"
                            >
                                {catagory && catagory.map((catagory) => (
                                    <MenuItem key={catagory.name} value={catagory.name}>{catagory.name}</MenuItem>
                                ))}
                            </CustomSelect>
                            <CustomInput 
                                name="name" 
                                placeholder="Product name"
                                label="Product name"
                            />
                        </div>
                        <div className='addProduct_form_input_col'>
                            <CustomInput 
                                name="price" 
                                placeholder="Price"
                                label="Price"
                            />
                            <CustomInput
                                name="stock"
                                placeholder="Stock"
                                label="Stock"
                            />
                        </div>
                        <div {...getRootProps()}>
                            <Field {...getInputProps()} name='photo' type='text'/>
                            <div className='photo_upload'>
                                {
                                    isDragActive ?
                                    <p>Drop the files here ...<ContentPasteIcon /></p> :
                                    <p>Drag and drop some files here, or click to select files<UploadFileIcon /></p>
                                }
                            </div>
                        </div>
                        <div className='addProduct_previewImg'>
                            {image && <img src={image} alt="product" />}
                        </div>
                        <CustomTextarea 
                            name="description"
                            placeholder="Description of the product"
                            label="Description"
                            cols="30" 
                            rows="10"
                        />
                        <Button type='submit' className='addProduct_form_submit' variant="contained">Add Product</Button>
                    </Form>
                )}
            </Formik>
            }
        </div>
    )
}

export default AddProduct
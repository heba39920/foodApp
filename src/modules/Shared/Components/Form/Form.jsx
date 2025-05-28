import { useEffect, useState } from 'react';
import { axiosInstance, CATEGORY_URLS, TAGS_URL } from '../../../../Constants/CONTENT-END-POINTS';
import { description, price, Recipe_image, tag } from '../../../../Constants/VALIDATION';
import { useForm } from 'react-hook-form';
import RecipeData from '../../../Recipes/Components/RecipeData/RecipeData';
import { useLocation } from 'react-router-dom';

export default function Form({ defaultValues, onSubmit = () => { } }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const location= useLocation();
    const {mode, recipe} = location.state;
    console.log(mode,recipe);
    
    const getAllTags = async () => {
        try {
            const response = await axiosInstance.get(TAGS_URL.getAllTags);
            setTags(response.data);
           
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    }
    const getAllCategories = async (pageSize, pageNumber) => {
        try {
            const response = await axiosInstance.get(CATEGORY_URLS.getAllCategories, { params: { pageSize, pageNumber } });
            setCategories(response.data.data);
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    };
    useEffect(() => {
        getAllTags();
        if (defaultValues) {
            reset(defaultValues);
        }
        getAllCategories(10, 1);
    }, [defaultValues, reset]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type='text'
                placeholder='Recipe Name'
                className='form-control my-3'
                {...register('name', { required: name.required })}
            />
            <span className='text-danger'>{errors?.name?.message}</span>
            <select className='form-select my-3' {...register('tagId', { required: tag.required })}>
                {mode === 'update' && recipe?.tag ? (
                    <option key={recipe.tag.id} value={recipe.tag.id}>
                        {recipe.tag.name}
                    </option>
                ) : null}
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                ))}
            </select>
            <span className='text-danger'>{errors?.tag?.message}</span>
            <input
                type='number'
                placeholder='Price'
                className='form-control my-3'
                {...register('price', { required: price.required })}
            />
            <span className='text-danger'>{errors?.price?.message}</span>
            <select className='form-select my-3' {...register('categoriesIds', { required: tag.required })}>
                {mode === 'update' && recipe?.category?.[0] ? (
                    <option key={recipe.category[0].id} value={recipe.category[0].id}>
                        {recipe.category[0].name}
                    </option>
                ) : null}
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <span className='text-danger'>{errors?.category?.message}</span>
            <textarea
                placeholder='Description'
                className='form-control my-3'
                {...register('description', { required: description.required })}
            />
            <span className='text-danger'>{errors?.description?.message}</span>
            <input type="file" className='form-control my-3'  {...register('recipeImage', { required: Recipe_image.required })} />
            <span className='text-danger'>{errors?.Recipe_image?.message}</span>
            <div className='btns text-end'>
                <button type='button' className='btn border-success text-success me-5 px-5'>
                    cancel
                </button>
                <button type='submit' className='btn submit-btn'>
                    Save
                </button>
            </div>
        </form>
    )
}

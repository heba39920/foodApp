/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance, RECIPE_URLS } from '../../../../Constants/CONTENT-END-POINTS';
import Form from '../../../Shared/Components/Form/Form';
import { Oval } from 'react-loader-spinner';
export default function RecipeData() {
  const location = useLocation();  
  const mode = location?.state?.mode;
  const recipe = location?.state?.recipe;
const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 
  const { reset } = useForm();
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data?.name);
    formData.append('tagId', data?.tagId);
    formData.append('price', data?.price);
    formData.append('categoriesIds', data?.categoriesIds);
    formData.append('description', data?.description);
    formData.append('recipeImage', data?.recipeImage[0]);
    if (data?.recipeImage) {
      if (Array.isArray(data.recipeImage)) {
        formData.append('recipeImage', data.recipeImage[0]);
      } else {
        formData.append('recipeImage', data.recipeImage);
      }
    }
    return formData;
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    const recipeData = appendToFormData(data);
    try {
      if (mode === 'add') {
        const response = await axiosInstance.post(RECIPE_URLS.addRecipe, recipeData);  
        toast.success('Recipe added successfully!',{
          position:'top-center'
        });
        reset();
        navigate('/dashboard/recipes')
      } else if (mode === 'update') {
        const response = await axiosInstance.put(RECIPE_URLS.updateRecipe(recipe.id), recipeData);
       navigate('/dashboard/recipes')
        toast.success('Recipe updated successfully!',{
          position:'top-center'
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };
 if (isLoading) return (<div className='d-flex align-items-center justify-content-center'>
    <Oval
      visible={true}
      height="100vh"
      width="100"
      color="#009247"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    /> </div>
  ); 
  return (
    <div className='container-fluid'>
      <div className="mainContent">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>Fill the <span className="title-span"> Recipes</span> !</h5>
            <p>you can now fill the meals easily using the table and form , click here and fill it with the table!</p>
          </div>
          <div>
            <Link to={'/dashboard/recipes'} className="btn submit-btn">
              All Recipes <i className="fa-solid fa-arrow-right mx-2"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className='row justify-content-center align-items-center mt-5'>
        <div className='col-md-8'>
          {
            mode === 'add'
              ? <Form onSubmit={onSubmit} />
              : recipe && <Form onSubmit={onSubmit} defaultValues={recipe} />
          }
        </div>
      </div>
    </div>
  )
}
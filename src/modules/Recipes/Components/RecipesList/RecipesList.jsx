import Table from 'react-bootstrap/Table';
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../../assets/images/Group 48102127.png';
import { useEffect, useState } from 'react';
import { axiosInstance, BASE_IMAGE_URL, RECIPE_URLS } from '../../../../Constants/CONTENT-END-POINTS';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import ViewDetailsModal from '../../../Shared/Components/ViewDetailsModal/ViewDetailsModal';
import ViewDetailsImg from '../../../../assets/images/Group 48102098.png'
import NoData from '../../../Shared/Components/NoData/NoData';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function RecipesList() {
   const [mode, setMode] = useState('add');
  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
    const [recipeId, setRecipeId] = useState(null);
  const handleShowDetails = () => setShowDetails(true);

    // delete modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setRecipeId(id);
  };
const handleAdd = () => {
  setRecipeId(null);
  setMode('add');
  navigate('/dashboard/recipes-data', { state: { mode } });
 
};
const handleEdit = (recipe) => {
  setRecipeId(recipe.id);
  setMode('update');
  navigate('/dashboard/recipes-data', { state: { mode: 'update', recipe} });
 console.log(mode);
 console.log(recipe);
 
 
};

  // get all Recipes
    const getAllRecipes = async () => {
      try {
        setIsLoading(true);
      
        
        const response = await axiosInstance.get(RECIPE_URLS.getAllRecipes); 
      
    setRecipes(response.data.data);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    }; 
    const handleViewDetails = (recipe) => {
    getRecipeById(recipe.id);
    handleShowDetails();
  };
  // get Recipe by id
    const getRecipeById = async (recipeId) => {
      try {
        const response = await axiosInstance.get(RECIPE_URLS.getRecipeById(recipeId));
        setIsLoading(true);
      
        console.log(response.data);
        
        setRecipeDetails(response.data);
  
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
      useEffect(() => {
   getAllRecipes();
  }, []);

   
   const handleDelete = async () => {
      try {
        setIsLoading(true);
        await axiosInstance.delete(RECIPE_URLS.deleteRecipe(recipeId));
        getAllRecipes();
        toast.success("Recipe deleted successfully", {
          position: 'top-center'
        });
        handleClose();
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete Recipe", {
          position: 'top-center'
        });
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
      <Header title={'Recipes Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} image={headerImg} />
      <div className='d-flex align-items-center justify-content-between py-4'>
        <div>
          <h6>Recipe Table Details</h6>
          <p>You can check all details</p>
        </div>
        <button className='btn submit-btn'   onClick={handleAdd}>Add New Item</button>
      </div>

   {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <i
          onClick={handleClose}
          className='fa-regular fa-circle-xmark text-danger text-end p-3 fs-4'
        ></i>
        <Modal.Body>
          <DeleteConfirmation deleteItem='Recipe' />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='text-danger bg-transparent border-danger fw-medium'
            onClick={handleDelete}
          >
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

       <Table
        className='table'
        striped
        bordered
        hover
        style={{ textAlign: 'center' }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>Tag</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {recipes.length === 0 ? (
            <tr>
              <td colSpan='7'>
                <NoData />
              </td>
            </tr>
          ) : (
            recipes.map((recipe) => (
              <tr key={recipe?.id}>
                <td>{recipe?.name}</td>
                <td><img className='recipeImage' src={`${BASE_IMAGE_URL}${recipe.imagePath}`} alt="recipe image" /></td>
                <td>{recipe?.price} $</td>
                <td>{recipe?.description}</td>
                <td>{recipe?.tag?.name}</td>
               <td>{recipe?.category?.[0]?.name}</td>               
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant='transparent' id='dropdown-basic'>
                      <i className='fa-solid fa-ellipsis'></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleViewDetails(recipe)}
                      >
                        <span className='btns-icon mx-1'>
                          <i className='fa-solid fa-eye'></i>
                        </span>{' '}
                        View
                      </Dropdown.Item>

                      <Dropdown.Item
                       onClick={()=>handleEdit(recipe)}
                      >
                        <span className='btns-icon mx-1'>
                          <i className='fa-solid fa-pen-to-square'></i>
                        </span>{' '}
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => handleShow(recipe.id)}>
                        <span className='btns-icon mx-1'>
                          <i className='fa-solid fa-trash-can'></i>
                        </span>{' '}
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          )}

        </tbody>
      </Table>   
       <ViewDetailsModal
            img={`${BASE_IMAGE_URL}${recipeDetails.imagePath || ViewDetailsImg}`}
            head='Recipe'
            title={recipeDetails?.name}
            description={
              <>Recipe Description: <span className='title-span fw-bold'>{recipeDetails?.description}</span></>
            }
            info={
              <>Recipe Price: <span className='title-span fw-bold'>{recipeDetails?.price} $</span></>
            }
            show={showDetails}
            setShow={setShowDetails}
          >
          <p>Recipe Tag: <span className='title-span fw-bold'>{recipeDetails?.tag?.name}</span></p>
        <p>Recipe Category: <span className='title-span fw-bold'>{recipeDetails?.category?.[0]?.name}</span></p>
           <p>Creation Date: <span className='title-span fw-bold'>{recipeDetails?.creationDate}</span></p>
          <p>Modification Date: <span className='title-span fw-bold'>{recipeDetails?.modificationDate}</span></p>
          </ViewDetailsModal>
    </div>
  )
}

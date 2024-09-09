import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Collapse, Container, Modal, Table } from 'react-bootstrap'

const Landing = (props) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [selectedDish, setSelectedDish] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.dishName) {
            axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${props.dishName}`)
                .then((response) => {
                    if (response.data.meals) {
                        setData(response.data.meals);
                    } else {
                        setData([]);
                    }
                })
                .catch((err) => {
                    console.error("Error!!", err);
                    setError("Failed to fetch data. Please try again.");
                });
        } else {
            setData(null);
        }
    }, [props.dishName])

    const handleShowModal = (dish) => {
        setSelectedDish(dish);
        setShowModal(true);
        setOpen(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDish(null);
    };

    const renderIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) { // The API has up to 20 possible ingredients
            const ingredient = selectedDish[`strIngredient${i}`];
            const measure = selectedDish[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push(
                    <li key={i}>
                        {ingredient}: {measure}
                    </li>
                );
            }
        }
        return ingredients;
    };

    return (
        <div className="row m-0">
            {error ? (
                <div className='container'>
                    <p>{error}</p>
                </div>
            ) : data === null ? (
                <div className='container text-center p-5'>
                    <p className='fs-4 fw-semibold'>Search for Something...</p>
                </div>
            ) : data.length > 0 ? (
                data.map(dish => (

                    <div className='col-md-4 ' key={dish.idMeal} bg-body >
                        <div className='card p-2 border  border-dark my-4 mx-2 mx-lg-5 shadow '>
                            <img src={dish.strMealThumb} alt={dish.strMeal} className='landing-card-img p-0 m-0' />
                            <div className="cord-body py-2" >
                                <p className='h5 text-center'>{dish.strMeal}</p>
                                <div className='text-center'>
                                    <button type="button" className='btn btn-dark fw-semibold  py-1 px-3' onClick={() => handleShowModal(dish)}>More Info</button>
                                </div>
                            </div>
                        </div>

                    </div>

                ))
            ) : (
                <div className='container text-center p-5'>
                    <p className='fs-4 fw-semibold text-danger'>No dish found with this name!</p>
                </div>
            )}
            {selectedDish && (
                <Modal show={showModal} onHide={handleCloseModal} size='xl' aria-labelledby="contained-modal-title-vcenter"
                    centered bg-danger >
                    <Modal.Header closeButton >
                        <Modal.Title className='text-center'>{selectedDish.strMeal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='px-4'>
                        <p><strong>Category:</strong> {selectedDish.strCategory}</p>
                        <p><strong>Area:</strong> {selectedDish.strArea}</p>
                        <div className='mb-3'>
                            <Button
                                className="bg-transparent text-black border-black rounded-1"
                                onClick={() => setOpen(!open)}
                                aria-controls="instructions-collapse"
                                aria-expanded={open}
                            >
                                {open ? 'Hide Instructions' : 'Show Instructions'}
                            </Button>
                            <Collapse in={open}>
                                <div id="instructions-collapse" className="mt-3">
                                    <p>{selectedDish.strInstructions}</p>
                                </div>
                            </Collapse>
                        </div>

                        <div className="row m-0 border justify-content-between ">
                            <div className="col-md-8 align-content-center pe-0 ps-3 ">
                                <img src={selectedDish.strMealThumb} alt={selectedDish.strMeal} className="modal-card-img " />
                            </div>
                            <div className="col-md-4  p-2">
                                <h5 className="mt-4">Ingredients & Measurements:</h5>
                                <ul>
                                    {renderIngredients()}
                                </ul>
                            </div>
                        </div>
                        <p><strong>Tags:</strong> {selectedDish.strTags || 'None'}</p>
                        <a href={selectedDish.strYoutube} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default Landing

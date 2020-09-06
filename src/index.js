import './test.scss'
import HomeScreen from './Furniture-UI/js/home-screen';
import FurnitureScreen from './Furniture-UI/js/furniture-screen';
// get dom elements 
const homeSection = document.querySelector('.home-section')
const displaySection = document.querySelector('.display-section');
const searchField = document.querySelector('#search');
const furnitureSection = document.querySelector('.furniture-section');
const imagesSection = document.querySelector('.images-section');
const secondaryImagesSection = document.querySelector('.available-images');
const detailsSection = document.querySelector('.details-section');

console.log(homeSection.attributes)
// create objects
const displayHome = new HomeScreen(displaySection,furnitureSection,homeSection);
displayHome.showItems("");

const displayFurniture = new FurnitureScreen(homeSection,furnitureSection,imagesSection,secondaryImagesSection,detailsSection);

// add event listners
searchField.addEventListener('keyup',() => {
    displayHome.showItems(searchField.value);
});

displaySection.addEventListener('click',(event)=>{
    if(event.target.parentElement.className == 'display-item'){
        displayFurniture.selectFurnitureToView(event.target.parentElement.id);
    }
});

class FurnitureScreen {
    constructor(homeElement, furnitureElement, imagesSection, secondaryImagesSection, detailsSection) {
        this.furnitureElement = furnitureElement;
        this.homeElement = homeElement;
        this.imagesSection = imagesSection;
        this.secondaryImagesSection = secondaryImagesSection;
        this.detailsSection = detailsSection;
        this.carrotLeft = null;
        this.carrotRight = null;
        this.selectedImageIndex = 0;
    }

    readTextFile(file, search) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.addEventListener('readystatechange', () => {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                const data = JSON.parse(rawFile.responseText);
                const selectedFurniture = data;
                this.manageImages(selectedFurniture.images);
                this.manageDetails(selectedFurniture);
                this.homeElement.style.display = "none";
                this.furnitureElement.style.display = "flex";
            }
        })
        rawFile.open("GET", file, true);
        rawFile.send(null);
    }

    manageImages(images) {
        const selectedImage = images.find(item => item.selected === true).img;
        this.imagesSection.innerHTML = `
                <span class="left-carrot">&#60;</span>
          <span class="right-carrot">&#62;</span>
          <img class="main-image" src=${selectedImage} alt="no image">
          <div class="available-images">
          </div>
                `;
        this.secondaryImagesSection = document.querySelector('.available-images');
        images.forEach(image => {
            this.secondaryImagesSection.innerHTML += `
            <img class="secondary-image ${image.selected ? 'selected-image' : ''}" src=${image.img} alt="no image">
            `
        });

        this.carrotLeft = document.querySelector('.left-carrot');
        this.carrotRight = document.querySelector('.right-carrot');
        this.carrotLeft.addEventListener('click', () => {
            this.moveLeft(images)
        });

        this.carrotRight.addEventListener('click', () => {
            this.moveRight(images)
        })
    }

    manageDetails(furniture) {
        console.log(this.detailsSection);
        this.detailsSection.innerHTML = `<div class="text-muted furniture-name"><b>${furniture.name}</b></div>
        <div class="furniture-collection"><b>${furniture.collection}</b></div>
        <div class="furniture-description">${furniture.description}</div>
        <div class="text-muted furniture-description"><b>Color</b></div>
        <div class="color-ranges">
        </div>
        <div class="text-muted furniture-description"><b>Price per unit</b></div>
        <div class="furniture-price">
          <span class="price-label"><b>Rs. ${furniture.price}</b></span>
          <button class="btn btn-primary buy-btn">Buy now</button>
          <span class="cart-span">Cart</span>
        </div>`;
        let colorRanges = document.querySelector('.color-ranges')
        console.log(colorRanges);
        furniture.availableColors.forEach(color => {
            colorRanges.innerHTML += `<div class="color" style="background-color:${color}"></div>`;
        });
    }

    moveLeft(images) {
        if (this.selectedImageIndex != 0) {
            images[this.selectedImageIndex].selected = false;
            images[this.selectedImageIndex - 1].selected = true;
            this.selectedImageIndex--;
            this.manageImages(images)
        }
    }

    moveRight(images) {
        if (this.selectedImageIndex != images.length - 1) {
            images[this.selectedImageIndex].selected = false;
            images[this.selectedImageIndex + 1].selected = true;
            this.selectedImageIndex++;
            this.manageImages(images)
        }
    }

    selectFurnitureToView(id) {
        this.readTextFile("../../assets/data/SelectedFurniture.json", id);
    }
}

export { FurnitureScreen as default };
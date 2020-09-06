class HomeScreen {
  constructor(element, furnitureSection, homeSection) {
    this.element = element;
    this.furnitureSection = furnitureSection;
    this.homeSection = homeSection;
    this.value = "";
  }

  readTextFile(file, search) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.addEventListener('readystatechange', () => {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        const data = JSON.parse(rawFile.responseText);
        const dataArray = data.response;
        console.log(this.value);
        const dataArraySearched = dataArray.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) > 0);
        this.element.innerHTML = "";
        if (dataArraySearched.length > 0) {
          dataArraySearched.forEach((furniture) => {

            this.element.innerHTML += `
                        <div class="col-lg-4 col-md-6 col-sm-12 col-12 centered-div">
                      <div class="display-item" id=${furniture.id}>
                        <img class="display-image" src=${furniture.imgUrl} alt="no image">
                        <div class="display-name">
                          <div class="main-name">
                            <b>${furniture.name}</b>
                          </div>
                          <div class="text-muted font-10">
                            <label>${furniture.category.toUpperCase()}</label>
                            <label class="display-price">Rs. ${furniture.cost}</label>
                          </div>
                          <div class="display-star">
                            <label>Star count</label>
                            <label class="cart-icon">Cart</label>   
                          </div>
                        </div>
                      </div>
                    </div>
                        `
          })
        }
        else {
          this.element.innerHTML = "No Data Available";
        }
        this.furnitureSection.style.display = "none";
        this.homeSection.style.display = "flex";
      }
    })
    rawFile.open("GET", file, true);
    rawFile.send(null);
  }

  showItems(search) {
    this.readTextFile("../../assets/data/furnitures.json", search);
  }

  getAllFurnitures() {
    console.log(this.value);
    return this.value;
  }
}

export { HomeScreen as default };
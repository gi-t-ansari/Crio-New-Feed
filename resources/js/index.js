const getId = () => Math.random().toString(36).substr(2, 9);

const getAccordionItem = (title, id) => {
  return `
    <div class="accordion-item" id="card${id}">
    <h2 class="accordion-header" id="heading${id}">
      <button class="btn btn-link" aria-expanded ="true" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-controls="collapse${id}">
      ${title} 
      </button>
    </h2>
    <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}">
    </div>
  </div> `;
};

const getCarouselOuter = (id, innerId) => {
  return `
    <div id="carouselControl${id}" class="carousel slide" data-bs-ride ="carousel">
     <div class="carousel-inner" id="${innerId}"> 
     </div>
     <button class="carousel-control-prev" type="button" data-bs-target="#carouselControl${id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
     </button>
     <button class="carousel-control-next" type="button" data-bs-target="#carouselControl${id}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
     </button>
    </div>`;
};
const getCarouselItem = (id, active) => {
  return `
    <div class="carousel-item ${active ? "active" : ""}" id ="${id}">
    </div>`;
};
const getCard = (item) => {
  return `
    <div class ="card d-block">
     <img class ="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt ="Card image">
     <div class="card-body">
      <h5 class ="card-title">${item.title}</h5>
      <h6 class  ="card-subtitle mb-2 text-muted">${item.author}</h6>
      <p class ="card-subtitle text-secondary">${item["pubDate"]}</p>
      <p class ="card-text">${item["description"]}</p>
      <a href ="${item["link"]}" class ="stretched-link" target ="_blank"></a>
     </div>
    </div>`;
};

const addContent = async () => {
for (let i=0; i<magazines.length; i++){
    let url =magazines[i];
    console.log("url",url);
    const response =await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${(url)}`);
    const data = await response.json()
    console.log("data",data);


    const accordionItemId = getId();
    const accordionItem = getAccordionItem(data.feed.title, accordionItemId);
    document.getElementById("accordionId").innerHTML += accordionItem;


    if(i === 0){
    document.getElementById(`collapse${accordionItemId}`).classList.add("show");
    }
    const carouselId= getId();
    const carouselInnerId =getId();
    const carousel =getCarouselOuter(carouselId ,carouselInnerId);
    document.getElementById(`collapse${accordionItemId}`).innerHTML = carousel; 


    const items =data.items;
    for (const itemIdx in items){


    const carouselItemId =getId();
    const carouselItem =getCarouselItem(carouselItemId, itemIdx == 0)

    document.getElementById(carouselInnerId).innerHTML += carouselItem;

    const card = getCard(items[itemIdx]);
    document.getElementById(carouselItemId).innerHTML = card;
 }
 }
}
addContent();

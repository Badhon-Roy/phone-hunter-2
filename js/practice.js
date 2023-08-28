const loadPhone = async (searchText = 'a') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayAllPhones(phones)
}
const displayAllPhones = (phones) => {
    const phoneContainer = document.getElementById("phone-card-container");
    phoneContainer.textContent = '';


    const seeMoreBtn = document.getElementById("seeMore-Btn")
    if (phones.length > 30) {
        seeMoreBtn.classList.remove('hidden')
    }
    else {
        seeMoreBtn.classList.add('hidden')
    }
    phones = phones.slice(0, 30);

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = "card bg-base-100 shadow-xl";
        phoneCard.innerHTML = `
        <figure class="p-10 rounded-lg m-4 bg-sky-300">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews phone whose phone does he choose?</p>
        <div class="card-actions">
          <button onclick="handleSeeDetailsBtn('${phone.slug
            }')" class="btn btn-primary">see details</button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toogleSerchBtn(false);
}

const handleSearchBtn = () => {
    toogleSerchBtn(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText)
}
const toogleSerchBtn = (isloading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isloading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

const handleSeeDetailsBtn = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    displayPhoneDetails(phone)
}
const displayPhoneDetails = (phone) => {
    const seeDetailsContainer = document.getElementById("see-details-container");
    seeDetailsContainer.innerHTML = `
    <button class="btn btn-md btn-circle btn-ghost absolute right-8 top-8">✕</button>
    <div class="flex justify-center rounded-lg p-8 bg-[#f3f8ff]"><img src="${phone.image}" alt=""></div>
    <h2 class="font-bold text-2xl mt-3"> ${phone?.name}</h2>
    <h3><span class="font-bold">Storage: </span> ${phone?.mainFeatures?.storage}</h3>
    <h3><span class="font-bold">Display Size: </span> ${phone?.mainFeatures?.displaySize}</h3>
    <h3><span class="font-bold">Chipset: </span> ${phone?.mainFeatures?.chipSet}</h3>
    <h3><span class="font-bold">Memory: </span> ${phone?.mainFeatures?.memory}</h3>
    <h3><span class="font-bold">Slug: </span> ${phone?.slug}</h3>
    <h3><span class="font-bold">Release data: </span> ${phone?.releaseDate}</h3>
    <h3><span class="font-bold">Brand: </span> ${phone?.brand}</h3>
    <h3><span class="font-bold">GPS: </span> ${phone?.others?.GPS}</h3>

    `
    seeDetails_modal.showModal()
}


loadPhone();
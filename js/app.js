// নিচে search btn এ eventListener এর মধ্যে এই loadPhone ফাংশনকে call করার কারনে এই ফাংশনের searchText কে parameter হিসেবে পাওয়া ও ব্যবহার করা গেছে এবং তা দ্বারা dynamically url ও update করা গেছে

// load phone
const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

// display phone
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    // প্রত্যেকবার নতুন করে search এর পরে আগের ‍search এর result বা output clear করে ফেলতে
    phonesContainer.innerHTML = '';

    // to display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > dataLimit){
        phones= phones.slice(0, dataLimit);
        // to make visible show all button
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // display no phones if search is anonymous. উক্ত array তে search-কৃত data-টি না থাকলে বোঝা যাবে ঐ নামে কোন ফোন নাই। অর্থ্যাৎ, তখন উক্ত array এর length 0 হবে। 
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    // যদি search ঠিকঠাক থাকে তখন আবার েএই no-found-message নিচে না দেখানোর জন্য..
    else {
        noPhone.classList.add('d-none');
    }

    // display all valid searched phones
    for(const phone of phones){
        // console.log(phone);
        const phoneInfo = document.createElement('div');
        phoneInfo.innerHTML = `
            <div class="col">
                <div class="card p-2">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>

                        <!-- Button trigger modal -->
                        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details! </button>
                    </div>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneInfo);
    } 
    // process complete অর্থ্যাৎ, search হয়ে data display হওয়া শেষ হলে, spinner loading দেখানো বন্ধ করতে..
    toggleSpinner(false)
}

// common function for search process
const processSearch = (dataLimit) => {
    // process শুরু অর্থ্যাৎ, search btn click থেকে spinner loading দেখানো শুরু করতে..
    toggleSpinner(true)

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // searchText দিয়ে উপরে/আগে তৈরিকৃত loadPhone ফাংশনকে call করে দিলাম
    // একই সাথে কতটি ফোন display করতে চাই তাও parameter এর উল্লেখ করে দেওয়া যায়।
    loadPhone(searchText, dataLimit);
}

// search button এ click করে search result আনতে
document.getElementById('btn-search').addEventListener('click', function(){
    // to set searched phone's display limit in the parameter.
    processSearch(10);
})

// কীবোর্ডের Enter বাটন চাপলে কাজ হওয়ার জন্য..
document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        // to set searched phone's display limit in the parameter.
        processSearch(10);
    }
})

// search error message handling
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner-loader');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}


// to show all (not so ideal way)
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
    // search btn এ click এর পরে search field clear করতে...
    const searchField = document.getElementById('search-field');
    searchField.value = '';
})

// load phone details
const loadPhoneDetails = phoneId => {
    url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

// display phone details
const displayPhoneDetails = phoneInfo => {
    // console.log(phoneInfo);
    const phoneDetailsBodyContainer = document.getElementById('phone-details-body');
    phoneDetailsBodyContainer.innerHTML = '';
    const phoneDetailsInfo = document.createElement('div');
    phoneDetailsInfo.innerHTML = `
        <div>
            <p class="fw-bold">Manufacturer: ${phoneInfo.brand}</p>
            <p>Released on: ${phoneInfo.releaseDate ? phoneInfo.releaseDate : 'no release date found!'}</p>
            <p>Processor: ${phoneInfo.mainFeatures.chipSet}</p>
            <p>Display: ${phoneInfo.mainFeatures.displaySize}</p>
            <p>Memory Option: ${phoneInfo.mainFeatures.memory}</p>
        </div>
    `;
    phoneDetailsBodyContainer.appendChild(phoneDetailsInfo);
}


loadPhone('samsung');





// additional nested object for practicing--->
// try to find the insta link.......

const dreamGirl = [
    {
     sokina: {
      name: "bbu",
      height: "5.4",
      family: [{ father: "rock", mother: "shila", sister: "chinki" }],
      age: undefined,
      contactInfo: [
       {
        facebook: {
         link: "https://www.facebook.com/",
         followers: "12545",
         status: "single",
         friendsList: [{ name: "rofik" }, undefined],
        },
       },
       { instagram: "https://www.instagram.com/" },
      ],
     },
    },
];
console.log(dreamGirl);
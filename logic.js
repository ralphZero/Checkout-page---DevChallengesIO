const cart = [
    {
        name:'Vintage Backbag',
        newPrice:54.99,
        oldPrice:94.99,
        url:'photo1.png'
    },
    {
        name:'Levi Shoes',
        newPrice:74.99,
        oldPrice:124.99,
        url:'photo2.png'
    },
];

const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

var total = document.querySelector('#total');   


(function(){

    let list = document.querySelector('.checkout--list');

    let countries = document.getElementsByName('i_country');

    for(let i=0; c=country_list.length, i < c; i++){
        let option = document.createElement('option');
        option.value = country_list[i].toLowerCase();
        option.innerText = country_list[i];
        countries[0].append(option);
    }

    for(let i=0; c= cart.length, i < c; i++){
        list.append(buildCheckOutItem(cart[i]));
    }

    let counters = document.querySelectorAll('.checkout--list--item--counter--input');
    
    updateSum(counters);

    for(let i=0; c=counters.length,i<c;i++){
        counters[i].previousSibling.addEventListener('click', (e)=>{
            //minus button
            let oldvalue = parseInt(counters[i].value);
            if(oldvalue > 0){
                counters[i].value = oldvalue - 1;
            }
            updateSum(counters);
        }, false);

        counters[i].addEventListener('change', (e)=>{
            //when value changes
            if(isNaN(e.currentTarget.value) || e.currentTarget.value < 1 || e.currentTarget.value > 999){
                e.currentTarget.value = 1;
            }
            updateSum(counters);
        }, false);

        counters[i].nextSibling.addEventListener('click', (e)=>{
            //plus button
            let oldvalue = parseInt(counters[i].value);
            if(oldvalue < 999){
                counters[i].value = oldvalue + 1;
            }
            updateSum(counters);
        }, false);
    }

})();


function updateSum(value){
    let sum = 0;
    for(let i=0; i<value.length;i++){
        sum= sum + (parseInt(value[i].value) * parseFloat(cart[i].newPrice));
    }
    if(sum!=0){
        sum+=19;
    }
    total.innerText = '$'+sum.toFixed(2);
}

function buildCheckOutItem(value){
    let list_item = document.createElement('div');
    list_item.className = 'checkout--list--item';
    let item_img = document.createElement('img');
    item_img.src = value.url;
    item_img.alt = 'item';
    item_img.className = 'checkout--list--item--img';
    list_item.append(item_img);
    let item_details = document.createElement('div');
    item_details.className = 'checkout--list--item--details';
    let item_title = document.createElement('h4');
    item_title.className = 'checkout--list--item--title';
    item_title.innerText = value.name;
    item_details.append(item_title);
    let item_prices = document.createElement('div');
    item_prices.className = 'checkout--list--item--prices';
    let new_price = document.createElement('span');
    new_price.className = 'checkout--list--item--new-price';
    new_price.innerText = '$'+value.newPrice;
    let old_price = document.createElement('span');
    old_price.className = 'checkout--list--item--old-price';
    old_price.innerText = '$'+value.oldPrice;
    item_prices.append(new_price);
    item_prices.append(old_price);
    item_details.append(item_prices);
    let item_counter = document.createElement('div');
    item_counter.className = 'checkout--list--item--counter';
    let btn_plus = document.createElement('button');
    btn_plus.className = 'checkout--list--item--counter--button';
    btn_plus.type = 'button';
    btn_plus.innerText = '+';
    let btn_minus = document.createElement('button');
    btn_minus.className = 'checkout--list--item--counter--button';
    btn_minus.type = 'button';
    btn_minus.innerText = '-';
    let counter_input = document.createElement('input');
    counter_input.className = 'checkout--list--item--counter--input';
    counter_input.type = 'number';
    counter_input.min = '0';
    counter_input.max = '999';
    counter_input.id = 'amount';
    counter_input.value = '1';
    item_counter.append(btn_minus);
    item_counter.append(counter_input);
    item_counter.append(btn_plus);
    item_details.append(item_counter);
    list_item.append(item_details);
    return list_item;
}


(function(){
    let smalls = document.querySelectorAll('small');
    let inputs = document.querySelectorAll('.form-input');
    let i=0;
    while (i < smalls.length) {
        smalls[i].style.display = 'none';
        i++;
    }

    for(let i=0; c=inputs.length,i < c;i++){
        inputs[i].addEventListener('blur', (e)=>{
            validateField(inputs[i]);
        }, false);
    }

})();

function validateField(input){
    let parent = input.parentElement;
    let small = input.parentElement.nextElementSibling;
    if(input.value == ''){
        parent.classList.add('invalidated');
        small.innerText = 'This field can\'t be empty.';
        small.style.display = 'inline';
    }else{
        switch (input.name) {
            case 'i_email':
                if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value)){
                    parent.classList.add('invalidated');
                    small.innerText = 'Invalid email address';
                    small.style.display = 'inline';
                }else{
                    parent.classList.remove('invalidated');
                    small.innerText = '';
                    small.style.display = 'none';
                }
                break;
            case 'i_phone':
                if(!/^(\+)?([ 0-9]){10,16}$/g.test(input.value)){
                    parent.classList.add('invalidated');
                    small.innerText = 'Invalid phone number';
                    small.style.display = 'inline';
                }else{
                    parent.classList.remove('invalidated');
                    small.innerText = '';
                    small.style.display = 'none';
                }
                break
            case 'i_name':
                if(!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(input.value)){
                    parent.classList.add('invalidated');
                    small.innerText = 'Invalid name';
                    small.style.display = 'inline';
                }else{
                    parent.classList.remove('invalidated');
                    small.innerText = '';
                    small.style.display = 'none';
                }
                break;
            case 'i_address':
                if(!/^\d+[,]?\s[A-z]+\s[A-z]+/g.test(input.value)){
                    parent.classList.add('invalidated');
                    small.innerText = 'Invalid address';
                    small.style.display = 'inline';
                }else{
                    parent.classList.remove('invalidated');
                    small.innerText = '';
                    small.style.display = 'none';
                }
                break;
            case 'i_city':
                if(!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(input.value)){
                    parent.classList.add('invalidated');
                    small.innerText = 'Invalid city name';
                    small.style.display = 'inline';
                }else{
                    parent.classList.remove('invalidated');
                    small.innerText = '';
                    small.style.display = 'none';
                }
                break;
            case 'i_postal_code':
                if(!/^\d?\s?[A-z]?\d?/g.test(input.value)){
                    parent.classList.add('invalidated');
                    small.innerText = 'Invalid postal code';
                    small.style.display = 'inline';
                }else{
                    parent.classList.remove('invalidated');
                    small.innerText = '';
                    small.style.display = 'none';
                }
                break;
            default:
                break;
        }
    }
    
}



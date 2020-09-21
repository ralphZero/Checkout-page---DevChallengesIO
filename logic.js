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

var total = document.querySelector('#total');

(function(){

    let list = document.querySelector('.checkout--list');

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
            console.log('New value is '+ counters[i].value);
        }, false);

        counters[i].addEventListener('change', (e)=>{
            //when value changes
            if(isNaN(e.currentTarget.value) || e.currentTarget.value < 1 || e.currentTarget.value > 999){
                e.currentTarget.value = 1;
            }
            updateSum(counters);
            console.log('value changed to '+ parseInt(e.currentTarget.value));
        }, false);

        counters[i].nextSibling.addEventListener('click', (e)=>{
            //plus button
            let oldvalue = parseInt(counters[i].value);
            if(oldvalue < 999){
                counters[i].value = oldvalue + 1;
            }
            updateSum(counters);
            console.log('New value is '+ counters[i].value);
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
    console.log('total : '+sum);
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


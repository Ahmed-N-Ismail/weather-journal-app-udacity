/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();


let baseURL='http://api.openweathermap.org/data/2.5/forecast?zip=';
let apikey='&appid=daed5fa054adfe09c5d9e1d34ceddaac';

document.getElementById('generate').addEventListener('click',performAction);


function performAction(e){
    const newZip=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    getWeather(baseURL,newZip,apikey)

        .then(function(data){
            console.log(data);;

            postData('/add',{date:d, temp:data.list[0].main.temp, content:feelings})
            updateUI();
        })
};

const getWeather = async(baseURL, zip, key)=>{
    const res = await fetch(baseURL+zip+key)
    try{
        const data =await res.json();
        return data;
    }catch(error){
        console.log('error',error);
    }
};

const postData = async (url = '',data ={})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData =await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log('error',error);
    }
}

const updateUI = async ()=>{
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML= `Date: ${newDate}`;
        document.getElementById('temp').innerHTML= `Temperatuer: ${allData[0].temp}`;
        document.getElementById('content').innerHTML=`I feel: ${allData[0].content}`;

    } catch (error) {
        console.log('error',error);
    }
}



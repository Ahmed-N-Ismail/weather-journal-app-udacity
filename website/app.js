/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// setup var
const apikey='&appid=daed5fa054adfe09c5d9e1d34ceddaac&units=metric',
        apiUrl='http://localhost:8000/',
        zipElement =document.getElementById('zip'),
        feelingsElement=document.getElementById('feelings'),
        dateElement =document.getElementById('date'),
        tempElement = document.getElementById('temp'),
        contentElement=document.getElementById('content'),
        catchError =(error)=> console.error('Some Error Has Been:',error);

document.getElementById('generate').addEventListener('click',generate);

function generate(){
    let data ={
        zipCode: zipElement.value,
        content: feelingsElement.value,
        date: newDate
    }
    getZipCode(data.zipCode).then(zipInfo=>{
        if(zipInfo.cod !=200){
            return alert(zipInfo.message);
        }
        data.temp = zipInfo.list[0].main.temp;
        postDateToServer(data);
    }).catch(catchError);
}
async function getZipCode(zipCode){
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apikey}`)).json();
}

async function postDateToServer(data){
    let response = await fetch (`${apiUrl}postData`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    try {
        response.json().then(data =>{
            if(response.ok)
                updateUI();
             else
                alert('Process Not Successfuly');
        }).catch(catchError)
    } catch (error) {
        catchError(error);
    }
}
async function updateUI(){
    let response = await fetch(`${apiUrl}getAll`)
    try {
        response.json().then(data =>{
            dateElement.innerHTML = `Date Is: ${data.date}`;
            tempElement.innerHTML= `Temp Is: ${data.temp}`;
            contentElement.innerHTML= `MY feelings Is: ${data.content}`;
        }).catch(catchError);
    } catch (error) {
        catchError(error)
    }
}
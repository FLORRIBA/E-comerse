document.addEventListener('DOMContentLoaded', function () {

const mainImg=document.getElementById ('main-img');
const smallImg=document.getElementsByClassName('small-img');

smallImg[0].addEventListener('click',()=>{
    mainImg.src = smallImg[0].src;
    console.log('click')
})
smallImg[1].addEventListener('click', ()=>{
    mainImg.src=smallImg[1].src;
})
smallImg[2].addEventListener('click', ()=>{
    mainImg.src=smallImg[2].src;
})
smallImg[3].addEventListener('click', ()=>{
    mainImg.src=smallImg[3].src;
})
})

/************sttyle toggler*************** */
const styleSwitchToggler=document.querySelector(".style-switcher-toggler")
styleSwitchToggler.addEventListener("click",()=>{
    document.querySelector(".style-switcher").classList.toggle("open")
})
window.addEventListener("scroll",()=>{
    if( document.querySelector(".style-switcher").classList.contains("open"))
    {
    document.querySelector(".style-switcher").classList.remove("open")
    }
})

const alternateStyle=document.querySelectorAll(".alternate-style")
function setActiveStyle(color){
    alternateStyle.forEach(element => {
        if(color===element.getAttribute('title')){
            element.removeAttribute('disabled')
        }else{
            element.setAttribute('disabled',true)
        }
    });
}

const dayNight=document.querySelector(".day-night")

dayNight.addEventListener("click",()=>{
    dayNight.querySelector("i").classList.toggle('fa-sun')
    dayNight.querySelector("i").classList.toggle('fa-moon')
    document.body.classList.toggle('dark')
   
})

window.addEventListener("load",()=>{
    if(document.body.classList.contains('dark')){
        dayNight.querySelector("i").classList.add('fa-sun')
    }else{
        dayNight.querySelector("i").classList.add('fa-moon')
    }
})

var typed=new Typed(".typing",{
    strings:["","Senior software enginer","Strong Team Leader","System Architecht","Professional Developer"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
})

const nav=document.querySelector('.nav'),
      navList=document.querySelectorAll('li')
      totalNavList=navList.length,
      allSections=document.querySelectorAll('.section'),
      totalSections=allSections.length

for(let i=0;i<totalNavList;i++){
   const a=navList[i].querySelector('a')
   a.addEventListener("click",function(){
    
    for(let i=0;i<totalSections;i++){
        allSections[i].classList.remove('back-section')
    }

    for(let j=0;j<totalNavList;j++){
        if( navList[j].querySelector('a').classList.contains('active')){
           
            allSections[j].classList.add('back-section')
        }
       navList[j].querySelector('a').classList.remove('active')
    }
    this.classList.add('active')
    showSection(this)
    if(window.innerWidth<1200){
        asideSectionTogglerBtn()
    }
   })
}

function  showSection(element){
    for(let i=0;i<totalSections;i++){
        allSections[i].classList.remove('active')
    }
   const target=element.getAttribute('href').split('#')[1]
   document.querySelector('#'+target).classList.add('active')
}

const navBtnToggler=document.querySelector('.nav-toggler'),
      aside=document.querySelector('.aside')
      navBtnToggler.addEventListener('click',()=>{
        asideSectionTogglerBtn()
      })

      function asideSectionTogglerBtn(){
        aside.classList.toggle('open')
        navBtnToggler.classList.toggle('open')
        for(let i=0;i<totalSections;i++){
            allSections[i].classList.toggle('open')
        }
      }

      function updateNav(element){
        const target=element.getAttribute('href').split('#')[1]
        for(let j=0;j<totalNavList;j++){
            if( navList[j].querySelector('a').classList.contains('active')){
               
                allSections[j].classList.add('back-section')
            }
           navList[j].querySelector('a').classList.remove('active')
           if( navList[j].querySelector('a').getAttribute('href').split('#')[1]===target){
            navList[j].querySelector('a').classList.add('active')
           }
        }
       
      }
      document.querySelector('.hire-me').addEventListener('click',function(){
        const sectionIndex=this.getAttribute('data-section-index')
        console.log(sectionIndex)
        showSection(this)
        updateNav(this)
      })
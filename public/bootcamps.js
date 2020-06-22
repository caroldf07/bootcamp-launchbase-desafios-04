const modalOverlay = document.querySelector('.modal-overlay')
const close = document.querySelector('.close-modal')
const courses = document.querySelectorAll('.bootcamp')

for(let course of courses){
    course.addEventListener("click",function(){
        const bootcampId = course.getAttribute('id')
        
        window.location.href = `/courses/${bootcampId}`

    })
}

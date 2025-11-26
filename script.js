// Этот код имитирует загрузку постов из API и показывает их на странице.
// Кнопки «left» и «right» позволяют переходить между постами (меняя id поста).


let counter = 1 //имитация id. Это счётчик, который хранит текущий номер поста.При клике на кнопки он увеличивается или уменьшается, чтобы подгрузить другой пост.

async function loadPost(){
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${counter}`)
        if(!response.ok){
            throw new Error('Error fetching Users')
        }
        const {title,body} = await response.json() //мы достаём данные поста из ответа и деструктурируем объект: берём только title и body.
        createPost(title,body) //Вызываем ф-ю. Эта функция обновит DOM (страницу).
    }
    catch(error){
        console.error(error)
    }
}
//fetch() делает запрос на сайт JSONPlaceholder — это тестовое API, которое возвращает фейковые посты.

//const { title, body } = ... — это деструктуризация объекта. Она берёт из этого объекта свойства title и body и создаёт две константы с такими же именами, присваивая им соответствующие значения:
// const title = obj.title;
// const body = obj.body;
// Итог: после выполнения  есть две переменные title и body, которые  сразу передаёшь в createPost(title, body).

// Эквивалент без деструктуризации:
// const data = await response.json();   // получаем объект
// const title = data.title;             // вручную берём поле title
// const body = data.body;               // вручную берём поле body
// createPost(title, body);

function createPost(title,body){
    const posts =document.querySelector('.posts')
    posts.innerText = ""
    const divLeft = document.createElement('div')
    divLeft.classList.add('posts-left')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    p1.innerText = `title: ${title}`
    p2.innerText = `body: ${body}`
    divLeft.append(p1,p2)
    const imgRight = document.createElement('img')
    imgRight.src = './logo1.png'
    posts.append(divLeft,imgRight)
}

const btnLeft = document.querySelector('.left')
const btnRight = document.querySelector('.right')


btnLeft.addEventListener('click',() => {
 counter--
 loadPost()
})
btnRight.addEventListener('click',() => {
 counter++
 loadPost()
})
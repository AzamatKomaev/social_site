import React, { useState } from 'react';
import {CreatingPost} from "../../../../services/contentService";
import {CategoryFrontPath} from "../../../../frontpaths/frontPath";


const CreatePostForm = (props) => {
    const [category, setCategory] = useState()
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [photo, setPhoto] = useState(null)

    const [error, setError] = useState({
        title: null,
        text: null,
        category: null
    })

    const changePhoto = (event) => {
        event.preventDefault()
        if (event.target.files[0]) {
            setPhoto(event.target.files[0])
        }
    }

    const handleCreatePostButton = async() => {
        if (!category || category === "Выбери категорию") {
            alert("Вы не указали категорию. Куда добавлять пост? -_-")
            return ;
        }

        const creatingPost = new CreatingPost(title, content, category, photo)
        const response = await creatingPost.createPost()

        switch (response.status) {
            case 201:
                window.location.href = CategoryFrontPath.postList(category)
                break;
            case 400:
                setError(response.data)
                break;
            default:
                break;
        }
    }

    return (
        <div className="container">
            <h2 style={{fontSize:"15pt"}} align="center">Добавить пост</h2>{"\n\n"}

            <select
                className="form-select"
                style={{fontSize: "10pt"}}
                id="select-category"
                onChange={e => setCategory(e.target.value)}
            >
                <option value={null} selected>Выбери категорию</option>
                {props.categories.map((category) => (
                    <option value={category.id}>{category.name}</option>
                ))}
            </select>
            <p className="text-danger" style={{marginTop: "-15px"}}>{error.category}</p>
    
            <div className="form-group" style={{marginTop: "100px"}}>
                <input
                    type="text"
                    name="title"
                    maxLength="199"
                    id="id_title"
                    className="form-control"
                    value={title}
                    style={{fontSize: "10pt"}}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="У меня есть мечта..."
                 />
                <p className="form-text text-muted" style={{fontSize:"10pt"}}>Опишите основной смысл поста в двух словах.</p>
                {error.title
                ?
                    <p className="text-danger" style={{marginTop: "-15px"}}>Заголовок не может быть пустым</p>
                :
                    <p></p>
                }
            </div>
            {"\n"}
            <div className="form-group">
                <textarea
                    name="text"
                    rows="10"
                    required=""
                    id="id_text"
                    className="form-control"
                    spellCheck="false"
                    style={{fontSize: "10pt"}}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Мечта - особый вид воображения, представляющий собой самостоятельное создание новых образов, направленный на будущее и выражающий желания человека.">
                </textarea>
                <p className="form-text text-muted" style={{fontSize: "10pt"}}>А теперь полностью излейте свою душу.</p>
                {error.text
                ?
                    <p className="text-danger" style={{marginTop: "-15px"}}>Содержимое не может быть пустым</p>
                :
                    <p></p>
                }
            </div>
            {"\n"}
            <div className="mb-3">
                <input
                    type="file"
                    id="id_image"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    style={{fontSize: "10pt"}}
                    onChange={changePhoto}
                    className="form-control"/>
            </div>
            <p className="form-text text-muted" style={{fontSize: "10pt"}}>И наконец-то продемонстрируйте это на фотографий!</p>
            {"\n"}
            <div className="form-group row">
                <div className="col-sm-10">
                    <button onClick={handleCreatePostButton} className="btn btn-primary" style={{fontSize: "10pt"}}>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePostForm;

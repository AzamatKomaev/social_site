import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import '../../../../App.css';


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

    const getPostDataInForm = (title, content, category, photo) => {
        let formData = new FormData()
        formData.append("title", title)
        formData.append("text", content)
        formData.append("category", category)
        if (photo != null) {
            formData.append("photo", photo)
        }
        return formData
    }


    const createPost = () => {
        if (category == undefined || category == "Выбери категорию") {
            alert("Вы не указали категорию. Куда добавлять пост? -_-")
        }
        let dataForm = getPostDataInForm(title, content, category, photo)
        console.log(dataForm)
        axios.post("http://127.0.0.1:8000/api/v1/category/" + category + "/", dataForm,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt"),
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then((result) => {
                window.location.href = 'http://127.0.0.1:8000/categories/c_id/' + category + "/";
            })
            .catch((error) => {
                if (error.response.status == 400) {
                    setError(error.response.data)
                }
            })
    }


    return (
        <div className="container">
            <h2 style={{margin: "0 35%", fontSize:"35px"}}>Добавить пост</h2>{"\n\n"}

            <label htmlFor="select-category">Категория</label>{"\n"}
            <select class="browser-default custom-select" id="select-category" onChange={e => setCategory(e.target.value)}>
                <option value={null} selected>Выбери категорию</option>
                {props.categories.map((category) => (
                    <option value={category.id}>{category.name}</option>
                ))}
            </select>
            <p className="text-danger" style={{marginTop: "-15px"}}>{error.category}</p>
    
            <div className="form-group" style={{marginTop: "100px"}}>
                <label htmlFor="id_title">Заголовок</label>{"\n"}
                <input
                    type="text"
                    name="title"
                    maxlength="199"
                    id="id_title"
                    className="form-control"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="У меня есть мечта..."
                 />
                <p className="form-text text-muted" style={{fontSize:"10pt"}}>Опишите основной смысл поста в двух словах.</p>
                <p className="text-danger" style={{marginTop: "-15px"}}>{error.title}</p>
            </div>
            {"\n"}
            <div className="form-group">
                <label htmlFor="id_text">Контент</label>{"\n"}
                <textarea
                    name="text"
                    rows="10"
                    required=""
                    id="id_text"
                    className="form-control"
                    spellcheck="false"
                    onChange={e => setContent(e.target.value)}
                    placeholder="Мечта - особый вид воображения, представляющий собой самостоятельное создание новых образов, направленный на будущее и выражающий желания человека.">
                {content}
                </textarea>
                <p className="form-text text-muted" style={{fontSize: "10pt"}}>А теперь полностью излейте свою душу.</p>
                <p className="text-danger" style={{marginTop: "-15px"}}>{error.text}</p>
            </div>
            {"\n"}
            <div className="input-group mb-3">
                <div className="custom-file">
                    <div className="custom-file">
                        <label htmlFor="id_image" className="custom-file-label">Выберите файл</label>
                        <input
                            type="file"
                            className="custom-file-input"
                            id="id_image"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            onChange={changePhoto}
                         />
                    </div>
                    <div className="input-group-append">
                        <span className="input-group-text" id="">Upload</span>
                    </div>
                </div>
            </div>
            <p className="form-text text-muted" style={{fontSize: "10pt"}}>И наконец-то продемонстрируйте это на фотографий!</p>
            {"\n"}
            <div className="form-group row">
                <div className="col-sm-10">
                    <button onClick={createPost} className="btn btn-primary">Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePostForm;

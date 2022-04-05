import axios, {AxiosResponse} from "axios";
import {ContentPath} from "../backpaths/contentPaths";
import {defaultConfig} from "./authData";


export class ContentService {
    static getCategoryList = async(): Promise<AxiosResponse> => {
        try {
            return await axios.get(ContentPath.categoryList())
        } catch (err: any) {
            return err.response
        }
    }

    static getPostList = async(categoryId: number | string, userId: number | string,  page: number): Promise<AxiosResponse> => {
        try {
            return await axios.get(ContentPath.postList(categoryId, userId, page))
        } catch (err: any) {
            return err.response
        }
    }

    static getPostDetail = async(postId: number): Promise<AxiosResponse> => {
        try {
            return await axios.get(ContentPath.postDetail(postId))
        } catch (err: any) {
            return err.response
        }
    }

    static deletePost = async(postId: number): Promise<AxiosResponse> => {
        try {
            return await axios.delete(ContentPath.postDetail(postId), defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }

    static getCommentList = async(postId: number): Promise<AxiosResponse> => {
        try {
            return await axios.get(ContentPath.commentList(postId))
        } catch (err: any) {
            return err.response
        }
    }

    static getCommentDetail = async(commentId: number): Promise<AxiosResponse> => {
        try {
            return await axios.get(ContentPath.commentDetail(commentId))
        } catch (err: any) {
            return err.response
        }
    }

    static createComment = async(postId: number, content: string): Promise<AxiosResponse> => {
        try {
            return await axios.post(ContentPath.commentList(postId), {
                text: content, post: postId
            }, defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }
}

export class CreatingPost {
    private readonly title: string | undefined;
    private readonly content: string | undefined;
    private readonly category: number | undefined;
    private readonly photo: File | null;

    public constructor(title: string, content: string, category: number, photo: File | null) {
        this.title = title
        this.content = content
        this.category = category
        this.photo = photo
    }

    private createDataForm(): FormData {
        let dataForm: FormData = new FormData()

        if (this.title) dataForm.append('title', this.title)
        if (this.content) dataForm.append('text', this.content)
        if (this.category) dataForm.append('category', String(this.category))
        if (this.photo) dataForm.append('photo', this.photo)
        return dataForm
    }

    public async createPost(): Promise<AxiosResponse> {
        const dataForm: FormData = this.createDataForm()

        try {
            return await axios.post(ContentPath.postList('', '', 0), dataForm, defaultConfig)
        } catch (err: any) {
            return err.response
        }
    }
}

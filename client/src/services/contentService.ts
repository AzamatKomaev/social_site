import axios, {AxiosResponse} from "axios";
import {ContentPath} from "../backpaths/contentPaths";


export class ContentService {
    static getCategoryList = async(): Promise<AxiosResponse> => {
        try {
            return await axios.get(ContentPath.categoryList())
        } catch (err: any) {
            return err.response
        }
    }

    static getPostList = async(categoryId: number): Promise<AxiosResponse> => {
        try {
            return await axios.get(ContentPath.postList(categoryId))
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
}

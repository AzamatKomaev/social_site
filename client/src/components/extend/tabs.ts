import {CategoryFrontPath, ChatFrontPath} from "../../frontpaths/frontPath";


interface TabI {
    className: string,
    href: string,
    value: string
}


export const generalTabs: Array<TabI> = [
    {
        className: "nav-link active",
        href: CategoryFrontPath.categoryList(),
        value: "Категорий"
    }
]

export const authTabs = [
    {
        className: "nav-link",
        href: CategoryFrontPath.postCreate(),
        value: "Создать пост"
    },
    {
        className: "nav-link",
        href: ChatFrontPath.chatList(),
        value: "Чаты"
    },
    {
        className: "nav-link",
        href: CategoryFrontPath.notificationList(),
        value: "Уведомления"
    }
]

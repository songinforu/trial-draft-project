import requests from "./config/request.js"
//合作伙伴
export const getHomeList = () => {
    return requests.get("/system/logo/homeList")
}
//时尚活动探索新潮趋势
export const getFashionActivity = (params) => {
    return requests.get(`/system/fashionActivity?pagesize=${params.pagesize}`)
}
//物流企业保证运输质量
export const getLogistics = (params) => {
    return requests.get(`/supplier/logistics?pagesize=${params.pagesize}`)
}
//供应链企业提供原材料与协调服务
export const getSupplier = (params) => {
    return requests.get(`/supplier/supplier?pagesize=${params.pagesize}`)
}
//原创设计工作室
export const getHomeDesignList = () => {
    return requests.get("/system/company/homeDesignList")
}
//生产伙伴发布的空闲产能、区块链和物联网技术保证的联盟企业真实产能
export const getCapacityHomeList = (params) => {
    return requests.get(`/capacity/capacity/homeList?type=${params.type}`)
}
//查找商家发布的一手需求
export const getDemandHomeList = () => {
    return requests.get("/demand/demand/homeList")
}
//地图-公司
export const getCompanyList = () => {
    return requests.get("/system/area/getCompanyList")
}
//地图-个人
export const getPersonList = () => {
    return requests.get("/system/area/getPersonList")
}

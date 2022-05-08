const background = ['../../images/swiper_image1.jpg', '../../images/swiper_image2.jpg', '../../images/swiper_image3.jpg']

const goodList = ['../../images/goods_images1.jpg','../../images/goods_images2.jpg','../../images/goods_images3.jpg','../../images/goods_images4.jpg','../../images/goods_images5.jpg','../../images/goods_images6.jpg']

const order = [
    {
        order_id:65266,
        createtime: "2022-3-11 14:57:36",
        shopping_order:[
            {
                name:"麻婆豆腐",
                picture:"../../images/mapodoufu.jpg",
                price:30,
            },
            {
                name:"红烧肉",
                picture:"../../images/goods_images1.jpg",
                price:50,
            },
        ]
    },
    {
        order_id: 656266,
        createtime: "2022-3-10 14:57:36",
        shopping_order:[
            {
                name:"小龙虾",
                picture:"../../images/goods_images4.jpg",
                price:60,
            }
        ]
    }
]

const foods = [
    {
        foodsList_id:1,
        name:"麻婆豆腐",
        num:1,
        picture:"../../images/mapodoufu.jpg",
        price:30,
    },
    {
        foodsList_id:2,
        name:"红烧肉",
        num:1,
        picture:"../../images/goods_images1.jpg",
        price:50,
    },
    {
        foodsList_id:3,
        name:"小龙虾",
        num:2,
        picture:"../../images/goods_images4.jpg",
        price:60,
    }
]

const foodsList = [
    {
        id:1,
        name:"渝味轩",
    },
    {
        id:2,
        name:"老妈菜馆",
    },
    {
        id:3,
        name:"兰湘子",
    }
] 
const adminList = [
    {
        username:"张三",
        password:"3456dvfdv",
    },
    {
        username:"李四",
        password:"5fdv65+",
    },
    {
        username:"王五",
        password:"56dvdsvd$",
    }
]
const admin = [
    {
        id:1,
        name:"用户管理",
    },
    {
        id:2,
        name:"订单管理",
    },
    {
        id:3,
        name:"菜品管理",
    }
]
const info = []
const food = []
export {
    goodList,
    background,
    foods,
    foodsList,
    food,
    order,
    admin,
    adminList,
    info
}
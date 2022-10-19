import { datos} from "../Data/data.js";
import { getAllToken, insertNewEstrategy } from "../controllers/getTokenControllers.js";

export class allMethods {
    static async insertItem () {

        let result = await getAllToken()
        const itemsInt = datos.slice(0,2)
        let timeOut = 0
        let iterado = 0
        let init = 2
        let finish = 4
        let lengthArray = datos.length
        itemsInt.map(async (element) =>{
            await insertNewEstrategy(result.data.token, element)

        })

        const set = setInterval( async ()=>{
            if(timeOut < 298000){
                let items = datos.slice(init,finish)
                const { data } = result
                items.map( async ( element ) =>{
                    await insertNewEstrategy(data.token, element)
                })
                timeOut+=2000
                iterado+=2
                init=finish
                finish+=2
            }else{
                timeOut = 2000
                result = await getAllToken()
            }
            if(iterado >= lengthArray){
                console.log('finsh')
                clearInterval(set)
            }
        },2000)

    }


}
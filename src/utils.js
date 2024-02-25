import {peopleOptions} from './constants';


const getEachPersonTotal = (receiptItems) => {
    const sum = {};
    peopleOptions.forEach(({id}) => {sum[id] = 0});
    receiptItems.forEach((item) => {
        if(item.split && item.split.length > 0){
            const splitAmount = item.total/item.split.length;
            item.split.forEach((splitPersonId) => {
                sum[splitPersonId] += splitAmount;
            })
        }else{
            const splitAmount = item.total/peopleOptions.length;
            peopleOptions.forEach(({id}) => {
                sum[id] += splitAmount;
            })
        }   
    })

    const updatedSumWithNames = peopleOptions.map((person) => ({label : person.label, share : parseFloat(sum[person.id]).toFixed(2)}))
    return updatedSumWithNames;
}

export default getEachPersonTotal;
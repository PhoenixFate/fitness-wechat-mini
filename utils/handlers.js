/**
 * 从个人信息中清洗出，总课时/已完成课时/未完成课时
 * @param data
 * @returns {{donePlanArr: [], customerPlanDaysArr: [], undoPlanArr: []}|{donePlanArr: *[], customerPlanDaysArr: *[], undoPlanArr: *[]}}
 */
export const handlePlanAfterApi = (data) => {
  try {
    const {customerPlanPeriods} = data.customer.customerPlan.trainingPlan
    const customerPlanWeeks = customerPlanPeriods.map(item => item.customerPlanWeeks)
    const customerPlanWeeksArr = Array.prototype.concat.apply([], customerPlanWeeks)
    const customerPlanDays = customerPlanWeeksArr.map(item => item.customerPlanDays)
    const customerPlanDaysArr = Array.prototype.concat.apply([], customerPlanDays)
    const undoPlanArr = customerPlanDaysArr.filter(item => item.status === 0)
    const donePlanArr = customerPlanDaysArr.filter(item => item.status === 1)
    return {
      donePlanArr,
      undoPlanArr,
      customerPlanDaysArr,
    }
  } catch (e) {
    console.log('handlePlanAfterApi:', e)
    return {
      donePlanArr: [],
      undoPlanArr: [],
      customerPlanDaysArr: [],
    }
  }
}
/**
 * 从个人信息中清洗出，体测数据
 * @param data
 * @returns {{}|{}|*}
 */
export const handleBodyInfoAfterApi = (data) => {
  try {
    return data.customer.bodyTestData
  } catch (e) {
    console.log('handleBodyInfoAfterApi:', e)
    return {}
  }
}
/**
 * 从日计划中清洗出动作数组
 * @param dayPlan
 * @returns {{}}
 */
export const handleMovementListArrFromDayPlan = (dayPlan) => {
  try {
    const exerciseList = dayPlan.classInfo.exercises
    const actionSets = exerciseList.map(i => i.actionSets)
    const actionSetsArr = actionSets.flat()
    let arr = [];
    actionSetsArr.forEach((item) =>{
      item['actions'].forEach(item2 =>{
        item2['actionSetType'] = item['actionSetType'];
        if(item2['actionSetType'] == 'COMMON_SET'){
          item2['actionSetTypeName'] = '普通组'
        }else if(item2['actionSetType'] == 'SUPER_SET'){
          item2['actionSetTypeName'] = '超级组'
        }else if(item2['actionSetType'] == 'REDUCE_SET'){
          item2['actionSetTypeName'] = '递减组'
        }
        item2['standardSetNumber'] = item['standardSetNumber'];
        item2['realSetNumber'] = item['realSetNumber'];
        if(item2['realSetNumber'] >= item2['standardSetNumber']){
          item2['isFinished'] = true;
        }else {
          item2['isFinished'] = false;
        }
        arr.push(item2);
      })
    })
    return arr;
    // const actionsList = actionSetsArr.map(i => i.actions)
    // return actionsList.flat()
  } catch (e) {
    console.log('handleMovementListArrFromDayPlan:', e)
    return []
  }
}

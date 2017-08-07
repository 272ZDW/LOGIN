function handleError(message,error) {
    if(error){
        console.log(message + '失败')
        console.error(error)
        return false
    }else{
        console.log(message+ '成功')
        return true
    }
}
module.exports = handleError
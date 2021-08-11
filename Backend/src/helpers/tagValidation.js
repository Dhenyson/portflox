async function tagValidation(tagsReceived, validTags, amount) {
    amount = amount + 1
    /** Verifica se nenhum arumento esta vazio */
    if (!tagsReceived || !validTags || !amount) {
        return { status: 'error', error: 'Invalid args' }
    }
    /** Separa a string de tags em um array. Primeiro separa por virgula,
     * depois com reduce verifica se tirando espaço o item não fica vazio*/
    var count = 0
    const tagsArrayFull = tagsReceived.split(',').reduce((acc, item) => {
        if (item.trim().length >= 1) {
            acc[count] = item.trim()
            count++
        }
        return acc
    }, [])
    /** Remove tags repetidas */
    var tagsArray = tagsArrayFull.filter((el, i) => {
        return tagsArrayFull.indexOf(el) === i
    })
    /** Verifica se a quantidade de tags não ultrapassou o limote */
    if (tagsArray.length >= amount) {
        return { status: 'error', error: 'Tag limit exceeded' }
    }

    /** Pega o nome das tags para fazer validação de dados */
    const validTagsNames = validTags[0].tags.reduce((acc, item, index) => {
        acc[index] = item.name
        return acc
    }, [])
    /** Verifica se todas tags informadas correspondem as tags validas */
    const tagsMatch = () => {
        var result = true
        for (var i = 0; i < tagsArray.length; i++) {
            if (!validTagsNames.includes(tagsArray[i])) {
                result = false
                break
            }
        }
        return result
    }
    if (!tagsMatch()) {
        return { status: 'error', error: 'Invalid tag' }
    }

    /** Se tudo ocorreu bem então chegamos aqui e finalizamos*/
    return { status: 'success', value: tagsArray }
}

module.exports = tagValidation

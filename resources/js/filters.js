import pluralise from 'pluralize'
import numeral from 'numeral'


export function capitalizeFirstLetter(word) {
    
    if(!word) return

    return word.charAt(0).toUpperCase() + word.slice(1)
}

export function pluralize(value,number) {

    return pluralise(value,number)
}
export function numeralize(number) {

    return numeral(number).format('0a')
}
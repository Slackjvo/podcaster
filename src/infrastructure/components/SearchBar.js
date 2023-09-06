import { useState, useEffect} from 'react'

export default function SearchBar({
    options,
    resultsFound,
    setResults,
    attributeToFilter,
    placeholderText
}) {

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (inputValue) {
            setResults(options.filter(option => option[attributeToFilter].toLowerCase().includes(inputValue)))
        } else {
            setResults(options)
        }
    }, [inputValue])

    const handleChange = (e) => {
        setInputValue(e.target.value.toLowerCase())
    }

    return (
        <div className='search-bar'>
            <div className='counter'>{resultsFound.length}</div>
            <input name="search" onChange={handleChange} value={inputValue} placeholder={placeholderText} />
        </div>

    )
}
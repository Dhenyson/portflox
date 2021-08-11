import { useState } from 'react'

export default function loaderBarVisibility() {
    const [loaderBarVisibility, setLoaderBarVisibility] = useState(0)

    return {
        loaderBarVisibility,
        setLoaderBarVisibility
    }
}

import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom";


const allDummyData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`
}));

function fakeApi(count, offset) {
    const data = allDummyData.slice(offset, offset + count);

    return Promise.resolve({
        count: allDummyData.length,
        data: data
    });
}


const Pagination = ({ ApiLink, ItemPerPage }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page") || 1)
    const [pageData, setPageData] = useState(undefined);

    useEffect(() => {
        let offset = (page - 1) * ItemPerPage;
        // fetch(`${ApiLink}?count=${ItemPerPage}&off=${offset}`)
        //     .then((res) => res.json())
        //     .then((data) => setPageData(data));
        fakeApi(ItemPerPage, offset).then((data) => setPageData(data))
    }, [page, ApiLink, ItemPerPage])

    if (!pageData) return <>Loading...</>;

    // Total pages based on returned count

    const totalPages = Math.ceil(pageData.count / ItemPerPage)

    return (
        <>
            <div>Pagination</div>
            {
                [...Array(totalPages)].map((_, i) => {
                    const num = i + 1;
                    return (
                        <button onClick={() => setSearchParams({ page: num })}>
                            {i + 1}
                        </button>
                    )
                }
                )
            }
        </>
    )
}

export default Pagination;

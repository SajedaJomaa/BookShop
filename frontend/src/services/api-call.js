
export async function fetchAvailableBooks(page) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=search+terms/${page}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch book data: ${errorData.error.message}`);
    }
    const resData = await response.json();
    console.log(resData);
    return resData;
}


export const fetchSelectedBook = async (id) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching the selected book:', error);
        throw error;
    }
};


// export const fetchBooksByQuery = async (query) => {
//     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
//     const data = await response.json();
//     return data
//         .items.map(item => ({
//             id: item.id,
//             title: item.volumeInfo.title,
//             author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
//             volumeInfo: item.volumeInfo,
//         }));
// };

// export const fetchSelectedBookByTitle = async (title) => {
//     const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`);
//     const data = await response.json();
//     return data.items[0];
// };



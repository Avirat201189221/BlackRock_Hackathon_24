"use client"

import React from 'react'
import NewsCard from './components/newsCard';
export default function index() {
  
    const fetcher = () => {
        fetch('https://eodhd.com/api/news?s=AAPL.US&offset=0&limit=2&api_token=66a961143828f7.74148834&fmt=json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log(response);
          
        })
        // .then(data => {
        //   setData(data);
        //   setLoading(false);
        // })
        // .catch(error => {
        //   setError(error);
        //   setLoading(false);
        // });
    }
  
  return (
    <div>
        <NewsCard/>
        <NewsCard/>        
    </div>
  )
}

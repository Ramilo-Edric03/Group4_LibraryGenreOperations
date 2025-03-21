'use client';
import AddGenre from '@/component/AddGenre/AddGenre';
import React from 'react'
import { useState } from 'react'
import { useGetGenresQuery } from '@/rtk/genreApi';
import UpdateGenre from '@/component/UpdateGenre/UpdateGenre';
import DeleteGenre from '@/component/DeleteGenre/DeleteGenre';

export default function Genre() {
  const [operation, setOperation] = useState('add');
  const [genreid, setGenreId] = useState(0);
  const { data: genras, isLoading, isError, isSuccess, error, refetch } = useGetGenresQuery();

  const getGenreId = (id) => {
    setOperation('edit');
    setGenreId(id);
  }

  const backUpdateId = (opr) => {
    setOperation(opr);
  }

  return (
    <div className='genre-container'>
      {operation === 'add' ? (
        <AddGenre />
      ) : (
        <UpdateGenre genreid={genreid} handleBack={backUpdateId} />
      )}

      <div className='genre-data'>
        {isLoading && <h3>Loading...</h3>}
        {isError && <h3>Something went wrong</h3>}
        {isSuccess && (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "5%", border: "1px solid red" }}>#</th>
                <th style={{ width: "55%", border: "1px solid red" }}>Genre Name</th>
                <th style={{ width: "15%", border: "1px solid red" }}>Status</th>
                <th style={{ width: "25%", border: "1px solid red" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {genras
                .filter((value) => value.status === 'ACTIVE')
                .map((value, index) => (
                  <tr key={value.id}>
                    <td style={{ width: "5%", border: "1px solid red" }}>{index + 1}</td>
                    <td style={{ width: "55%", border: "1px solid red" }}>{value.genre_name}</td>
                    <td style={{ width: "15%", border: "1px solid red" }}>{value.status}</td>
                    <td style={{width:"25%",border:"1px solid red"}}>
                        <button onClick={() => getGenreId(value.id)}>Edit</button>
                        <DeleteGenre 
                            genreId={value.id}
                            genreName={value.genre_name}
                            onDeleteSuccess={refetch}
                        />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
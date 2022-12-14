import React, { useState } from 'react'

const SearchComp = ({ getSearchedId }: any) => {
  const [searchedId, setSearchedId] = useState<string>('');
  return (
    <div className="mt-4">
      <div className="lg:w-4/6 md:w-5/6 bg-gray-800 bg-opacity-50 rounded-lg p-4 flex flex-col mx-auto w-full mt-10 md:mt-0">
      <div className="flex space-x-2">
        <input
          onChange={(e: any) => setSearchedId(e.target.value)}
          placeholder="ID"
          type="text"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm font-medium"
          onClick={(e: any) => getSearchedId(searchedId)}
        >
          Search🔍
        </button>
      </div>

        
      </div>
    </div>
  )
}

export default SearchComp

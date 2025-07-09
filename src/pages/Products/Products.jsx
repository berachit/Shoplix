import React from 'react'
import { useLoaderData } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'

export default function Products() {
  const apiData = useLoaderData()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {apiData.map((data) => (
          <ProductCard key={data.id} product={data} />
        ))}
      </div>
    </div>
  )
}

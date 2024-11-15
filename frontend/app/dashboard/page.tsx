"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

type DataRecord = {
  _id: string;
  originalUrl: string;
  clicks: number;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
};

export default function Dashboard() {
  const [data, setData] = useState<DataRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<DataRecord[]>(
          "http://localhost:5001/"
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentData = data.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleSortByClicks = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.clicks - b.clicks;
      } else {
        return b.clicks - a.clicks;
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <section className="bg-black min-h-screen p-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-white">Dashboard Page</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 text-left text-gray-300 font-medium cursor-pointer">
                No.
              </th>
              <th className="px-4 py-2 text-left text-gray-300 font-medium cursor-pointer">
                ID
              </th>
              <th className="px-4 py-2 text-left text-gray-300 font-medium cursor-pointer">
                Original URL
              </th>
              <th className="px-4 py-2 text-left text-gray-300 font-medium cursor-pointer">
                Short Code
              </th>
              <th
                className="px-4 py-2 text-left text-white font-medium flex items-center space-x-1 cursor-pointer"
                onClick={handleSortByClicks}
              >
                Clicks {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th className="px-4 py-2 text-left text-gray-300 font-medium">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-gray-300 font-medium">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((record, index) => (
              <tr key={record._id} className="border-t border-gray-700">
                <td className="px-4 py-2 text-gray-400">
                  {firstItemIndex + index + 1}
                </td>
                <td className="px-4 py-2 text-gray-400">{record._id}</td>
                <td className="px-4 py-2">
                  <a
                    href={record.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {record.originalUrl}
                  </a>
                </td>
                <td className="px-4 py-2 text-gray-400">{record.shortCode}</td>
                <td className="px-4 py-2 text-gray-400">{record.clicks}</td>
                <td className="px-4 py-2 text-gray-400">
                  {new Date(record.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-gray-400">
                  {new Date(record.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4 items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-700 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
}

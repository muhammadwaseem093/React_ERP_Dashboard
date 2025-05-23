// import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Brush
} from "recharts";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const data = [
  { name: "Jan", stockIn: 12, stockOut: 9 },
  { name: "Feb", stockIn: 14, stockOut: 10 },
  { name: "Mar", stockIn: 13, stockOut: 13 },
  { name: "Apr", stockIn: 15, stockOut: 14 },
  { name: "May", stockIn: 9, stockOut: 7 },
  { name: "Jun", stockIn: 11, stockOut: 9 },
  { name: "Jul", stockIn: 14, stockOut: 10 },
  { name: "Aug", stockIn: 16, stockOut: 12 },
  { name: "Sep", stockIn: 14, stockOut: 11 },
  { name: "Oct", stockIn: 12, stockOut: 9 },
  { name: "Nov", stockIn: 13, stockOut: 10 },
  { name: "Dec", stockIn: 11, stockOut: 8 },
];

// const products = ["Fiery Chicken Zinger Burger", "Chicken BBQ Burger", "Sunrise Chicken Burger"];

export default function Dashboard() {
  // const [selectedCategory] = useState("Consumables");
  // const [selectedProduct] = useState(products[0]);

  return (
    <div className="space-y-5 text-sm">
      {/* Dropdowns */}
      <div className="bg-gray-100 py-2">
        <div className="flex flex-col items-center space-y-3">
        <button className="flex items-center text-blue-500 font-semibold text-sm hover:underline">
          Consumables
          <ChevronDownIcon className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="flex flex-col items-left space-y-3">
        <div className="text-sm font-medium text-gray-800 pl-5">Inventory</div>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <button className="flex items-center text-blue-500 font-semibold text-sm hover:underline">
          Fiery Chicken Zinger Burger
          <ChevronDownIcon className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>


        
      {/* Stock Report */}
      <div className="p-4 bg-white shadow rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Stock Report</h2>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"/>Stock In
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"/>Stock Out
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{top:10, right:20, bottom:40, left:0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Brush dataKey="name" height={20} stroke="#8884d8" />
            <Bar dataKey="stockIn" stackId="a" fill="#60A5FA" radius={[4,4,0,0]} />
            <Bar dataKey="stockOut" stackId="a" fill="#A78BFA" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Table */}
      <div className=" rounded-lg bg-white shadow">
        <div className="flex justify-between items-center px-4 py-4 border-b text-sm font-semibold">
          <span>Category</span>
          <button className="flex items-center text-blue-600 font-semibold gap-1">
            Burger <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Meat</th>
              <th className="px-4 py-2">Cheese</th>
              <th className="px-4 py-2">Sauce</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            <tr className="border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Fiery Chicken Zinger Burger</td>
              <td className="px-4 py-2">200g</td>
              <td className="px-4 py-2">60g</td>
              <td className="px-4 py-2">10oz</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Chicken BBQ Burger</td>
              <td className="px-4 py-2">200g</td>
              <td className="px-4 py-2">60g</td>
              <td className="px-4 py-2">15oz</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Sunrise Chicken Burger</td>
              <td className="px-4 py-2">250g</td>
              <td className="px-4 py-2">120g</td>
              <td className="px-4 py-2">20oz</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

import type { TooltipProps } from "recharts";

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload?.length){
    return (
      <div className="bg-white p-2 rounded shadow text-sm">
        <p className="font-semibold">{label}</p>
        <p className="text-blue-500"> Stock In: {payload[0].value}</p>
        <p className="text-purple-500">Stock Out: {payload[1].value}</p>
      </div>
    )
  }
  return null;
}

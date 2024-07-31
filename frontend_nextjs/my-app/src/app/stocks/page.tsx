// pages/index.tsx
import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="space-y-4">
        <h1 className='text-5xl mb-10'>Stocks</h1>
        <Link href="/stocks/usstocks" passHref>
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 cursor-pointer mb-10">
            US Stocks
          </div>
        </Link>
        <Link href="/stocks/indianstocks" passHref>
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 cursor-pointer">
            Indian Stocks
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

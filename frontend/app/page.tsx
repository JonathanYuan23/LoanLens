'use client';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Search } from 'app/search';
import { UsersTable } from 'app/users-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const fetchUserData = async (user_id: string) => {
  const { data } = await axios.get(
    `http://localhost:5000/userAssets/${user_id}`
  );
  console.log(data);
  return data;
};
export default function getAssetsPage() {
  const queryClient = new QueryClient();
  const [userId, setUserId] = useState('');
  const [queryEnabled, setQueryEnabled] = useState(false);
  const [data, setData] = useState();

  // const { data, refetch } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: () => fetchUserData(userId),
  //   enabled: false
  //   // on: () => setQueryEnabled(false) // Reset queryEnabled after query is done
  // });

  const handleFetchData = async () => {
    console.log('handleFetchData');
    const data = await fetchUserData(userId);
    console.log(data);
    setData(data);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">User Assets</h1>
        </div>
        <div className="w-full mb-4">
          <Input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="w-full mb-4">
          <Button onClick={() => handleFetchData()}>Fetch Data</Button>
        </div>
        {/* <UsersTable users={data} /> */}
      </main>
    </QueryClientProvider>
  );
}

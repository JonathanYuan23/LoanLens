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

const fetchUserData = async (user_id: string) => {
  const { data } = await axios.get(
    `http://localhost:5000/userAssets/${user_id}`
  );
  return data;
};
export default function getAssetsPage() {
  const queryClient = new QueryClient();
  const [userId, setUserId] = useState('');
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchUserData(userId)
  });
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
        <UsersTable users={data} />
      </main>
    </QueryClientProvider>
  );
}

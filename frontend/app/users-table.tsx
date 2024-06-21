'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import { deleteUser } from './actions';
import { useRouter } from 'next/navigation';

export function UsersTable(data: any) {
  const router = useRouter();

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Assets
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>data</TableBody>
        </Table>
      </form>
      (
      <Button className="mt-4 w-40" variant="secondary">
        Next Page
      </Button>
      )
    </>
  );
}

// function UserRow({ user }: { user: SelectUser }) {
//   const userId = user.id;
//   const deleteUserWithId = deleteUser.bind(null, userId);

//   return (
//     <TableRow>
//       <TableCell className="font-medium">{user.name}</TableCell>
//       <TableCell className="hidden md:table-cell">{user.email}</TableCell>
//       <TableCell>{user.username}</TableCell>
//       <TableCell>
//         <Button
//           className="w-full"
//           size="sm"
//           variant="outline"
//           formAction={deleteUserWithId}
//           disabled
//         >
//           Delete
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// }

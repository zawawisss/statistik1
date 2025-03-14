// import React from 'react';
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from '@heroui/react';
// import { Member } from '../types/statistics';

// interface MemberTableProps {
//   members?: Member[];
// }

// export function MemberTable({ members = [] }: MemberTableProps) {
//   return (
//     <Table aria-label="Member data table">
//       <TableHeader>
//         <TableColumn>NAMA</TableColumn>
//         <TableColumn>JABATAN</TableColumn>
//         <TableColumn>PENGKADERAN TERAKHIR</TableColumn>
//       </TableHeader>
//       <TableBody>
//         {members.map((member) => (
//           <TableRow key={member.id}>
//             <TableCell>
//               <User
//                 name={member.name}
//                 avatarProps={{
//                   src: member.imageUrl,
//                   size: "sm"
//                 }}
//               />
//             </TableCell>
//             <TableCell>{member.position}</TableCell>
//             <TableCell>{member.lastTraining}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }
import {
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";


export const SubscriptionTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-800 hidden lg:table-row">
        <TableHead className="text-gray-200 border-r border-gray-400">
          Subscription Name
        </TableHead>
        <TableHead className="text-gray-200 border-r border-gray-400">
          Category
        </TableHead>
        <TableHead className="text-gray-200 border-r border-gray-400">
          Amount
        </TableHead>
        <TableHead className="text-gray-200 border-r border-gray-400">
          Payment Method
        </TableHead>
        <TableHead className="text-gray-200 border-r border-gray-400">
          Next Billing Date
        </TableHead>
        <TableHead className="text-gray-200 border-r border-gray-400">
          Status
        </TableHead>
        <TableHead className="text-gray-200 border-r border-gray-400">
          Frequency
        </TableHead>
        <TableHead className="text-gray-200 border-r border-gray-400">
          Last Paid Date
        </TableHead>
        <TableHead className="text-gray-200">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
import {
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
export const SubscriptionTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-800 hover:bg-transparent">
        <TableHead className="text-gray-400 border-r border-gray-800">Subscription Name</TableHead>
        <TableHead className="text-gray-400 border-r border-gray-800">Category</TableHead>
        <TableHead className="text-gray-400 border-r border-gray-800">Amount</TableHead>
        <TableHead className="text-gray-400 border-r border-gray-800">Payment Method</TableHead>
        <TableHead className="text-gray-400 border-r border-gray-800">Next Billing Date</TableHead>
        <TableHead className="text-gray-400 border-r border-gray-800">Status</TableHead>
        <TableHead className="text-gray-400 border-r border-gray-800">Frequency</TableHead>
        <TableHead className="text-gray-400 border-r border-gray-800">Last Paid Date</TableHead>
        <TableHead className="text-gray-400">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
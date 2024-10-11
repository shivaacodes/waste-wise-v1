"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

type WasteEntry = {
  id: string;
  houseowner: string;
  address: string;
  wasteType: string;
  weight: number;
  status: "Collected" | "Pending" | "Skipped";
};

const WASTE_ENTRIES: WasteEntry[] = [
  {
    id: "WASTE-001",
    houseowner: "SHIVA",
    address: "Shivam, Mahila Samajam Road, Chembumukku, Kakkanad",
    wasteType: "Plastic",
    weight: 5.2,
    status: "Collected",
  },
  {
    id: "WASTE-002",
    houseowner: "Jane Smith",
    address: "456 Eco Ave, Town",
    wasteType: "Paper",
    weight: 3.7,
    status: "Pending",
  },
  {
    id: "WASTE-003",
    houseowner: "Bob Johnson",
    address: "789 Recycle Rd, Village",
    wasteType: "Glass",
    weight: 2.1,
    status: "Skipped",
  },
  // Add more entries as needed
];

export default function WasteCollectorDashboard() {
  const [filter, setFilter] = useState("");
  const [entries, setEntries] = useState(WASTE_ENTRIES);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    const filteredEntries = WASTE_ENTRIES.filter(
      (entry) =>
        entry.houseowner.toLowerCase().includes(e.target.value.toLowerCase()) ||
        entry.address.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setEntries(filteredEntries);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Panampilly Nagar</h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Filter entries..."
          value={filter}
          onChange={handleFilterChange}
          className="max-w-sm"
        />
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="collected">Collected</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="skipped">Skipped</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Waste Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="plastic">Plastic</SelectItem>
              <SelectItem value="paper">Paper</SelectItem>
              <SelectItem value="glass">Glass</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>
              Houseowner <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Waste Type</TableHead>
            <TableHead>Weight (kg)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{entry.houseowner}</TableCell>
              <TableCell>{entry.address}</TableCell>
              <TableCell>{entry.wasteType}</TableCell>
              <TableCell>{entry.weight}</TableCell>
              <TableCell>{entry.status}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
}

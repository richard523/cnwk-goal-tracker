import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ProgressReportEntry {
  senseiName: string;
  studentName: string;
  studentId: string;
  belt: string;
  level: string;
  projectId: string;
  concepts: string;
  goal1Completed: boolean;
  goal2Completed: boolean;
  firstGoalNextClass: string;
  secondGoalNextClass: string;
  senseiNotes: string;
}

interface ProgressReportTableProps {
  entries: ProgressReportEntry[];
  onEntriesChange: (entries: ProgressReportEntry[]) => void;
}

export function ProgressReportTable({ entries, onEntriesChange }: ProgressReportTableProps) {
  const [customId, setCustomId] = useState('');

  const handleAddEntry = () => {
    // For now, we just add a blank entry, the form will handle the details
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Input 
          placeholder="Enter Custom Student ID" 
          value={customId} 
          onChange={(e) => setCustomId(e.target.value)} 
        />
        <Button onClick={handleAddEntry}>Add Entry with Custom ID</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sensei Name</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Belt</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Project ID</TableHead>
            <TableHead>Concepts</TableHead>
            <TableHead>Goal 1 Completed</TableHead>
            <TableHead>Goal 2 Completed</TableHead>
            <TableHead>First Goal Next Class</TableHead>
            <TableHead>Second Goal Next Class</TableHead>
            <TableHead>Sensei Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.senseiName}</TableCell>
              <TableCell>{entry.studentName}</TableCell>
              <TableCell>{entry.studentId}</TableCell>
              <TableCell>{entry.belt}</TableCell>
              <TableCell>{entry.level}</TableCell>
              <TableCell>{entry.projectId}</TableCell>
              <TableCell>{entry.concepts}</TableCell>
              <TableCell>{entry.goal1Completed ? 'Yes' : 'No'}</TableCell>
              <TableCell>{entry.goal2Completed ? 'Yes' : 'No'}</TableCell>
              <TableCell>{entry.firstGoalNextClass}</TableCell>
              <TableCell>{entry.secondGoalNextClass}</TableCell>
              <TableCell>{entry.senseiNotes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

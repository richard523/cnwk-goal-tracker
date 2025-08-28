import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Copy, Trash2, Table } from "lucide-react";
import { PROJECT_STATUS_MAPPING, PROJECT_STATUS_OPTIONS, type GoalEntry, type InsertGoalEntry } from "@shared/schema";

interface DataEntryTableProps {
  entries: GoalEntry[];
  isLoading: boolean;
}

interface FormEntry {
  date: string;
  senseiName: string;
  ninjaName: string;
  currentProject: string;
  goal1: string;
  goal2: string;
}

export function DataEntryTable({ entries, isLoading }: DataEntryTableProps) {
  const { toast } = useToast();
  const [newEntries, setNewEntries] = useState<FormEntry[]>([]);

  // Get today's date in YYYY-MM-DD format
  const getTodaysDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Create entry mutation
  const createEntryMutation = useMutation({
    mutationFn: (entry: InsertGoalEntry) => apiRequest('POST', '/api/goal-entries', entry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/goal-entries'] });
      toast({
        title: "Success",
        description: "Goal entry created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create goal entry",
        variant: "destructive",
      });
    },
  });

  // Delete entry mutation
  const deleteEntryMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/goal-entries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/goal-entries'] });
      toast({
        title: "Success",
        description: "Goal entry deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete goal entry",
        variant: "destructive",
      });
    },
  });

  const handleAddRow = () => {
    const newEntry: FormEntry = {
      date: getTodaysDate(),
      senseiName: '',
      ninjaName: '',
      currentProject: '',
      goal1: '',
      goal2: '',
    };
    setNewEntries([...newEntries, newEntry]);
  };

  const handleProjectChange = (index: number, projectStatus: string) => {
    const updatedEntries = [...newEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      currentProject: projectStatus,
      goal1: PROJECT_STATUS_MAPPING[projectStatus as keyof typeof PROJECT_STATUS_MAPPING]?.goal1 || '',
      goal2: PROJECT_STATUS_MAPPING[projectStatus as keyof typeof PROJECT_STATUS_MAPPING]?.goal2 || '',
    };
    setNewEntries(updatedEntries);
  };

  const handleInputChange = (index: number, field: keyof FormEntry, value: string) => {
    const updatedEntries = [...newEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: value,
    };
    setNewEntries(updatedEntries);
  };

  const handleSaveEntry = (index: number) => {
    const entry = newEntries[index];
    if (!entry.senseiName || !entry.ninjaName || !entry.currentProject) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    createEntryMutation.mutate(entry);
    
    // Remove the entry from new entries after successful creation
    const updatedEntries = newEntries.filter((_, i) => i !== index);
    setNewEntries(updatedEntries);
  };

  const handleDeleteNewEntry = (index: number) => {
    const updatedEntries = newEntries.filter((_, i) => i !== index);
    setNewEntries(updatedEntries);
  };

  const handleCopyEntry = (entry: GoalEntry | FormEntry) => {
    const projectLabel = PROJECT_STATUS_OPTIONS.find(opt => opt.value === entry.currentProject)?.label || entry.currentProject;
    const formattedString = `${entry.date}, ${entry.senseiName}, ${entry.ninjaName}, ${projectLabel}, Goal 1: ${entry.goal1}, Goal 2: ${entry.goal2}`;
    
    navigator.clipboard.writeText(formattedString).then(() => {
      toast({
        title: "Success",
        description: "Copied to clipboard!",
      });
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    });
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntryMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading entries...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Goal Entries</CardTitle>
          <Button onClick={handleAddRow} data-testid="button-add-entry">
            <Plus className="w-4 h-4 mr-2" />
            Add New Entry
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {entries.length === 0 && newEntries.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Table className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
            <h3 className="text-lg font-medium text-foreground mb-2">No entries yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first goal entry</p>
            <Button onClick={handleAddRow} data-testid="button-add-first-entry">
              <Plus className="w-4 h-4 mr-2" />
              Add First Entry
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Sensei Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Ninja Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Current Project</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Goal 1</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Goal 2</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {/* New entries being edited */}
                {newEntries.map((entry, index) => (
                  <tr key={`new-${index}`} className="hover:bg-muted/25 transition-colors bg-accent/50">
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="date"
                        value={entry.date}
                        onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                        data-testid={`input-date-${index}`}
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="text"
                        placeholder="Sensei name"
                        value={entry.senseiName}
                        onChange={(e) => handleInputChange(index, 'senseiName', e.target.value)}
                        data-testid={`input-sensei-${index}`}
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="text"
                        placeholder="Ninja name"
                        value={entry.ninjaName}
                        onChange={(e) => handleInputChange(index, 'ninjaName', e.target.value)}
                        data-testid={`input-ninja-${index}`}
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Select onValueChange={(value) => handleProjectChange(index, value)} value={entry.currentProject}>
                        <SelectTrigger data-testid={`select-project-${index}`}>
                          <SelectValue placeholder="Select project status..." />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECT_STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="text"
                        placeholder="Goal 1 (auto-filled)"
                        value={entry.goal1}
                        readOnly
                        className="bg-muted text-muted-foreground"
                        data-testid={`input-goal1-${index}`}
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="text"
                        placeholder="Goal 2 (auto-filled)"
                        value={entry.goal2}
                        readOnly
                        className="bg-muted text-muted-foreground"
                        data-testid={`input-goal2-${index}`}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveEntry(index)}
                          disabled={createEntryMutation.isPending}
                          data-testid={`button-save-${index}`}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteNewEntry(index)}
                          data-testid={`button-cancel-${index}`}
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Saved entries */}
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-muted/25 transition-colors">
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="date"
                        value={entry.date}
                        readOnly
                        className="bg-muted text-muted-foreground"
                        data-testid={`text-date-${entry.id}`}
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="text"
                        value={entry.senseiName}
                        readOnly
                        className="bg-muted text-muted-foreground"
                        data-testid={`text-sensei-${entry.id}`}
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="text"
                        value={entry.ninjaName}
                        readOnly
                        className="bg-muted text-muted-foreground"
                        data-testid={`text-ninja-${entry.id}`}
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="text"
                        value={PROJECT_STATUS_OPTIONS.find(opt => opt.value === entry.currentProject)?.label || entry.currentProject}
                        readOnly
                        className="bg-muted text-muted-foreground"
                        data-testid={`text-project-${entry.id}`}
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="text"
                        value={entry.goal1}
                        readOnly
                        className="bg-muted text-muted-foreground"
                        data-testid={`text-goal1-${entry.id}`}
                      />
                    </td>
                    <td className="px-4 py-4 border-r border-border">
                      <Input
                        type="text"
                        value={entry.goal2}
                        readOnly
                        className="bg-muted text-muted-foreground"
                        data-testid={`text-goal2-${entry.id}`}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyEntry(entry)}
                          title="Copy to clipboard"
                          data-testid={`button-copy-${entry.id}`}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEntry(entry.id)}
                          disabled={deleteEntryMutation.isPending}
                          title="Delete entry"
                          data-testid={`button-delete-${entry.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

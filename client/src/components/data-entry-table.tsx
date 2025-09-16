import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient"; // apiRequest removed
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Plus, Copy, Trash2, Table, ChevronsUpDown, Pencil } from "lucide-react";
import { PROJECT_STATUS_MAPPING, PROJECT_STATUS_OPTIONS, type GoalEntry, type InsertGoalEntry } from "@shared/schema";
import { goalStorageUtility } from "@/lib/localStorage"; // Renamed to avoid conflict with global localStorage

interface DataEntryTableProps {
  entries: GoalEntry[];
  isLoading: boolean;
}

interface FormEntry {
  date: string;
  senseiName: string;
  ninjaName: string;
  currentProject: string;
  description: string;
  goal1: string;
  goal2: string;
}

export function DataEntryTable({ entries, isLoading }: DataEntryTableProps) {
  const { toast } = useToast();
  const [newEntries, setNewEntries] = useState<FormEntry[]>([]);
  const [savedSenseiName, setSavedSenseiName] = useState("");
  const [ninjaNameSearch, setNinjaNameSearch] = useState<{[key: number]: string}>({});
  const [projectSearch, setProjectSearch] = useState<{[key: number]: string}>({});
  const [showNinjaDropdown, setShowNinjaDropdown] = useState<{[key: number]: boolean}>({});
  const [showProjectDropdown, setShowProjectDropdown] = useState<{[key: number]: boolean}>({});
  const [focusNewRow, setFocusNewRow] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editedEntry, setEditedEntry] = useState<Partial<GoalEntry>>({});

  const ninjaNameRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const projectRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLInputElement | null)[]>([]);
  const saveButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const addEntryButtonRef = useRef<HTMLButtonElement | null>(null);

  // Get unique ninja names from existing entries
  const getUniqueNinjaNames = () => {
    const ninjaNames = entries.map(entry => entry.ninjaName);
    return Array.from(new Set(ninjaNames)).sort();
  };

  // Get today's date in YYYY-MM-DD format
  const getTodaysDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Load saved sensei name from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedSenseiName');
    if (saved) {
      setSavedSenseiName(saved);
    }
  }, []);

  useEffect(() => {
    if (focusNewRow && newEntries.length > 0) {
      const lastEntryIndex = newEntries.length - 1;
      ninjaNameRefs.current[lastEntryIndex]?.focus();
      setFocusNewRow(false);
    }
  }, [newEntries, focusNewRow]);

  // Save sensei name to localStorage
  const handleSenseiNameSave = () => {
    localStorage.setItem('savedSenseiName', savedSenseiName);
    toast({
      title: "Success",
      description: "Sensei name saved!",
    });
  };

  // Create entry mutation
  const createEntryMutation = useMutation({
    mutationFn: (entry: InsertGoalEntry) => goalStorageUtility.createGoalEntry(entry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goalEntries'] });
      toast({
        title: "Success",
        description: "Goal entry created successfully",
      });
      addEntryButtonRef.current?.focus();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create goal entry",
        variant: "destructive",
      });
    },
  });

  // Update entry mutation
  const updateEntryMutation = useMutation({
    mutationFn: (entry: GoalEntry) => goalStorageUtility.updateGoalEntry(entry.id, entry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goalEntries'] });
      toast({
        title: "Success",
        description: "Goal entry updated successfully",
      });
      setEditingEntryId(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update goal entry",
        variant: "destructive",
      });
    },
  });

  // Delete entry mutation
  const deleteEntryMutation = useMutation({
    mutationFn: (id: string) => goalStorageUtility.deleteGoalEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goalEntries'] });
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
      senseiName: savedSenseiName,
      ninjaName: '',
      currentProject: '',
      description: '',
      goal1: '',
      goal2: '',
    };
    setNewEntries([...newEntries, newEntry]);
    setFocusNewRow(true);
  };

  const handleProjectChange = (index: number, projectStatus: string) => {
    const updatedEntries = [...newEntries];
    
    if (projectStatus === "manual") {
      updatedEntries[index] = {
        ...updatedEntries[index],
        currentProject: projectStatus,
        goal1: '',
        goal2: '',
      };
    } else {
      updatedEntries[index] = {
        ...updatedEntries[index],
        currentProject: projectStatus,
        goal1: PROJECT_STATUS_MAPPING[projectStatus as keyof typeof PROJECT_STATUS_MAPPING]?.goal1 || '',
        goal2: PROJECT_STATUS_MAPPING[projectStatus as keyof typeof PROJECT_STATUS_MAPPING]?.goal2 || '',
      };
    }
    
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
    if (!entry.ninjaName || !entry.currentProject || !entry.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in ninja name, current project, and description",
        variant: "destructive",
      });
      return;
    }

    if (entry.currentProject === "manual" && (!entry.goal1 || !entry.goal2)) {
      toast({
        title: "Validation Error",
        description: "Please fill in both goals for manual project description",
        variant: "destructive",
      });
      return;
    }

    createEntryMutation.mutate(entry);
    
    const updatedEntries = newEntries.filter((_, i) => i !== index);
    setNewEntries(updatedEntries);
  };

  const handleDeleteNewEntry = (index: number) => {
    const updatedEntries = newEntries.filter((_, i) => i !== index);
    setNewEntries(updatedEntries);
  };

  const handleCopyEntry = (entry: GoalEntry | FormEntry) => {
    const projectLabel = entry.currentProject === "manual" 
      ? "Describe Manually" 
      : (PROJECT_STATUS_OPTIONS.find(opt => opt.value === entry.currentProject)?.label || entry.currentProject);
    const formattedString = `${entry.date}, ${entry.senseiName}, ${entry.ninjaName}, ${projectLabel}, ${entry.description}, Goal 1: ${entry.goal1}, Goal 2: ${entry.goal2}`;
    
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

  const handleEditEntry = (entry: GoalEntry) => {
    setEditingEntryId(entry.id);
    setEditedEntry(entry);
  };

  const handleCancelEdit = () => {
    setEditingEntryId(null);
    setEditedEntry({});
  };

  const handleUpdateEntry = () => {
    if (editedEntry.id) {
      updateEntryMutation.mutate(editedEntry as GoalEntry);
    }
  };

  const handleFieldCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
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

  const filterNinjaNames = (searchTerm: string) => {
    const uniqueNames = getUniqueNinjaNames();
    if (!searchTerm) return uniqueNames;
    return uniqueNames.filter(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterProjectOptions = (searchTerm: string) => {
    if (!searchTerm) return PROJECT_STATUS_OPTIONS;
    const filtered = PROJECT_STATUS_OPTIONS.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length === 0) {
      return [{ value: "manual", label: "Describe Manually" }];
    }
    return filtered;
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
    <div className="space-y-6">
      {/* Sensei Name Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sensei Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter sensei name"
              value={savedSenseiName}
              onChange={(e) => setSavedSenseiName(e.target.value)}
              className="flex-1"
              data-testid="input-sensei-name"
            />
            <Button onClick={handleSenseiNameSave} data-testid="button-save-sensei">
              Save Sensei Name
            </Button>
          </div>
          {savedSenseiName && (
            <p className="text-sm text-muted-foreground mt-2">
              Current sensei: <strong>{savedSenseiName}</strong>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Goal Entries Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Goal Entries</CardTitle>
            <Button ref={addEntryButtonRef} onClick={handleAddRow} data-testid="button-add-entry">
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
            <div className="relative">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Ninja Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Current Project</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Goal 1</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Goal 2</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky right-0 bg-muted shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.15)] w-36">Actions</th>
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
                        <Popover
                          open={showNinjaDropdown[index]}
                          onOpenChange={(isOpen) => {
                            setShowNinjaDropdown({ ...showNinjaDropdown, [index]: isOpen });
                            if (!isOpen) setNinjaNameSearch({ ...ninjaNameSearch, [index]: '' });
                          }}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              ref={(el) => (ninjaNameRefs.current[index] = el)}
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between font-normal truncate"
                              onFocus={() => setShowNinjaDropdown({ ...showNinjaDropdown, [index]: true })}
                            >
                              {entry.ninjaName || "Select Ninja..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                            <Input
                              placeholder="Search or add ninja..."
                              value={ninjaNameSearch[index] || ''}
                              onChange={(e) => setNinjaNameSearch({ ...ninjaNameSearch, [index]: e.target.value })}
                              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const filtered = filterNinjaNames(ninjaNameSearch[index] || '');
                                  const selectedName = filtered.length > 0 ? filtered[0] : (ninjaNameSearch[index] || '');
                                  if (selectedName) {
                                    handleInputChange(index, 'ninjaName', selectedName);
                                  }
                                  setShowNinjaDropdown({ ...showNinjaDropdown, [index]: false });
                                  projectRefs.current[index]?.focus();
                                }
                              }}
                            />
                            <div className="max-h-40 overflow-y-auto mt-2">
                              {filterNinjaNames(ninjaNameSearch[index] || '').map((name) => (
                                <div
                                  key={name}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                  onMouseDown={() => {
                                    handleInputChange(index, 'ninjaName', name);
                                    setShowNinjaDropdown({ ...showNinjaDropdown, [index]: false });
                                    projectRefs.current[index]?.focus();
                                  }}
                                >
                                  {name}
                                </div>
                              ))}
                              {ninjaNameSearch[index] && !getUniqueNinjaNames().includes(ninjaNameSearch[index]) && (
                                <div
                                  className="px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer"
                                  onMouseDown={() => {
                                    handleInputChange(index, 'ninjaName', ninjaNameSearch[index]);
                                    setShowNinjaDropdown({ ...showNinjaDropdown, [index]: false });
                                    projectRefs.current[index]?.focus();
                                  }}
                                >
                                  Add "{ninjaNameSearch[index]}" as new ninja
                                </div>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <Popover
                          open={showProjectDropdown[index]}
                          onOpenChange={(isOpen) => {
                            setShowProjectDropdown({ ...showProjectDropdown, [index]: isOpen });
                            if (!isOpen) setProjectSearch({ ...projectSearch, [index]: '' });
                          }}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              ref={(el) => (projectRefs.current[index] = el)}
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between font-normal truncate"
                              onFocus={() => setShowProjectDropdown({ ...showProjectDropdown, [index]: true })}
                            >
                              {PROJECT_STATUS_OPTIONS.find(opt => opt.value === entry.currentProject)?.label || "Select Project..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                             <Input
                              placeholder="Search projects..."
                              value={projectSearch[index] || ''}
                              onChange={(e) => setProjectSearch({ ...projectSearch, [index]: e.target.value })}
                              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const searchTerm = projectSearch[index] || '';
                                  const filtered = PROJECT_STATUS_OPTIONS.filter(option =>
                                    option.label.toLowerCase().includes(searchTerm.toLowerCase())
                                  );

                                  if (filtered.length > 0) {
                                    handleProjectChange(index, filtered[0].value);
                                  } else {
                                    handleProjectChange(index, 'manual');
                                  }

                                  setShowProjectDropdown({ ...showProjectDropdown, [index]: false });
                                  descriptionRefs.current[index]?.focus();
                                }
                              }}
                            />
                            <div className="max-h-40 overflow-y-auto mt-2">
                              {filterProjectOptions(projectSearch[index] || '').map((option) => (
                                <div
                                  key={option.value}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                  onMouseDown={() => {
                                    handleProjectChange(index, option.value);
                                    setShowProjectDropdown({ ...showProjectDropdown, [index]: false });
                                    descriptionRefs.current[index]?.focus();
                                  }}
                                >
                                  {option.label}
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <Input
                          ref={(el) => (descriptionRefs.current[index] = el)}
                          id={`description-input-${index}`}
                          type="text"
                          placeholder="Enter description"
                          value={entry.description}
                          onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              saveButtonRefs.current[index]?.focus();
                            }
                          }}
                          data-testid={`input-description-${index}`}
                        />
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <Input
                          type="text"
                          placeholder={entry.currentProject === "manual" ? "Enter Goal 1 manually" : "Goal 1 (auto-filled)"}
                          value={entry.goal1}
                          onChange={entry.currentProject === "manual" ? (e) => handleInputChange(index, 'goal1', e.target.value) : undefined}
                          readOnly={entry.currentProject !== "manual"}
                          className={entry.currentProject ? "w-96" : (entry.currentProject === "manual" ? "" : "bg-muted text-muted-foreground")}
                          data-testid={`input-goal1-${index}`}
                        />
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <Input
                          type="text"
                          placeholder={entry.currentProject === "manual" ? "Enter Goal 2 manually" : "Goal 2 (auto-filled)"}
                          value={entry.goal2}
                          onChange={entry.currentProject === "manual" ? (e) => handleInputChange(index, 'goal2', e.target.value) : undefined}
                          readOnly={entry.currentProject !== "manual"}
                          className={entry.currentProject ? "w-96" : (entry.currentProject === "manual" ? "" : "bg-muted text-muted-foreground")}
                          data-testid={`input-goal2-${index}`}
                        />
                      </td>
                      <td className="px-4 py-4 sticky right-0 bg-accent shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.15)] w-36">
                        <div className="flex items-center space-x-2">
                          <Button
                            ref={(el) => (saveButtonRefs.current[index] = el)}
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
                    editingEntryId === entry.id ? (
                      // Editing row
                      <tr key={`editing-${entry.id}`} className="hover:bg-muted/25 transition-colors bg-accent/50">
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="date"
                            value={editedEntry.date || entry.date}
                            onChange={(e) => setEditedEntry({ ...editedEntry, date: e.target.value })}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={editedEntry.ninjaName || entry.ninjaName}
                            onChange={(e) => setEditedEntry({ ...editedEntry, ninjaName: e.target.value })}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={editedEntry.currentProject || entry.currentProject}
                            onChange={(e) => setEditedEntry({ ...editedEntry, currentProject: e.target.value })}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={editedEntry.description || entry.description}
                            onChange={(e) => setEditedEntry({ ...editedEntry, description: e.target.value })}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={editedEntry.goal1 || entry.goal1}
                            onChange={(e) => setEditedEntry({ ...editedEntry, goal1: e.target.value })}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={editedEntry.goal2 || entry.goal2}
                            onChange={(e) => setEditedEntry({ ...editedEntry, goal2: e.target.value })}
                          />
                        </td>
                        <td className="px-4 py-4 sticky right-0 bg-accent shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.15)] w-36">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" onClick={handleUpdateEntry} disabled={updateEntryMutation.isPending}>Save</Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      // Display row
                      <tr key={entry.id} className="hover:bg-muted/25 transition-colors">
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="date"
                            value={entry.date}
                            readOnly
                            className="bg-muted text-muted-foreground cursor-pointer"
                            data-testid={`text-date-${entry.id}`}
                            onClick={() => handleFieldCopy(entry.date)}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={entry.ninjaName}
                            readOnly
                            className="bg-muted text-muted-foreground cursor-pointer"
                            data-testid={`text-ninja-${entry.id}`}
                            onClick={() => handleFieldCopy(entry.ninjaName)}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={entry.currentProject === "manual" 
                              ? "Describe Manually" 
                              : (PROJECT_STATUS_OPTIONS.find(opt => opt.value === entry.currentProject)?.label || entry.currentProject)}
                            readOnly
                            className="bg-muted text-muted-foreground cursor-pointer"
                            data-testid={`text-project-${entry.id}`}
                            onClick={() => handleFieldCopy(entry.currentProject === "manual" ? "Describe Manually" : (PROJECT_STATUS_OPTIONS.find(opt => opt.value === entry.currentProject)?.label || entry.currentProject))}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={entry.description}
                            readOnly
                            className="bg-muted text-muted-foreground cursor-pointer"
                            data-testid={`text-description-${entry.id}`}
                            onClick={() => handleFieldCopy(entry.description)}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={entry.goal1}
                            readOnly
                            className="bg-muted text-muted-foreground cursor-pointer"
                            data-testid={`text-goal1-${entry.id}`}
                            onClick={() => handleFieldCopy(entry.goal1)}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            type="text"
                            value={entry.goal2}
                            readOnly
                            className="bg-muted text-muted-foreground cursor-pointer"
                            data-testid={`text-goal2-${entry.id}`}
                            onClick={() => handleFieldCopy(entry.goal2)}
                          />
                        </td>
                        <td className="px-4 py-4 sticky right-0 bg-card hover:bg-muted/25 shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.15)] w-36">
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
                              onClick={() => handleEditEntry(entry)}
                              title="Edit entry"
                              data-testid={`button-edit-${entry.id}`}
                            >
                              <Pencil className="w-4 h-4" />
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
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

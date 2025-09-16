import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient"; // apiRequest removed
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Plus, Copy, Trash2, Table, ChevronsUpDown, Pencil, Minus } from "lucide-react";
import { PROJECT_STATUS_MAPPING, PROJECT_STATUS_OPTIONS, type GoalEntry, type InsertGoalEntry } from "@shared/schema";
import { goalStorageUtility } from "@/lib/localStorage"; // Renamed to avoid conflict with global localStorage
import { useDebouncedCallback } from "use-debounce";

interface DataEntryTableProps {
  entries: GoalEntry[];
  isLoading: boolean;
  isSenseiNameExpired: boolean;
  savedSenseiName: string;
  onSenseiNameChange: (name: string) => void;
}

interface FormEntry {
  date: string;
  senseiName: string;
  ninjaName: string;
  currentProject: string;
  description: string;
  goal1: string;
  goal2: string;
  cnwKoin: number;
}

export function DataEntryTable({ entries, isLoading, isSenseiNameExpired, savedSenseiName, onSenseiNameChange }: DataEntryTableProps) {
  const { toast } = useToast();
  const [newEntries, setNewEntries] = useState<FormEntry[]>([]);
  const [senseiNameInput, setSenseiNameInput] = useState(savedSenseiName);

  useEffect(() => {
    setSenseiNameInput(savedSenseiName);
  }, [savedSenseiName]);
  const [ninjaNameSearch, setNinjaNameSearch] = useState<{[key: number]: string}>({});
  const [projectSearch, setProjectSearch] = useState<{[key: number]: string}>({});
  const [showNinjaDropdown, setShowNinjaDropdown] = useState<{[key: number]: boolean}>({});
  const [showProjectDropdown, setShowProjectDropdown] = useState<{[key: number]: boolean}>({});
  const [focusNewRow, setFocusNewRow] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editedEntry, setEditedEntry] = useState<Partial<GoalEntry>>({});

  // State and refs for new entries
  const ninjaNameRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const projectRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLInputElement | null)[]>([]);
  const goal1Refs = useRef<(HTMLInputElement | null)[]>([]);
  const goal2Refs = useRef<(HTMLInputElement | null)[]>([]);
  const saveButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const addEntryButtonRef = useRef<HTMLButtonElement | null>(null);

  // State for dropdown navigation for new entries
  const [ninjaHighlightedIndex, setNinjaHighlightedIndex] = useState<{[key: number]: number | null}>({});
  const [projectHighlightedIndex, setProjectHighlightedIndex] = useState<{[key: number]: number | null}>({});

  // Refs for dropdown options and containers for new entries
  const ninjaDropdownRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const ninjaOptionRefs = useRef<{[key: number]: (HTMLDivElement | null)[]}>({});
  const projectDropdownRefs = useRef<{[key: number]: HTMLDivElement | null}>({});
  const projectOptionRefs = useRef<{[key: number]: (HTMLDivElement | null)[]}>({});

  // State and refs for editing existing entries
  const [editingNinjaNameSearch, setEditingNinjaNameSearch] = useState<string>('');
  const [editingProjectSearch, setEditingProjectSearch] = useState<string>('');
  const [showEditingNinjaDropdown, setShowEditingNinjaDropdown] = useState<boolean>(false);
  const [showEditingProjectDropdown, setShowEditingProjectDropdown] = useState<boolean>(false);
  const [editingNinjaHighlightedIndex, setEditingNinjaHighlightedIndex] = useState<number | null>(null);
  const [editingProjectHighlightedIndex, setEditingProjectHighlightedIndex] = useState<number | null>(null);

  const editingNinjaNameRef = useRef<HTMLButtonElement | null>(null);
  const editingProjectRef = useRef<HTMLButtonElement | null>(null);
  const editingDescriptionRef = useRef<HTMLInputElement | null>(null);
  const editingGoal1Ref = useRef<HTMLInputElement | null>(null);
  const editingGoal2Ref = useRef<HTMLInputElement | null>(null);
  const editingSaveButtonRef = useRef<HTMLButtonElement | null>(null);

  const editingNinjaDropdownRef = useRef<HTMLDivElement | null>(null);
  const editingNinjaOptionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const editingProjectDropdownRef = useRef<HTMLDivElement | null>(null);
  const editingProjectOptionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getTodaysDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getUniqueNinjaNames = (): string[] => {
    const ninjaNames = entries.map(entry => entry.ninjaName);
    return Array.from(new Set(ninjaNames)).filter(Boolean); // Filter out empty strings
  };

  // Removed the general keyboard navigation useEffect as per new requirements

  const handleSenseiNameSave = () => {
    onSenseiNameChange(senseiNameInput);
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['goalEntries'] });
      if (Object.keys(variables).length > 2) { // More than just id and cnwKoin
        toast({
          title: "Success",
          description: "Goal entry updated successfully",
        });
        setEditingEntryId(null);
      }
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
      cnwKoin: 0,
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

  const handleEditInputChange = (field: keyof GoalEntry, value: string) => {
    setEditedEntry((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditProjectChange = (projectStatus: string) => {
    if (projectStatus === "manual") {
      setEditedEntry((prev) => ({
        ...prev,
        currentProject: projectStatus,
        goal1: '',
        goal2: '',
      }));
    } else {
      setEditedEntry((prev) => ({
        ...prev,
        currentProject: projectStatus,
        goal1: PROJECT_STATUS_MAPPING[projectStatus as keyof typeof PROJECT_STATUS_MAPPING]?.goal1 || '',
        goal2: PROJECT_STATUS_MAPPING[projectStatus as keyof typeof PROJECT_STATUS_MAPPING]?.goal2 || '',
      }));
    }
  };

  const handleSaveEntry = (index: number) => {
    const entry = newEntries[index];
    if (!entry.ninjaName) {
      toast({
        title: "Validation Error",
        description: "Please fill in ninja name.",
        variant: "destructive",
      });
      return;
    }
    if (!entry.currentProject) {
      toast({
        title: "Validation Error",
        description: "Please select a current project.",
        variant: "destructive",
      });
      return;
    }
    if (!entry.description) {
      toast({
        title: "--> Missing Description -->",
        description: "Scroll Right to fill Description. It can be smaller goals, subtasks, project details, topics we're learning at the Dojo, or any other relevant info to journal for the parents.",
        variant: "destructive",
      })
      return;
    }

    if (!entry.ninjaName || !entry.currentProject || !entry.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in ninja name, current project, and description.",
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
    const formattedString = `${entry.date}, ${entry.senseiName}, ${entry.ninjaName}, ${projectLabel}, ${entry.description}, Goal 1: ${entry.goal1}, Goal 2: ${entry.goal2}, Today's CNWKoin: ${entry.cnwKoin}`;
    
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
    setEditingNinjaNameSearch(''); // Reset search term
    setEditingProjectSearch(''); // Reset search term
    setShowEditingNinjaDropdown(false); // Close dropdown
    setShowEditingProjectDropdown(false); // Close dropdown
    setEditingNinjaHighlightedIndex(null); // Reset highlight
    setEditingProjectHighlightedIndex(null); // Reset highlight
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

  const handleUpdateKoin = (id: string, currentKoin: number, change: number) => {
    const newKoin = currentKoin + change;
    updateEntryMutation.mutate({ id, cnwKoin: newKoin } as GoalEntry);
  };

  const debouncedUpdateKoin = useDebouncedCallback(handleUpdateKoin, 300);

  const handleKoinButtonClick = (id: string, currentKoin: number, change: number) => {
    const newKoin = currentKoin + change;
    // Optimistically update the UI
    queryClient.setQueryData(['goalEntries'], (oldData: GoalEntry[] | undefined) => {
      if (!oldData) return [];
      return oldData.map(entry => 
        entry.id === id ? { ...entry, cnwKoin: newKoin } : entry
      );
    });
    debouncedUpdateKoin(id, currentKoin, change);
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
              value={senseiNameInput}
              onChange={(e) => setSenseiNameInput(e.target.value)}
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
            <Button ref={addEntryButtonRef} onClick={handleAddRow} data-testid="button-add-entry" disabled={isSenseiNameExpired || !savedSenseiName}>
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
              <Button onClick={handleAddRow} data-testid="button-add-first-entry" disabled={isSenseiNameExpired || !savedSenseiName}>
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
                              
                              tabIndex={0}
                            >
                              {entry.ninjaName || "Select Ninja..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                            <Input
                              placeholder="Search or add ninja..."
                              value={ninjaNameSearch[index] || ''}
                              onChange={(e) => {
                                setNinjaNameSearch({ ...ninjaNameSearch, [index]: e.target.value });
                                setNinjaHighlightedIndex({ ...ninjaHighlightedIndex, [index]: null }); // Reset highlight on search change
                              }}
                              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                                const filteredNames = filterNinjaNames(ninjaNameSearch[index] || '');
                                const currentHighlight = ninjaHighlightedIndex[index];

                                if (e.key === 'ArrowDown') {
                                  e.preventDefault();
                                  const nextIndex = currentHighlight === null || currentHighlight === filteredNames.length - 1
                                    ? 0
                                    : currentHighlight + 1;
                                  setNinjaHighlightedIndex({ ...ninjaHighlightedIndex, [index]: nextIndex });
                                  ninjaOptionRefs.current[index]?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                                } else if (e.key === 'ArrowUp') {
                                  e.preventDefault();
                                  const prevIndex = currentHighlight === null || currentHighlight === 0
                                    ? filteredNames.length - 1
                                    : currentHighlight - 1;
                                  setNinjaHighlightedIndex({ ...ninjaHighlightedIndex, [index]: prevIndex });
                                  ninjaOptionRefs.current[index]?.[prevIndex]?.scrollIntoView({ block: 'nearest' });
                                } else if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (currentHighlight !== null && filteredNames[currentHighlight]) {
                                    handleInputChange(index, 'ninjaName', filteredNames[currentHighlight]);
                                    setShowNinjaDropdown({ ...showNinjaDropdown, [index]: false });
                                    projectRefs.current[index]?.focus();
                                  } else if (ninjaNameSearch[index]) {
                                    // If no highlight but search term exists, add as new ninja
                                    handleInputChange(index, 'ninjaName', ninjaNameSearch[index]);
                                    setShowNinjaDropdown({ ...showNinjaDropdown, [index]: false });
                                    projectRefs.current[index]?.focus();
                                  }
                                } else if (e.key === 'Escape') {
                                  e.preventDefault();
                                  setShowNinjaDropdown({ ...showNinjaDropdown, [index]: false });
                                  ninjaNameRefs.current[index]?.focus(); // Focus back on the trigger button
                                }
                              }}
                            />
                            <div
                              ref={(el) => (ninjaDropdownRefs.current[index] = el)}
                              className="max-h-40 overflow-y-auto mt-2"
                            >
                              {filterNinjaNames(ninjaNameSearch[index] || '').map((name, optionIndex) => (
                                <div
                                  key={name}
                                  ref={(el) => {
                                    if (!ninjaOptionRefs.current[index]) ninjaOptionRefs.current[index] = [];
                                    ninjaOptionRefs.current[index][optionIndex] = el;
                                  }}
                                  className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${ninjaHighlightedIndex[index] === optionIndex ? 'bg-gray-100' : ''}`}
                                  onMouseDown={() => {
                                    handleInputChange(index, 'ninjaName', name);
                                    setShowNinjaDropdown({ ...showNinjaDropdown, [index]: false });
                                    projectRefs.current[index]?.focus();
                                  }}
                                  onMouseEnter={() => setNinjaHighlightedIndex({ ...ninjaHighlightedIndex, [index]: optionIndex })}
                                >
                                  {name}
                                </div>
                              ))}
                              {ninjaNameSearch[index] && !getUniqueNinjaNames().includes(ninjaNameSearch[index]) && (
                                <div
                                  ref={(el) => {
                                    if (!ninjaOptionRefs.current[index]) ninjaOptionRefs.current[index] = [];
                                    ninjaOptionRefs.current[index][filterNinjaNames(ninjaNameSearch[index] || '').length] = el; // Add to the end of options
                                  }}
                                  className={`px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer ${ninjaHighlightedIndex[index] === filterNinjaNames(ninjaNameSearch[index] || '').length ? 'bg-blue-100' : ''}`}
                                  onMouseDown={() => {
                                    handleInputChange(index, 'ninjaName', ninjaNameSearch[index]);
                                    setShowNinjaDropdown({ ...showNinjaDropdown, [index]: false });
                                    projectRefs.current[index]?.focus();
                                  }}
                                  onMouseEnter={() => setNinjaHighlightedIndex({ ...ninjaHighlightedIndex, [index]: filterNinjaNames(ninjaNameSearch[index] || '').length })}
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
                              tabIndex={0}
                            >
                              {PROJECT_STATUS_OPTIONS.find(opt => opt.value === entry.currentProject)?.label || "Select Project..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                             <Input
                              placeholder="Search projects..."
                              value={projectSearch[index] || ''}
                              onChange={(e) => {
                                setProjectSearch({ ...projectSearch, [index]: e.target.value });
                                setProjectHighlightedIndex({ ...projectHighlightedIndex, [index]: null }); // Reset highlight on search change
                              }}
                              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                                const filteredOptions = filterProjectOptions(projectSearch[index] || '');
                                const currentHighlight = projectHighlightedIndex[index];

                                if (e.key === 'ArrowDown') {
                                  e.preventDefault();
                                  const nextIndex = currentHighlight === null || currentHighlight === filteredOptions.length - 1
                                    ? 0
                                    : currentHighlight + 1;
                                  setProjectHighlightedIndex({ ...projectHighlightedIndex, [index]: nextIndex });
                                  projectOptionRefs.current[index]?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                                } else if (e.key === 'ArrowUp') {
                                  e.preventDefault();
                                  const prevIndex = currentHighlight === null || currentHighlight === 0
                                    ? filteredOptions.length - 1
                                    : currentHighlight - 1;
                                  setProjectHighlightedIndex({ ...projectHighlightedIndex, [index]: prevIndex });
                                  projectOptionRefs.current[index]?.[prevIndex]?.scrollIntoView({ block: 'nearest' });
                                } else if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (currentHighlight !== null && filteredOptions[currentHighlight]) {
                                    handleProjectChange(index, filteredOptions[currentHighlight].value);
                                    setShowProjectDropdown({ ...showProjectDropdown, [index]: false });
                                    descriptionRefs.current[index]?.focus();
                                  } else if (projectSearch[index]) {
                                    // If no highlight but search term exists, handle as manual project
                                    handleProjectChange(index, 'manual');
                                    setShowProjectDropdown({ ...showProjectDropdown, [index]: false });
                                    descriptionRefs.current[index]?.focus();
                                  }
                                } else if (e.key === 'Escape') {
                                  e.preventDefault();
                                  setShowProjectDropdown({ ...showProjectDropdown, [index]: false });
                                  projectRefs.current[index]?.focus(); // Focus back on the trigger button
                                }
                              }}
                            />
                            <div
                              ref={(el) => (projectDropdownRefs.current[index] = el)}
                              className="max-h-40 overflow-y-auto mt-2"
                            >
                              {filterProjectOptions(projectSearch[index] || '').map((option, optionIndex) => (
                                <div
                                  key={option.value}
                                  ref={(el) => {
                                    if (!projectOptionRefs.current[index]) projectOptionRefs.current[index] = [];
                                    projectOptionRefs.current[index][optionIndex] = el;
                                  }}
                                  className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${projectHighlightedIndex[index] === optionIndex ? 'bg-gray-100' : ''}`}
                                  onMouseDown={() => {
                                    handleProjectChange(index, option.value);
                                    setShowProjectDropdown({ ...showProjectDropdown, [index]: false });
                                    descriptionRefs.current[index]?.focus();
                                  }}
                                  onMouseEnter={() => setProjectHighlightedIndex({ ...projectHighlightedIndex, [index]: optionIndex })}
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
                          tabIndex={0}
                        />
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <Input
                          ref={(el) => (goal1Refs.current[index] = el)}
                          type="text"
                          placeholder={entry.currentProject === "manual" ? "Enter Goal 1 manually" : "Goal 1 (auto-filled)"}
                          value={entry.goal1}
                          onChange={entry.currentProject === "manual" ? (e) => handleInputChange(index, 'goal1', e.target.value) : undefined}
                          readOnly={entry.currentProject !== "manual"}
                          className={entry.currentProject ? "w-96" : (entry.currentProject === "manual" ? "" : "bg-muted text-muted-foreground")}
                          data-testid={`input-goal1-${index}`}
                          tabIndex={0}
                        />
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <Input
                          ref={(el) => (goal2Refs.current[index] = el)}
                          type="text"
                          placeholder={entry.currentProject === "manual" ? "Enter Goal 2 manually" : "Goal 2 (auto-filled)"}
                          value={entry.goal2}
                          onChange={entry.currentProject === "manual" ? (e) => handleInputChange(index, 'goal2', e.target.value) : undefined}
                          readOnly={entry.currentProject !== "manual"}
                          className={entry.currentProject ? "w-96" : (entry.currentProject === "manual" ? "" : "bg-muted text-muted-foreground")}
                          data-testid={`input-goal2-${index}`}
                          tabIndex={0}
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
                            tabIndex={0}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNewEntry(index)}
                            data-testid={`button-cancel-${index}`}
                            tabIndex={0}
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
                            onChange={(e) => handleEditInputChange('date', e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Popover
                            open={showEditingNinjaDropdown}
                            onOpenChange={(isOpen) => {
                              setShowEditingNinjaDropdown(isOpen);
                              if (!isOpen) setEditingNinjaNameSearch('');
                            }}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                ref={editingNinjaNameRef}
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between font-normal truncate"
                                
                                tabIndex={0}
                              >
                                {(editedEntry.ninjaName || entry.ninjaName) || "Select Ninja..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                              <Input
                                placeholder="Search or add ninja..."
                                value={editingNinjaNameSearch}
                                onChange={(e) => {
                                  setEditingNinjaNameSearch(e.target.value);
                                  setEditingNinjaHighlightedIndex(null); // Reset highlight on search change
                                }}
                                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                                  const filteredNames = filterNinjaNames(editingNinjaNameSearch);
                                  const currentHighlight = editingNinjaHighlightedIndex;

                                  if (e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    const nextIndex = currentHighlight === null || currentHighlight === filteredNames.length - 1
                                      ? 0
                                      : currentHighlight + 1;
                                    setEditingNinjaHighlightedIndex(nextIndex);
                                    editingNinjaOptionRefs.current?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                                  } else if (e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    const prevIndex = currentHighlight === null || currentHighlight === 0
                                      ? filteredNames.length - 1
                                      : currentHighlight - 1;
                                    setEditingNinjaHighlightedIndex(prevIndex);
                                    editingNinjaOptionRefs.current?.[prevIndex]?.scrollIntoView({ block: 'nearest' });
                                  } else if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (currentHighlight !== null && filteredNames[currentHighlight]) {
                                      handleEditInputChange('ninjaName', filteredNames[currentHighlight]);
                                      setShowEditingNinjaDropdown(false);
                                      editingProjectRef.current?.focus();
                                    } else if (editingNinjaNameSearch) {
                                      // If no highlight but search term exists, add as new ninja
                                      handleEditInputChange('ninjaName', editingNinjaNameSearch);
                                      setShowEditingNinjaDropdown(false);
                                      editingProjectRef.current?.focus();
                                    }
                                  } else if (e.key === 'Escape') {
                                    e.preventDefault();
                                    setShowEditingNinjaDropdown(false);
                                    editingNinjaNameRef.current?.focus(); // Focus back on the trigger button
                                  }
                                }}
                              />
                              <div
                                ref={editingNinjaDropdownRef}
                                className="max-h-40 overflow-y-auto mt-2"
                              >
                                {filterNinjaNames(editingNinjaNameSearch).map((name, optionIndex) => (
                                  <div
                                    key={name}
                                    ref={(el) => {
                                      editingNinjaOptionRefs.current[optionIndex] = el;
                                    }}
                                    className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${editingNinjaHighlightedIndex === optionIndex ? 'bg-gray-100' : ''}`}
                                    onMouseDown={() => {
                                      handleEditInputChange('ninjaName', name);
                                      setShowEditingNinjaDropdown(false);
                                      editingProjectRef.current?.focus();
                                    }}
                                    onMouseEnter={() => setEditingNinjaHighlightedIndex(optionIndex)}
                                  >
                                    {name}
                                  </div>
                                ))}
                                {editingNinjaNameSearch && !getUniqueNinjaNames().includes(editingNinjaNameSearch) && (
                                  <div
                                    ref={(el) => {
                                      editingNinjaOptionRefs.current[filterNinjaNames(editingNinjaNameSearch).length] = el; // Add to the end of options
                                    }}
                                    className={`px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer ${editingNinjaHighlightedIndex === filterNinjaNames(editingNinjaNameSearch).length ? 'bg-blue-100' : ''}`}
                                    onMouseDown={() => {
                                      handleEditInputChange('ninjaName', editingNinjaNameSearch);
                                      setShowEditingNinjaDropdown(false);
                                      editingProjectRef.current?.focus();
                                    }}
                                    onMouseEnter={() => setEditingNinjaHighlightedIndex(filterNinjaNames(editingNinjaNameSearch).length)}
                                  >
                                    Add "{editingNinjaNameSearch}" as new ninja
                                  </div>
                                )}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Popover
                            open={showEditingProjectDropdown}
                            onOpenChange={(isOpen) => {
                              setShowEditingProjectDropdown(isOpen);
                              if (!isOpen) setEditingProjectSearch('');
                            }}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                ref={editingProjectRef}
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between font-normal truncate"
                                tabIndex={0}
                              >
                                {PROJECT_STATUS_OPTIONS.find(opt => opt.value === (editedEntry.currentProject || entry.currentProject))?.label || "Select Project..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                              <Input
                                placeholder="Search projects..."
                                value={editingProjectSearch}
                                onChange={(e) => {
                                  setEditingProjectSearch(e.target.value);
                                  setEditingProjectHighlightedIndex(null); // Reset highlight on search change
                                }}
                                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                                  const filteredOptions = filterProjectOptions(editingProjectSearch);
                                  const currentHighlight = editingProjectHighlightedIndex;

                                  if (e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    const nextIndex = currentHighlight === null || currentHighlight === filteredOptions.length - 1
                                      ? 0
                                      : currentHighlight + 1;
                                    setEditingProjectHighlightedIndex(nextIndex);
                                    editingProjectOptionRefs.current?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                                  } else if (e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    const prevIndex = currentHighlight === null || currentHighlight === 0
                                      ? filteredOptions.length - 1
                                      : currentHighlight - 1;
                                    setEditingProjectHighlightedIndex(prevIndex);
                                    editingProjectOptionRefs.current?.[prevIndex]?.scrollIntoView({ block: 'nearest' });
                                  } else if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (currentHighlight !== null && filteredOptions[currentHighlight]) {
                                      handleEditProjectChange(filteredOptions[currentHighlight].value);
                                      setShowEditingProjectDropdown(false);
                                      editingDescriptionRef.current?.focus();
                                    } else if (editingProjectSearch) {
                                      // If no highlight but search term exists, handle as manual project
                                      handleEditProjectChange('manual');
                                      setShowEditingProjectDropdown(false);
                                      editingDescriptionRef.current?.focus();
                                    }
                                  } else if (e.key === 'Escape') {
                                    e.preventDefault();
                                    setShowEditingProjectDropdown(false);
                                    editingProjectRef.current?.focus(); // Focus back on the trigger button
                                  }
                                }}
                              />
                              <div
                                ref={editingProjectDropdownRef}
                                className="max-h-40 overflow-y-auto mt-2"
                              >
                                {filterProjectOptions(editingProjectSearch).map((option, optionIndex) => (
                                  <div
                                    key={option.value}
                                    ref={(el) => {
                                      editingProjectOptionRefs.current[optionIndex] = el;
                                    }}
                                    className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${editingProjectHighlightedIndex === optionIndex ? 'bg-gray-100' : ''}`}
                                    onMouseDown={() => {
                                      handleEditProjectChange(option.value);
                                      setShowEditingProjectDropdown(false);
                                      editingDescriptionRef.current?.focus();
                                    }}
                                    onMouseEnter={() => setEditingProjectHighlightedIndex(optionIndex)}
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
                            ref={editingDescriptionRef}
                            type="text"
                            value={editedEntry.description || entry.description}
                            onChange={(e) => handleEditInputChange('description', e.target.value)}
                            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                editingSaveButtonRef.current?.focus();
                              }
                            }}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            ref={editingGoal1Ref}
                            type="text"
                            placeholder={(editedEntry.currentProject || entry.currentProject) === "manual" ? "Enter Goal 1 manually" : "Goal 1 (auto-filled)"}
                            value={editedEntry.goal1 || entry.goal1}
                            onChange={(editedEntry.currentProject || entry.currentProject) === "manual" ? (e) => handleEditInputChange('goal1', e.target.value) : undefined}
                            readOnly={(editedEntry.currentProject || entry.currentProject) !== "manual"}
                            className={(editedEntry.currentProject || entry.currentProject) ? "w-96" : ((editedEntry.currentProject || entry.currentProject) === "manual" ? "" : "bg-muted text-muted-foreground")}
                          />
                        </td>
                        <td className="px-4 py-4 border-r border-border">
                          <Input
                            ref={editingGoal2Ref}
                            type="text"
                            placeholder={(editedEntry.currentProject || entry.currentProject) === "manual" ? "Enter Goal 2 manually" : "Goal 2 (auto-filled)"}
                            value={editedEntry.goal2 || entry.goal2}
                            onChange={(editedEntry.currentProject || entry.currentProject) === "manual" ? (e) => handleEditInputChange('goal2', e.target.value) : undefined}
                            readOnly={(editedEntry.currentProject || entry.currentProject) !== "manual"}
                            className={(editedEntry.currentProject || entry.currentProject) ? "w-96" : ((editedEntry.currentProject || entry.currentProject) === "manual" ? "" : "bg-muted text-muted-foreground")}
                          />
                        </td>
                        <td className="px-4 py-4 sticky right-0 bg-accent shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.15)] w-36">
                          <div className="flex items-center space-x-2">
                            <Button ref={editingSaveButtonRef} size="sm" onClick={handleUpdateEntry} disabled={updateEntryMutation.isPending}>Save</Button>
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
                        <td className="px-4 py-4 sticky right-0 bg-card hover:bg-muted/25 shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.15)] w-auto">
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
                            <div className="flex items-center space-x-1">
                              <Button size="sm" variant="outline" onClick={() => handleKoinButtonClick(entry.id, entry.cnwKoin, -1)}><Minus className="w-4 h-4" /></Button>
                              <span className="text-sm font-medium w-12 text-center">{entry.cnwKoin}</span>
                              <Button size="sm" variant="outline" onClick={() => handleKoinButtonClick(entry.id, entry.cnwKoin, 1)}><Plus className="w-4 h-4" /></Button>
                            </div>
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

  
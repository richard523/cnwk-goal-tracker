import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Copy, Trash2, Table, Search } from "lucide-react";
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
      senseiName: savedSenseiName,
      ninjaName: '',
      currentProject: '',
      description: '',
      goal1: '',
      goal2: '',
    };
    setNewEntries([...newEntries, newEntry]);
  };

  const handleProjectChange = (index: number, projectStatus: string) => {
    const updatedEntries = [...newEntries];
    
    if (projectStatus === "manual") {
      // For manual description, leave goals blank
      updatedEntries[index] = {
        ...updatedEntries[index],
        currentProject: projectStatus,
        goal1: '',
        goal2: '',
      };
    } else {
      // For predefined project statuses, auto-fill goals
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

    // For manual entries, also check that goals are filled
    if (entry.currentProject === "manual" && (!entry.goal1 || !entry.goal2)) {
      toast({
        title: "Validation Error",
        description: "Please fill in both goals for manual project description",
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

  // Filter ninja names based on search
  const filterNinjaNames = (searchTerm: string) => {
    const uniqueNames = getUniqueNinjaNames();
    return uniqueNames.filter(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filter project options based on search
  const filterProjectOptions = (searchTerm: string) => {
    const filtered = PROJECT_STATUS_OPTIONS.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // If no matches found and there's a search term, add "Describe Manually" option
    if (filtered.length === 0 && searchTerm.trim()) {
      return [{ value: "manual", label: "Describe Manually" }];
    }
    
    return filtered;
  };

  // Get the currently highlighted project option based on search
  const getHighlightedProjectOption = (searchTerm: string) => {
    const filtered = filterProjectOptions(searchTerm);
    return filtered.length > 0 ? filtered[0] : null;
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Ninja Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Current Project</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">Description</th>
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
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Search or enter ninja name"
                            value={entry.ninjaName}
                            onChange={(e) => {
                              handleInputChange(index, 'ninjaName', e.target.value);
                              setNinjaNameSearch({...ninjaNameSearch, [index]: e.target.value});
                              setShowNinjaDropdown({...showNinjaDropdown, [index]: e.target.value.length > 0});
                            }}
                            onFocus={() => setShowNinjaDropdown({...showNinjaDropdown, [index]: true})}
                            onBlur={() => setTimeout(() => setShowNinjaDropdown({...showNinjaDropdown, [index]: false}), 200)}
                            data-testid={`input-ninja-${index}`}
                          />
                          {showNinjaDropdown[index] && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                              {filterNinjaNames(ninjaNameSearch[index] || '').map((name) => (
                                <div
                                  key={name}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                  onMouseDown={() => {
                                    handleInputChange(index, 'ninjaName', name);
                                    setShowNinjaDropdown({...showNinjaDropdown, [index]: false});
                                  }}
                                >
                                  {name}
                                </div>
                              ))}
                              {entry.ninjaName && !getUniqueNinjaNames().includes(entry.ninjaName) && (
                                <div className="px-3 py-2 text-sm text-blue-600 bg-blue-50">
                                  Add "{entry.ninjaName}" as new ninja
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Search project status"
                            value={
                              entry.currentProject === "manual" 
                                ? "Describe Manually" 
                                : (projectSearch[index] || PROJECT_STATUS_OPTIONS.find(opt => opt.value === entry.currentProject)?.label || '')
                            }
                            onChange={(e) => {
                              setProjectSearch({...projectSearch, [index]: e.target.value});
                              setShowProjectDropdown({...showProjectDropdown, [index]: true});
                              
                              // Auto-highlight first match
                              const highlighted = getHighlightedProjectOption(e.target.value);
                              if (highlighted && e.target.value.length > 0) {
                                // Don't auto-select, just prepare for highlighting
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const highlighted = getHighlightedProjectOption(projectSearch[index] || '');
                                if (highlighted) {
                                  handleProjectChange(index, highlighted.value);
                                  setShowProjectDropdown({...showProjectDropdown, [index]: false});
                                }
                              } else if (e.key === 'Escape') {
                                setShowProjectDropdown({...showProjectDropdown, [index]: false});
                              }
                            }}
                            onFocus={() => setShowProjectDropdown({...showProjectDropdown, [index]: true})}
                            onBlur={() => setTimeout(() => setShowProjectDropdown({...showProjectDropdown, [index]: false}), 200)}
                            data-testid={`input-project-${index}`}
                          />
                          {showProjectDropdown[index] && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                              {filterProjectOptions(projectSearch[index] || '').map((option, optionIndex) => (
                                <div
                                  key={option.value}
                                  className={`px-3 py-2 cursor-pointer ${
                                    optionIndex === 0 
                                      ? 'bg-blue-100 hover:bg-blue-200' 
                                      : 'hover:bg-gray-100'
                                  }`}
                                  onMouseDown={() => {
                                    handleProjectChange(index, option.value);
                                    setShowProjectDropdown({...showProjectDropdown, [index]: false});
                                    setProjectSearch({...projectSearch, [index]: ''});
                                  }}
                                >
                                  {option.label}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <Input
                          type="text"
                          placeholder="Enter description"
                          value={entry.description}
                          onChange={(e) => handleInputChange(index, 'description', e.target.value)}
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
                          className={entry.currentProject === "manual" ? "" : "bg-muted text-muted-foreground"}
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
                          className={entry.currentProject === "manual" ? "" : "bg-muted text-muted-foreground"}
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
                          value={entry.ninjaName}
                          readOnly
                          className="bg-muted text-muted-foreground"
                          data-testid={`text-ninja-${entry.id}`}
                        />
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <Input
                          type="text"
                          value={entry.currentProject === "manual" 
                            ? "Describe Manually" 
                            : (PROJECT_STATUS_OPTIONS.find(opt => opt.value === entry.currentProject)?.label || entry.currentProject)}
                          readOnly
                          className="bg-muted text-muted-foreground"
                          data-testid={`text-project-${entry.id}`}
                        />
                      </td>
                      <td className="px-4 py-4 border-r border-border">
                        <Input
                          type="text"
                          value={entry.description}
                          readOnly
                          className="bg-muted text-muted-foreground"
                          data-testid={`text-description-${entry.id}`}
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
    </div>
  );
}